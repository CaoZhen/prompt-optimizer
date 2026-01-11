import { NextResponse } from 'next/server';
import { getPromptStyle, PROMPT_STYLES, CLASSIFIER_PROMPT, STYLE_SUGGESTER_PROMPT } from '@/lib/prompts';

export async function POST(req: Request) {
    try {
        // eslint-disable-next-line prefer-const
        let { userInput, mode, language, apiKey, style, version, customStyle } = await req.json();

        if (!userInput) {
            return NextResponse.json({ error: 'User input is required' }, { status: 400 });
        }

        const effectiveKey = apiKey || process.env.DEEPSEEK_API_KEY;

        if (!effectiveKey) {
            return NextResponse.json({ error: 'DeepSeek API Key is missing. Please configure it in the settings.' }, { status: 401 });
        }

        let targetStyleId = style;

        // Step 0: Handle Custom Style
        // If the user selected "Custom" or provided a specific custom style string

        if (style === 'custom' && customStyle) {
            targetStyleId = 'general';
            // Inject the custom style requirement directly into the user input to guide the model
            userInput = `[TARGET VISUAL STYLE: ${customStyle}] ${userInput}`;
        }

        // Step 1: Detect Style if missing
        if (!targetStyleId) {
            try {
                console.log("=== Running Style Classification ===");
                const classification = await classifyPrompt(userInput, effectiveKey);
                console.log("Classification result:", classification);

                if (classification.style && classification.confidence > 0.6) {
                    targetStyleId = classification.style;
                } else {
                    // Ambiguous or General with low confidence -> Ask AI to suggest options
                    const targetLang = language === 'chinese' ? 'Simplified Chinese (简体中文)' : 'English';
                    const suggestedStyles = await suggestStyles(userInput, effectiveKey, targetLang);
                    const suggestedOptions = suggestedStyles.map(s => ({ ...s, isSuggested: true }));

                    // Get static preset styles
                    const staticOptions = Object.values(PROMPT_STYLES).map(s => ({
                        id: s.id,
                        name: s.name,
                        description: s.description,
                        isSuggested: false
                    }));

                    // Combine: Suggestions first, then Static presets
                    const allOptions = [...suggestedOptions, ...staticOptions];

                    return NextResponse.json({
                        action: 'style_selection_required',
                        options: allOptions
                    });
                }
            } catch (e) {
                console.error("Classification failed, falling back to general:", e);
                targetStyleId = 'general';
            }
        }

        // Ensure valid style
        let promptStyle = getPromptStyle(targetStyleId);
        // Fallback if the detected style ID isn't in our registry (e.g. LLM hallucinated 'pixel-art')
        if (!PROMPT_STYLES[targetStyleId]) {
            console.log(`Style '${targetStyleId}' is dynamic. Using General style logic with injection.`);
            promptStyle = getPromptStyle('general');
            // Inject the dynamic style name as guidance
            userInput = `[Visual Style: ${targetStyleId.replace(/-/g, ' ')}] ${userInput}`;
        }

        const targetLang = language === 'chinese' ? 'Simplified Chinese (简体中文)' : 'English';

        // Select specific prompt version (default to style's default)
        const vId = version || promptStyle.defaultVersionId;
        const promptVersion = promptStyle.versions.find(v => v.id === vId) || promptStyle.versions[0];
        const selectedPrompt = promptVersion.prompts[mode as keyof typeof promptVersion.prompts] || promptVersion.prompts.quick;

        let rawPromptString: string;
        if (typeof selectedPrompt === 'string') {
            rawPromptString = selectedPrompt;
        } else {
            // It's a LocalizedPrompt
            rawPromptString = language === 'chinese' ? selectedPrompt.cn : selectedPrompt.en;
        }

        const promptToUse = rawPromptString.split('{{TARGET_LANGUAGE}}').join(targetLang);

        const messages = [
            { role: "system", content: promptToUse },
            { role: "user", content: userInput }
        ];

        console.log("=== DeepSeek Stream Request ===");
        console.log("Style:", promptStyle.id);
        console.log(JSON.stringify(messages, null, 2));

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${effectiveKey} `
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: messages,
                temperature: 0.7,
                stream: true
            })
        });

        if (!response.ok) {
            console.error("DeepSeek API Error:", response.status, await response.text());
            return NextResponse.json({ error: "Failed to fetch from DeepSeek" }, { status: response.status });
        }

        // Create a ReadableStream to pipe the response
        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                const decoder = new TextDecoder();

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split('\n');

                        for (const line of lines) {
                            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                                try {
                                    const data = JSON.parse(line.slice(6));
                                    const content = data.choices[0]?.delta?.content || '';
                                    if (content) {
                                        controller.enqueue(new TextEncoder().encode(content));
                                    }
                                } catch (e) {
                                    console.error('Error parsing stream chunk:', e);
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.error('Stream reading error:', e);
                    controller.error(e);
                } finally {
                    controller.close();
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });

    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

async function classifyPrompt(input: string, apiKey: string): Promise<{ style: string | null; confidence: number }> {
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: CLASSIFIER_PROMPT },
                    { role: "user", content: input }
                ], // Use a small model if available, but deepseek-chat is standard
                temperature: 0.1, // Low temp for deterministic classification
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            throw new Error(`Classifier error: ${response.status}`);
        }

        const data = await response.json();
        const resultString = data.choices[0]?.message?.content;
        if (!resultString) return { style: null, confidence: 0 };

        return JSON.parse(resultString);
    } catch (error) {
        console.error("Classifier Exception:", error);
        return { style: null, confidence: 0 };
    }
}

async function suggestStyles(input: string, apiKey: string, targetLang: string): Promise<Array<{ id: string, name: string, description: string }>> {
    try {
        const prompt = STYLE_SUGGESTER_PROMPT.split('{{TARGET_LANGUAGE}}').join(targetLang);

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: prompt },
                    { role: "user", content: input }
                ],
                temperature: 0.7,
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            throw new Error(`Suggester error: ${response.status}`);
        }

        const data = await response.json();
        const result = JSON.parse(data.choices[0]?.message?.content || '{}');
        return result.options || [];

    } catch (error) {
        console.error("Style Suggester Exception:", error);
        // Fallback to static styles if AI fails
        return Object.values(PROMPT_STYLES).map(s => ({
            id: s.id,
            name: s.name,
            description: s.description
        }));
    }
}

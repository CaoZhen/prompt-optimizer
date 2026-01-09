import { NextResponse } from 'next/server';

// export const runtime = 'edge'; // Enable edge runtime for streaming


const PROMPTS = {
    quick: `You are an expert AI Image Prompt Optimizer.
Your methodology is to first DECOMPOSE the user's input into key dimensions before constructing the final prompt structure.

Step 1: Analyze the input and extract:
- Environment (Setting and background)
- Subject (The main focus)
- Action (What the subject is doing)
- Style/Medium (Artistic direction)
- Theme (Overall mood)
- Visual Modifiers (Lighting, color, mood, composition, etc.)
- Technical Details (Camera settings, quality, etc.)
- Negative Prompt (What to avoid)

Step 2: Based on this decomposition, create a high-quality, professional structured representation.

Output Format:
Output a **SINGLE VALID JSON OBJECT** representing the prompt structure.
DO NOT include a separate "prompt" string field.

Example Structure:
{
  "environment": "Environment description in {{TARGET_LANGUAGE}}",
  "subject": "Detailed description in {{TARGET_LANGUAGE}}",
  "action": "Action description in {{TARGET_LANGUAGE}}",
  "style": "Style description in {{TARGET_LANGUAGE}}",
  "theme": "Theme description in {{TARGET_LANGUAGE}}",
  "modifiers": {
    "lighting": "Lighting keywords in {{TARGET_LANGUAGE}}",
    "color": "Color keywords in {{TARGET_LANGUAGE}}",
    "mood": "Mood keywords in {{TARGET_LANGUAGE}}",
    "composition": "Composition keywords in {{TARGET_LANGUAGE}}",
    "details": "Details keywords in {{TARGET_LANGUAGE}}",
    "effects": "Effects keywords in {{TARGET_LANGUAGE}}",
    "typography": "Typography keywords in {{TARGET_LANGUAGE}}"
  },
  "technical": {
    "camera": "Camera settings",
    "quality": "Quality keywords"
  },
  "negative": "Negative prompt in {{TARGET_LANGUAGE}}"
}

Rules:
1. Output STRICTLY JSON. No markdown code blocks, no other text.
2. ALL values MUST BE IN {{TARGET_LANGUAGE}}.
3. Be creative and professional. Use vivid, descriptive terms.
4. Avoid repetition across fields, especially between "action" and "environment".
5. **CRITICAL: If a field has no content, return an empty string "". NEVER return text like "无", "None", "N/A", or "Not applicable".**
6. JSON keys must be strictly quoted.
`,

    optimize: `You are an expert AI Image Prompt Optimizer.
Your task is to REFINE and ENHANCE an existing prompt.

Output Format:
1. <prompt>Finished Prompt String ({{TARGET_LANGUAGE}})</prompt>
2. <json>Detailed Structure ({{TARGET_LANGUAGE}})</json>

Rules:
1. Keep the core intent of the original prompt.
2. Enhance details, lighting, and style.
3. Fix any contradictions.
4. Output strictly in the requested dual format (<prompt> + <json>).
`,

    translate: `You are an AI Translator for Image Prompts.
Your task is to translate the input into professional English prompt keywords.

Output Format:
1. <prompt>Translated Keywords ({{TARGET_LANGUAGE}})</prompt>
2. <json>Structure with translated definitions ({{TARGET_LANGUAGE}})</json>

Rules:
1. Precise translation of art terms.
2. Output strictly in the requested dual format.
`
};

export async function POST(req: Request) {
    try {
        const { userInput, mode, language, apiKey } = await req.json();

        if (!userInput) {
            return NextResponse.json({ error: 'User input is required' }, { status: 400 });
        }

        const effectiveKey = apiKey || process.env.DEEPSEEK_API_KEY;

        if (!effectiveKey) {
            return NextResponse.json({ error: 'DeepSeek API Key is missing. Please configure it in the settings.' }, { status: 401 });
        }

        const targetLang = language === 'chinese' ? 'Simplified Chinese (简体中文)' : 'English';

        // Select specific prompt based on mode, fallback to quick
        const selectedPrompt = PROMPTS[mode as keyof typeof PROMPTS] || PROMPTS.quick;

        const promptToUse = selectedPrompt.split('{{TARGET_LANGUAGE}}').join(targetLang);


        const messages = [
            { role: "system", content: promptToUse },
            { role: "user", content: userInput }
        ];

        console.log("=== DeepSeek Stream Request ===");
        console.log(JSON.stringify(messages, null, 2));

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${effectiveKey}`
            },

            body: JSON.stringify({
                model: "deepseek-chat",
                messages: messages,
                temperature: 0.7,
                stream: true // Enable Streaming
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

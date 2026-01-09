import { NextResponse } from 'next/server';
// export const runtime = 'edge'; // Enable edge runtime for streaming
import { getPromptVersion } from '@/lib/prompts';

export async function POST(req: Request) {
    try {
        const { userInput, mode, language, apiKey, version } = await req.json();

        if (!userInput) {
            return NextResponse.json({ error: 'User input is required' }, { status: 400 });
        }

        const effectiveKey = apiKey || process.env.DEEPSEEK_API_KEY;

        if (!effectiveKey) {
            return NextResponse.json({ error: 'DeepSeek API Key is missing. Please configure it in the settings.' }, { status: 401 });
        }

        const targetLang = language === 'chinese' ? 'Simplified Chinese (简体中文)' : 'English';

        // Select specific prompt based on version and mode
        const promptVersion = getPromptVersion(version);
        const selectedPrompt = promptVersion.prompts[mode as keyof typeof promptVersion.prompts] || promptVersion.prompts.quick;

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
                'Authorization': `Bearer ${effectiveKey} `
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

import { NextResponse } from 'next/server';

// export const runtime = 'edge'; // Enable edge runtime for streaming


const PROMPTS = {
    quick: `You are an expert AI Image Prompt Optimizer.
Your methodology is to first DECOMPOSE the user's input into key dimensions before constructing the final prompt structure.

Step 1: Analyze the input and extract:
1. Core Narrative: A single sentence summarizing the story or scene.
2. Physical Elements:
   - Subject (The main focus)
   - Environment (Setting and background)
   - Action (Specific movement or passive state)
   - Interaction & Spatial Relationship (Physical distance and placement)
3. Artistic & Technical Settings:
   - Style/Medium (Artistic direction)
   - Theme (Abstract concept/mood)
   - Visual Modifiers (Lighting, Color, Composition, Layers)
   - Technical & Negative Prompts

Step 2: Based on this decomposition, create a high-quality, professional structured representation.

Output Format:
Output a **SINGLE VALID JSON OBJECT** representing the prompt structure.
DO NOT include a separate "prompt" string field.

Example Structure:
{
  "environment": "vivid environment keywords in {{TARGET_LANGUAGE}}",
  "subject": "vivid subject keywords in {{TARGET_LANGUAGE}}",
  "action": "concise action keywords in {{TARGET_LANGUAGE}}",
  "spatialRelationship": "physical distance or interaction keywords in {{TARGET_LANGUAGE}}",
  "style": "art style and medium in {{TARGET_LANGUAGE}}",
  "theme": "abstract concept and mood in {{TARGET_LANGUAGE}}",
  "modifiers": {
    "lighting": "lighting style keywords",
    "colorMood": "color palette and atmosphere keywords",
    "composition": "shot type and camera angle keywords",
    "visualLayers": "depth and layer arrangement keywords",
    "details": "micro-features or texture keywords",
    "effects": "technical visual effects keywords",
    "typography": "text design and layout keywords"
  },
  "technical": {
    "camera": "camera settings",
    "quality": "quality boosters",
    "aspectRatio": "e.g. 16:9",
    "model": "e.g. --v 6.0"
  },
  "negative": "negative prompt keywords"
}

Rules:
1. Output STRICTLY JSON. No markdown blocks, no other text.
2. Values should be in {{TARGET_LANGUAGE}}, but USE professional English terminology for art movements, camera settings, and model parameters where appropriate.
3. **Conciseness is MANDATORY**: Use only keywords, short phrases, or simple fragments. BAN full sentences, BAN pronouns (he/she/it).
   - **EXCEPTION**: The "action" field supports "Narrative Phrases" (short sentences, max 15 words) ONLY to describe complex interactions or subtle emotions (e.g., "eyes filled with hesitation and pity").
4. Avoid repetition. Each field has a STRICT scope:
   - **spatialRelationship**: Focus ONLY on physical distance and contact (e.g., "standing 2m apart", "eye contact"). No shot types or depth-of-field here.
   - **composition**: Focus ONLY on shot types, camera angles, and framing (e.g., "extreme close-up", "high angle").
   - **visualLayers**: Focus ONLY on foreground/middle-ground/background depth and layering (e.g., "subject in mid-ground", "blurred foreground flowers").
   - **details**: Focus ONLY on micro-features, tangible textures, or specific small objects (e.g., "fine facial pores", "velvet texture", "lens flare").
   - **theme**: The ONLY field for abstract, evocative, or interpretive concepts (e.g., "ancient mystery", "serenity").
5. **Subjective vs. Objective**: Use SUBJECTIVE descriptions ONLY for "theme". For all other fields (subject, action, spatialRelationship, colorMood, composition, etc.), you MUST use OBJECTIVE, descriptive language focusing on physical facts. 
   - *Example*: Do NOT say "gloomy atmosphere" in colorMood; say "desaturated blue tones, heavy shadows".
   - **EXCEPTION**: If the artistic style is Abstract, Conceptual, or Surrealist, you MAY use subjective/metaphorical language in "subject" and "environment" to capture the non-physical nature of the work.
6. **Strict Scene Consistency**: Maintain logical and thematic coherence. Do NOT add conflicting elements.
7. **Cinematic Spatial Logic**: For multi-character prompts, use shot types and depth control to create organic visual layers.
8. **Reduce AI-Feel**: Avoid generic buzzwords. Simulate real-world imperfections (e.g., "visible brush strokes", "raw film grain", "slight chromatic aberration").
9. **Conservative Embellishment**: Do NOT add particle effects or magic sparks unless explicitly requested or logically essential.
10. **FORBIDDEN CONTENT**: Never use "无", "None", "N/A". Use an empty string "" if a field is irrelevant.
11. **Terminology Glossary**:
    - **English Preferred (Art/Tech)**: "Chiaroscuro" (vs 明暗对比), "Bokeh" (vs 散景), "Cyberpunk" (vs 赛博朋克), "Anamorphic Lens" (vs 变形镜头).
    - **Native Language Preferred (Description)**: "Detailed skin texture" -> "皮肤纹理细节", "Sorrowful expression" -> "悲伤的表情".
    - **Use Context-Aware Choice**: If the user asks for a "Chinese Ink Painting", use native terms like "Liubai (留白)". If "Hollywood Sci-Fi", use English tech terms.
12. JSON keys must be strictly quoted.
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

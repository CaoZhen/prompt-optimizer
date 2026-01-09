import { PromptStructure, Platform } from './types';

export function buildPrompt(data: PromptStructure, platform: Platform, language: 'chinese' | 'english' = 'english'): string {
    const core = [
        data.environment,
        data.subject,
        data.action,
        data.style,
        data.theme
    ].map(s => s?.trim()).filter((s): s is string => !!s);

    const modifiers = [
        data.modifiers?.lighting,
        data.modifiers?.color,
        data.modifiers?.mood,
        data.modifiers?.composition,
        data.modifiers?.details,
        data.modifiers?.effects,
        data.modifiers?.typography
    ].map(s => s?.trim()).filter((s): s is string => !!s);

    const technical = [
        data.technical?.camera,
        data.technical?.quality
    ].map(s => s?.trim()).filter((s): s is string => !!s);

    // Helper to join parts without double punctuation
    const smartJoin = (parts: string[]) => {
        return parts.reduce((acc, curr, idx) => {
            if (idx === 0) return curr;
            const prev = acc.trim();
            const lastChar = prev.slice(-1);
            // If previous part ends with punctuation (English or Chinese), just add space. Otherwise add comma space.
            // Includes: , . ; : ! ? and Chinese: ， 。 ； ： ！ ？ 、
            const comma = language === 'chinese' ? '，' : ', ';
            const separator = /[,.;:!?\u3002\uff0c\u3001\uff1b\uff1a\uff01\uff1f]$/.test(lastChar) ? ' ' : comma;
            return prev + separator + curr;
        }, '');
    };

    const baseSections = [
        smartJoin(core),
        smartJoin(modifiers),
        smartJoin(technical)
    ].filter(Boolean);

    const basePrompt = smartJoin(baseSections);

    switch (platform) {
        case 'midjourney':
            return formatMidjourney(basePrompt, data);
        case 'sd':
            return formatStableDiffusion(basePrompt, data);
        case 'dalle':
        case 'jimeng':
        case 'nanobanana':
        case 'kling':
            // These models typically prefer natural language without specific parameter flags like --ar
            // Some might support --ar but standard NL is safest default.
            return formatNaturalLanguage(basePrompt, data);
        default:
            return basePrompt;
    }
}

function formatNaturalLanguage(base: string, data: PromptStructure): string {
    // For DALL-E, Jimeng, Nano Banana, Kling: valid natural language.
    // We might want to append aspect ratio description if not supported via flags, 
    // but typically we just return the prompt.
    // Let's explicitly append aspect ratio for these if it's in technical, just in case, 
    // or trust the model. DALL-E handles it via API params usually, but for copy-paste, 
    // maybe "Aspect Ratio: 16:9" is better? 
    // Actually, let's keep it simple: just the prompt.
    // Specially for Nano Banana, usually very smart.
    return base;
}

function formatMidjourney(base: string, data: PromptStructure): string {
    let prompt = base;
    if (data.technical?.aspectRatio) {
        prompt += ` --ar ${data.technical.aspectRatio}`;
    }
    if (data.technical?.model) {
        prompt += ` ${data.technical.model}`;
    }
    if (data.negative) {
        // MJ style negative
        prompt += ` --no ${data.negative.replace(/,/g, ' ')}`;
    }
    return prompt;
}

function formatStableDiffusion(base: string, data: PromptStructure): string {
    return [
        "Positive Prompt:",
        base,
        "",
        "Negative Prompt:",
        data.negative
    ].join('\n');
}



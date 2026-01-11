import { PromptStructure, Platform } from './types';

const FORBIDDEN_PLACEHOLDERS = ['无', 'none', 'n/a', 'not applicable'];

export function buildPrompt(data: PromptStructure, platform: Platform, language: 'chinese' | 'english' = 'english'): string {
    const isClean = (s: string | undefined): s is string => {
        if (!s) return false;
        const trimmed = s.trim();
        if (!trimmed) return false;
        return !FORBIDDEN_PLACEHOLDERS.includes(trimmed.toLowerCase());
    };

    const core = [
        data.environment,
        data.subject,
        data.spatialRelationship,
        data.style,
        data.theme
    ].filter(isClean);

    const modifiers = [
        data.modifiers?.lighting,
        data.modifiers?.artisticReference,
        data.modifiers?.colorMood,
        data.modifiers?.composition,
        data.modifiers?.visualLayers,
        data.modifiers?.details,
        data.modifiers?.effects,
        data.modifiers?.typography
    ].filter(isClean);

    // Only include technical params (Camera, Quality) in the base prompt if the platform supports them (MJ/SD).
    // DALL-E and others hide the technical panel, so we shouldn't include these in the prompt.
    const technical = ['midjourney', 'sd'].includes(platform) ? [
        data.technical?.camera,
        data.technical?.quality
    ].filter(isClean) : [];

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
    const sections: string[] = [];

    if (base.trim()) {
        sections.push("Positive Prompt:");
        sections.push(base);
    }

    if (data.negative?.trim()) {
        if (sections.length > 0) sections.push(""); // Spacer
        sections.push("Negative Prompt:");
        sections.push(data.negative);
    }

    if (data.technical?.aspectRatio || data.technical?.model) {
        if (sections.length > 0) sections.push(""); // Spacer
        sections.push("Parameters:");
        if (data.technical?.aspectRatio) sections.push(`Aspect Ratio: ${data.technical.aspectRatio}`);
        if (data.technical?.model) sections.push(`Model: ${data.technical.model}`);
    }

    return sections.join('\n');
}



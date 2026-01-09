
export interface PromptStructure {
    subject: string;
    action: string; // New: What is the subject doing?
    environment: string;
    theme: string; // New: Core concept/idea
    style: string;
    modifiers: {
        lighting: string;
        color: string;
        mood: string;
        composition: string; // New: Camera angles, framing
        details: string;
        effects: string; // New: Lighting effects and textures
        typography: string; // New: Title and text styles
    };
    technical: {
        camera?: string;
        quality: string;
        aspectRatio?: string; // e.g. "16:9"
        model?: string; // e.g. "v6.0"
    };
    negative: string;
    originalInput?: string; // New: Original user input from Quick Mode
    enrichedPrompt?: string; // New: The generated full prompt string
}

export interface Template {
    id: string;
    name: string;
    description: string;
    category: 'character' | 'scene' | 'product' | 'art';
    structure: PromptStructure;
    recommendedPlatform: 'midjourney' | 'sd' | 'flux' | 'dalle' | 'jimeng' | 'nanobanana' | 'kling';
}

export type Platform = 'midjourney' | 'sd' | 'flux' | 'dalle' | 'jimeng' | 'nanobanana' | 'kling';

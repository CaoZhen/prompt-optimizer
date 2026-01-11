
export interface PromptStructure {
    subject: string;
    spatialRelationship: string; // New: Interaction and spatial relationship between multiple subjects or between subject and environment
    environment: string;
    theme: string; // New: Core concept/idea
    style: string;
    modifiers: {
        lighting: string;
        colorMood: string; // Merged: Color & Mood
        composition: string; // New: Shot and composition
        visualLayers: string; // New: Depth and layers
        details: string;
        effects: string; // New: Visual effects and texture
        typography: string; // New: Typography and layout
        artisticReference: string; // New: Specific artist/work reference for atmosphere
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

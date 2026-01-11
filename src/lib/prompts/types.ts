export type LocalizedPrompt = {
    en: string;
    cn: string;
};

export interface PromptVersion {
    id: string;
    name: string;
    description: string;
    prompts: {
        quick: string | LocalizedPrompt;
        optimize: string | LocalizedPrompt;
        translate: string | LocalizedPrompt;
    };
}

export interface PromptStyle {
    id: string;
    name: string;
    description: string;
    versions: PromptVersion[]; // List of available versions for this style
    defaultVersionId: string;
}


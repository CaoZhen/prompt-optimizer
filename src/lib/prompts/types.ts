export interface PromptVersion {
    id: string;
    name: string;
    description: string;
    prompts: {
        quick: string;
        optimize: string;
        translate: string;
    };
}

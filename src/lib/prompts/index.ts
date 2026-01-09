import { PromptVersion } from './types';
import { v1 } from './v1';
import { v2 } from './v2';
import { v3 } from './v3';

export const PROMPT_VERSIONS: Record<string, PromptVersion> = {
    v1,
    v2,
    v3
};

export function getPromptVersion(id: string): PromptVersion {
    return PROMPT_VERSIONS[id] || PROMPT_VERSIONS[DEFAULT_VERSION];
}

export const DEFAULT_VERSION = 'v1';

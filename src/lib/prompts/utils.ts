import { LocalizedPrompt } from './types';

export function createLocalizedVariant(
    basePrompt: string | LocalizedPrompt,
    enReplacement: { target: string, content: string },
    cnReplacement: { target: string, content: string }
): LocalizedPrompt {
    const enBase = typeof basePrompt === 'string' ? basePrompt : basePrompt.en;
    const cnBase = typeof basePrompt === 'string' ? '' : basePrompt.cn;

    return {
        en: enBase.replace(enReplacement.target, enReplacement.content),
        cn: cnBase ? cnBase.replace(cnReplacement.target, cnReplacement.content) : ''
    };
}

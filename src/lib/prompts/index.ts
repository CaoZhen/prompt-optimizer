import { PromptStyle } from './types';
import { generalStyle } from './styles/general';
import { photographyStyle } from './styles/photography';
import { animeStyle } from './styles/anime';
import { digitalArtStyle } from './styles/digital-art';
import { traditionalArtStyle } from './styles/traditional-art';
import { CLASSIFIER_PROMPT } from './classifier';

export const PROMPT_STYLES: Record<string, PromptStyle> = {
    [generalStyle.id]: generalStyle,
    [photographyStyle.id]: photographyStyle,
    [animeStyle.id]: animeStyle,
    [digitalArtStyle.id]: digitalArtStyle,
    [traditionalArtStyle.id]: traditionalArtStyle
};

export const DEFAULT_STYLE = generalStyle.id;

export function getPromptStyle(id: string): PromptStyle {
    return PROMPT_STYLES[id] || PROMPT_STYLES[DEFAULT_STYLE];
}

export { CLASSIFIER_PROMPT, STYLE_SUGGESTER_PROMPT } from './classifier';
export * from './types';

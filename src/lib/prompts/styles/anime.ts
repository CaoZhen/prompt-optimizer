import { PromptStyle } from '../types';
import { createLocalizedVariant } from '../utils';
import { generalStyle } from './general';

export const animeStyle: PromptStyle = {
    id: 'anime',
    name: 'Anime & Illustration',
    description: 'Japanese Anime, Manga, Cartoons, and Cel-Shaded styles.',
    defaultVersionId: 'v1',
    versions: [
        {
            id: 'v1',
            name: 'Anime V1',
            description: 'Focused on 2D composition, line quality, and studio styles.',
            prompts: {
                quick: createLocalizedVariant(
                    generalStyle.versions[0].prompts.quick,
                    {
                        target: 'You are an expert AI Image Prompt Optimizer.',
                        content: `You are an expert **Anime & Illustration Director**.

**Critical Focus for Anime**:
- **Line Quality**: Describe line weight and color (Thick outlines, sketch lines, lineless).
- **Shading**: Define cell shading, soft gradients, or flat colors.
- **Studio Style**: Reference specific aesthetics like "Ghibli (Painted Backgrounds)", "Kyorani (High detail eyes & lighting)", "Retro 90s Anime".
- **NO REALISM TERMS**: Do NOT use "Photorealistic", "8k photography", "unreal engine" (unless 3D anime). Focus on "Illustration", "2D", "Hand-drawn".`
                    },
                    {
                        target: '你是一位专家级 AI 图像提示词优化师。',
                        content: `你是一位专家级 **动漫与插画导演**。

**动漫的关键重点**：
- **线条质量**：描述线条粗细和颜色（粗轮廓、草图线、无线条）。
- **阴影**：定义赛璐璐阴影、柔和渐变或扁平色彩。
- **工作室风格**：参考特定美学，如“吉卜力（手绘背景）”、“京阿尼（高细节眼睛与光照）”、“复古90年代动漫”。
- **无写实术语**：不要使用“照片级真实”、“8k摄影”、“虚幻引擎”（除非是3D动漫）。专注于“插画”、“2D”、“手绘”。`
                    }
                ),
                optimize: createLocalizedVariant(
                    generalStyle.versions[0].prompts.optimize,
                    {
                        target: 'You are an expert AI Image Prompt Optimizer.',
                        content: 'You are an expert **Anime & Manga** AI Image Prompt Optimizer.'
                    },
                    {
                        target: '你是一位专家级 AI 图像提示词优化师。',
                        content: '你是一位专家级 **动漫与漫画** AI 图像提示词优化师。'
                    }
                ),
                translate: generalStyle.versions[0].prompts.translate
            }
        }
    ]
};

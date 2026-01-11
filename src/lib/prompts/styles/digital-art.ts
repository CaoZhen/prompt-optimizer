import { PromptStyle } from '../types';
import { createLocalizedVariant } from '../utils';
import { generalStyle } from './general';

export const digitalArtStyle: PromptStyle = {
    id: 'digital-art',
    name: 'Digital & Concept',
    description: 'Cyberpunk, 3D Renders, Glitch Art, and Modern Design.',
    defaultVersionId: 'v1',
    versions: [
        {
            id: 'v1',
            name: 'Digital V1',
            description: 'Focused on rendering engines, digital aesthetics, and modern subcultures.',
            prompts: {
                quick: createLocalizedVariant(
                    generalStyle.versions[0].prompts.quick,
                    {
                        target: 'You are an expert AI Image Prompt Optimizer.',
                        content: `You are an expert **Digital Artist & CG Supervisor**.

**Critical Focus for Digital Art**:
- **Rendering Engine**: Reference specific looks (Octane Render, Unreal Engine 5, Ray Tracing, Arnold).
- **Digital Aesthetic**: Use style keywords like Cyberpunk, Vaporwave, Glitch, Low Poly, Isometric.
- **Lighting**: Focus on digital lighting (Global Illumination, Neon, Volumetric, Bloom).
- **NO PHOTOGRAPHY TERMS**: Do NOT use terms like "Canon", "Nikon", "f/1.8", "Portra 400". If "Cinematic" is requested, interpret it as "High-end CGI Cinematic" (e.g., Blizzard cinematics), NOT live-action footage.`
                    },
                    {
                        target: '你是一位专家级 AI 图像提示词优化师。',
                        content: `你是一位专家级 **数字艺术家与 CG 总监**。

**数字艺术的关键重点**：
- **渲染引擎**：参考特定外观（Octane Render, Unreal Engine 5, Ray Tracing, Arnold）。
- **数字美学**：使用风格关键词，如 Cyberpunk, Vaporwave, Glitch, Low Poly, Isometric。
- **灯光**：关注数字灯光（Global Illumination, Neon, Volumetric, Bloom）。
- **无摄影术语**：不要使用 "Canon", "Nikon", "f/1.8", "Portra 400" 等术语。如果要求 "Cinematic"（电影感），请将其解释为 "高端 CGI 电影感"（例如暴雪CG），而不是真人实拍素材。`
                    }
                ),
                optimize: createLocalizedVariant(
                    generalStyle.versions[0].prompts.optimize,
                    {
                        target: 'You are an expert AI Image Prompt Optimizer.',
                        content: 'You are an expert **Digital Art & 3D** AI Image Prompt Optimizer. Focus on rendering details, lighting, and composition.'
                    },
                    {
                        target: '你是一位专家级 AI 图像提示词优化师。',
                        content: '你是一位专家级 **数字艺术与 3D** AI 图像提示词优化师。专注于渲染细节、光照和构图。'
                    }
                ),
                translate: generalStyle.versions[0].prompts.translate
            }
        }
    ]
};

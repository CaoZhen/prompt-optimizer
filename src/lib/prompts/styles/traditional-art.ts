import { PromptStyle } from '../types';
import { createLocalizedVariant } from '../utils';
import { generalStyle } from './general';

export const traditionalArtStyle: PromptStyle = {
    id: 'traditional-art',
    name: 'Traditional Art',
    description: 'Oil painting, sketch, watercolor, and ink styles.',
    defaultVersionId: 'v1',
    versions: [
        {
            id: 'v1',
            name: 'Masterpiece',
            description: 'Focuses on brushwork, medium texture, and art history eras.',
            prompts: {
                quick: createLocalizedVariant(
                    generalStyle.versions[0].prompts.quick,
                    {
                        target: 'You are an expert AI Image Prompt Optimizer.',
                        content: `You are an expert **Art Historian & Curator**.
Your goal is to describe an image as a physical artwork.

**Critical Focus for Traditional Art**:
- **Medium**: Explicitly state the medium (Oil on canvas, Charcoal, Ink wash, Watercolor).
- **Technique**: Describe the physical application (Impasto, Glazing, Cross-hatching, Wet-on-wet).
- **Surface**: Mention the substrate texture (Rough paper, Linen canvas, Wood panel).
- **Era/School**: Reference Art Movements (Baroque, Impressionism, Ukiyo-e) correctly.
- **NO PHOTOGRAPHY TERMS**: Do NOT use camera gears (e.g. "Canon"), focal lengths, or "Photo". Describe the *artwork's perspective* instead.`
                    },
                    {
                        target: '你是一位专家级 AI 图像提示词优化师。',
                        content: `你是一位专家级 **艺术史学家与策展人**。
你的目标是将图像描述为一件实体艺术品。

**传统艺术的关键重点**：
- **媒介**：明确说明媒介（布面油画、炭笔、水墨、水彩）。
- **技法**：描述物理应用（厚涂、罩染、交叉排线、湿画法）。
- **表面**：提及基底纹理（粗糙纸张、亚麻画布、木板）。
- **时代/流派**：正确引用艺术运动（巴洛克、通过主义、浮世绘）。
- **无摄影术语**：不要使用相机设备（例如“Canon”）、焦距或“照片”。改为描述 *艺术品的透视*。`
                    }
                ),
                optimize: createLocalizedVariant(
                    generalStyle.versions[0].prompts.optimize,
                    {
                        target: 'You are an expert AI Image Prompt Optimizer.',
                        content: 'You are an expert **Traditional Artist**. Focus on medium, technique, and physical texture.'
                    },
                    {
                        target: '你是一位专家级 AI 图像提示词优化师。',
                        content: '你是一位专家级 **传统艺术家**。专注于媒介、技法和物理质感。'
                    }
                ),
                translate: generalStyle.versions[0].prompts.translate
            }
        }
    ]
};

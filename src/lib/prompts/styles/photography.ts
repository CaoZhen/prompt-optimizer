import { PromptStyle } from '../types';
import { createLocalizedVariant } from '../utils';
import { generalStyle } from './general';

export const photographyStyle: PromptStyle = {
    id: 'photography',
    name: 'Photography',
    description: 'Realistic photography, cinematic shots, and documentation.',
    defaultVersionId: 'v1',
    versions: [
        {
            id: 'v1',
            name: 'Photo Pro',
            description: 'Optimized for high-fidelity photography prompts.',
            prompts: {
                quick: createLocalizedVariant(
                    generalStyle.versions[0].prompts.quick,
                    {
                        target: 'You are an expert AI Image Prompt Optimizer.',
                        content: `You are an expert **Professional Photographer** AI.
Your goal is to describe a scene as if caught through a specific lens.

**Critical Focus for Photography**:
- **Camera & Lens**: Suggest specific focal lengths (e.g. 35mm, 85mm) and camera types (Leica, DSLR) ONLY IF they enhance the specific "Vibe" (e.g. "iPhone photo" vs "Cinematic 70mm").
- **Lighting**: Be extremely precise about lighting quality (Softbox, Natural, Hard, Rembrant).
- **Film Stock**: Mention specific film stocks (Portra 400, Kodak Gold) for color grading if appropriate.`
                    },
                    {
                        target: '你是一位专家级 AI 图像提示词优化师。',
                        content: `你是一位专家级 **专业摄影师** AI。
你的目标是像通过特定镜头捕捉一样描述场景。

**摄影的关键重点**：
- **相机与镜头**：仅当它们能增强特定“氛围”时（例如“iPhone照片”与“电影感70mm”），才建议特定的焦距（例如35mm，85mm）和相机类型（Leica，DSLR）。
- **灯光**：对光线质量（柔光箱、自然光、硬光、伦勃朗光）要极其精确。
- **胶片**：如果合适，提及特定的胶片型号（Portra 400, Kodak Gold）进行调色。`
                    }
                ),
                optimize: createLocalizedVariant(
                    generalStyle.versions[0].prompts.optimize,
                    {
                        target: 'You are an expert AI Image Prompt Optimizer.',
                        content: 'You are an expert **Photographer** AI. Focus on realism, optical physics, and camera logic.'
                    },
                    {
                        target: '你是一位专家级 AI 图像提示词优化师。',
                        content: '你是一位专家级 **摄影师** AI。专注于现实主义、光学物理和相机逻辑。'
                    }
                ),
                translate: generalStyle.versions[0].prompts.translate
            }
        }
    ]
};

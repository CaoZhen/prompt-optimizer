import { useState, useEffect, useRef } from 'react';
import { PromptStructure, Platform } from '@/lib/types';
import { buildPrompt } from '@/lib/prompt-engine';
import { Copy, Sliders, Check, HelpCircle } from 'lucide-react';
import { UI_LABELS, FIELD_LABELS, PLACEHOLDERS } from '@/lib/i18n';

interface StandardModeProps {
    initialData: PromptStructure;
    onChange: (data: PromptStructure) => void;
    language: 'chinese' | 'english';
}

export default function StandardMode({ initialData, onChange, language }: StandardModeProps) {
    const [data, setData] = useState<PromptStructure>(initialData);
    const [platform, setPlatform] = useState<Platform>('dalle');
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const updateField = (section: keyof PromptStructure, field: string, value: string) => {
        const newData = { ...data };
        if (section === 'modifiers' || section === 'technical') {
            // @ts-expect-error: Complex union type assignment
            newData[section] = { ...newData[section], [field]: value };
        } else {
            newData[section] = value;
        }

        setData(newData);
        onChange(newData);
    };

    const currentPrompt = buildPrompt(data, platform);

    // Tooltip Descriptions
    const DESCRIPTIONS = {
        subject: {
            cn: "画面中最重要的对象，如人物、物体或生物。",
            en: "Describe the main focus of the image (person, object, creature)."
        },
        action: {
            cn: "主体正在做什么？描述动作、姿态或状态。",
            en: "What is the subject doing? Pose, action, or state."
        },
        environment: {
            cn: "主体所处的环境、背景或地点。",
            en: "Where is the scene taking place? Background or setting."
        },
        theme: {
            cn: "想要表达的核心概念、隐喻或抽象主题。",
            en: "The core concept, idea, or metaphor."
        },
        style: {
            cn: "整体的艺术风格，如“赛博朋克”、“水墨画”、“3D渲染”等。",
            en: "Artistic style like 'Cyberpunk', 'Ink Wash', '3D Render'."
        },
        lighting: {
            cn: "光线的方向、类型和氛围（如：侧光、轮廓光、柔光）。",
            en: "Direction, quality, and mood of lighting."
        },
        effects: {
            cn: "特殊的视觉特效或纹理质感（如：丁达尔效应、胶片颗粒）。",
            en: "Visual effects, particles, or textures."
        },
        color: {
            cn: "主要的配色方案或色调策略（如：互补色、冷色调）。",
            en: "Color palette or tonal strategy."
        },
        mood: {
            cn: "画面传达的情绪（如：神秘、快乐、压抑）。",
            en: "Emotional atmosphere of the image."
        },
        composition: {
            cn: "镜头的角度、距离、景深和布局（如：特写、俯视、三分法）。",
            en: "Camera angle, framing, depth of field, and layout."
        },
        typography: {
            cn: "画面中的文字设计、标题风格或排版。",
            en: "Text style, fonts, or title placement."
        },
        details: {
            cn: "补充的细节描述或主体间的互动。",
            en: "Additional small details or interactions."
        },
        quality: {
            cn: "画面质量相关的提示词（如：8k, masterpiece, best quality）。",
            en: "Quality boosters."
        },
        aspectRatio: {
            cn: "画面的长宽比（如：16:9, 3:4）。",
            en: "Image aspect ratio."
        },
        model: {
            cn: "使用的模型版本（如：--v 6.0, --niji 6）。",
            en: "Model version or parameters."
        },
        camera: {
            cn: "模拟的相机型号、胶卷或镜头参数。",
            en: "Simulated camera, film, or lens specs."
        },
        negative: {
            cn: "不希望出现在画面中的元素（如：畸变、模糊、多余的手指）。",
            en: "Things to exclude from the image."
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor Column */}
            <div className="lg:col-span-2 space-y-8">

                {/* Platform Selector */}
                <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-semibold mb-3 text-slate-500 uppercase tracking-wider">{UI_LABELS.targetModel[language]}</h3>
                    <div className="flex flex-wrap gap-2">
                        <button

                            onClick={() => setPlatform('dalle')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition whitespace-nowrap px-4 border ${['dalle', 'jimeng', 'nanobanana', 'kling'].includes(platform) ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'}`}
                        >
                            DALL-E / 即梦 / Kling
                        </button>
                        <button
                            onClick={() => setPlatform('midjourney')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition whitespace-nowrap px-4 border ${platform === 'midjourney' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'}`}
                        >
                            Midjourney
                        </button>
                        <button
                            onClick={() => setPlatform('sd')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition whitespace-nowrap px-4 border ${platform === 'sd' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'}`}
                        >
                            Stable Diffusion
                        </button>
                    </div>
                </section>

                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-600">
                            <Sliders className="w-4 h-4" /> {UI_LABELS.coreElements[language]}
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <InputField label={FIELD_LABELS.subject[language]} value={data.subject} onChange={(v) => updateField('subject', '', v)} placeholder={PLACEHOLDERS.subject[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.subject.cn : DESCRIPTIONS.subject.en} />
                        <InputField label={FIELD_LABELS.action[language]} value={data.action || ''} onChange={(v) => updateField('action', '', v)} placeholder={PLACEHOLDERS.action[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.action.cn : DESCRIPTIONS.action.en} />
                        <InputField label={FIELD_LABELS.environment[language]} value={data.environment} onChange={(v) => updateField('environment', '', v)} placeholder={PLACEHOLDERS.environment[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.environment.cn : DESCRIPTIONS.environment.en} />
                        <InputField label={FIELD_LABELS.theme[language]} value={data.theme || ''} onChange={(v) => updateField('theme', '', v)} placeholder={PLACEHOLDERS.theme[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.theme.cn : DESCRIPTIONS.theme.en} />
                    </div>
                </section>

                {/* Modifiers */}
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-purple-600">{UI_LABELS.visualModifiers[language]}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label={FIELD_LABELS.style[language]} value={data.style} onChange={(v) => updateField('style', '', v)} placeholder={PLACEHOLDERS.style[language]} isTextArea className="md:col-span-2" description={language === 'chinese' ? DESCRIPTIONS.style.cn : DESCRIPTIONS.style.en} />
                        <InputField label={FIELD_LABELS.lighting[language]} value={data.modifiers?.lighting || ''} onChange={(v) => updateField('modifiers', 'lighting', v)} placeholder={PLACEHOLDERS.lighting[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.lighting.cn : DESCRIPTIONS.lighting.en} />
                        <InputField label={FIELD_LABELS.effects[language]} value={data.modifiers?.effects || ''} onChange={(v) => updateField('modifiers', 'effects', v)} placeholder={PLACEHOLDERS.effects[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.effects.cn : DESCRIPTIONS.effects.en} />
                        <InputField label={FIELD_LABELS.color[language]} value={data.modifiers?.color || ''} onChange={(v) => updateField('modifiers', 'color', v)} placeholder={PLACEHOLDERS.color[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.color.cn : DESCRIPTIONS.color.en} />
                        <InputField label={FIELD_LABELS.mood[language]} value={data.modifiers?.mood || ''} onChange={(v) => updateField('modifiers', 'mood', v)} placeholder={PLACEHOLDERS.mood[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.mood.cn : DESCRIPTIONS.mood.en} />
                        <InputField label={FIELD_LABELS.composition[language]} value={data.modifiers?.composition || ''} onChange={(v) => updateField('modifiers', 'composition', v)} placeholder={PLACEHOLDERS.composition[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.composition.cn : DESCRIPTIONS.composition.en} />
                        <InputField label={FIELD_LABELS.typography[language]} value={data.modifiers?.typography || ''} onChange={(v) => updateField('modifiers', 'typography', v)} placeholder={PLACEHOLDERS.typography[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.typography.cn : DESCRIPTIONS.typography.en} />
                        <InputField label={FIELD_LABELS.details[language]} value={data.modifiers?.details || ''} onChange={(v) => updateField('modifiers', 'details', v)} placeholder={PLACEHOLDERS.details[language]} isTextArea description={language === 'chinese' ? DESCRIPTIONS.details.cn : DESCRIPTIONS.details.en} />
                    </div>
                </section>

                {/* Technical - Only for MJ and SD */}
                {['midjourney', 'sd'].includes(platform) && (
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-lg font-semibold mb-4 text-emerald-600">{UI_LABELS.technicalSpecs[language]}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <InputField label={FIELD_LABELS.quality[language]} value={data.technical?.quality || ''} onChange={(v) => updateField('technical', 'quality', v)} description={language === 'chinese' ? DESCRIPTIONS.quality.cn : DESCRIPTIONS.quality.en} />
                            <InputField label={FIELD_LABELS.aspectRatio[language]} value={data.technical?.aspectRatio || ''} onChange={(v) => updateField('technical', 'aspectRatio', v)} placeholder="3:4" description={language === 'chinese' ? DESCRIPTIONS.aspectRatio.cn : DESCRIPTIONS.aspectRatio.en} />
                            <InputField label={FIELD_LABELS.model[language]} value={data.technical?.model || ''} onChange={(v) => updateField('technical', 'model', v)} placeholder="--v 6.0" description={language === 'chinese' ? DESCRIPTIONS.model.cn : DESCRIPTIONS.model.en} />
                            <InputField label={FIELD_LABELS.camera[language]} value={data.technical?.camera || ''} onChange={(v) => updateField('technical', 'camera', v)} placeholder="50mm lens" className="col-span-2" description={language === 'chinese' ? DESCRIPTIONS.camera.cn : DESCRIPTIONS.camera.en} />
                        </div>
                    </section>
                )}


                {/* Negative - Only for MJ and SD */}
                {['midjourney', 'sd'].includes(platform) && (
                    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-lg font-semibold text-red-500">{UI_LABELS.negativePrompt[language]}</h3>
                            <div className="group relative">
                                <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-help" />
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 p-3 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-600 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                                    {language === 'chinese' ? DESCRIPTIONS.negative.cn : DESCRIPTIONS.negative.en}
                                    {/* Arrow */}
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white" />
                                </div>
                            </div>
                        </div>
                        <div className="min-h-[80px]">
                            <TextAreaAutoResize
                                value={data.negative}
                                onChange={(v) => updateField('negative', '', v)}
                                placeholder={PLACEHOLDERS.negative[language]}
                                className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-red-500"
                            />
                        </div>
                    </section>
                )}


            </div>

            {/* Preview Column (Sticky) */}
            <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xl">
                        <h3 className="text-sm font-medium text-slate-500 mb-4 tracking-wider uppercase">{UI_LABELS.finalPrompt[language]}</h3>

                        <div className="bg-slate-50 p-4 rounded-lg min-h-[160px] text-sm font-mono text-slate-700 break-words border border-slate-200">
                            {currentPrompt}
                        </div>

                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(currentPrompt);
                                setIsCopied(true);
                                setTimeout(() => setIsCopied(false), 2000);
                            }}
                            className={`w-full mt-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition ${isCopied ? 'bg-green-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                        >
                            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {isCopied ? UI_LABELS.copied[language] : UI_LABELS.copyPrompt[language]}
                        </button>
                    </div>

                    {/* Reference Info (Original & Enriched) - Moved here */}
                    {data.originalInput && (
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                            <h3 className="text-sm font-medium text-slate-500 mb-4 tracking-wider uppercase">{UI_LABELS.reference[language]}</h3>
                            <div className="space-y-4">

                                {data.originalInput && (
                                    <div>
                                        <div className="text-sm font-mono text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200 max-h-60 overflow-y-auto break-words">{data.originalInput}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

// Simple internal component for inputs

function InputField({ label, value, onChange, placeholder, className, isTextArea = false, description }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string, className?: string, isTextArea?: boolean, description?: string }) {
    return (
        <div className={`${className || ''} h-full flex flex-col`}>
            <div className="flex items-center gap-1.5 mb-1.5 shrink-0">
                <label className="block text-xs font-medium text-slate-500">{label}</label>
                {description && (
                    <div className="group relative">
                        <HelpCircle className="w-3 h-3 text-slate-600 hover:text-slate-400 cursor-help transition-colors" />

                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2.5 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                            <div className="text-[10px] leading-snug text-slate-600 font-light whitespace-pre-line">
                                {description}
                            </div>
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                        </div>
                    </div>
                )}
            </div>

            {isTextArea ? (
                <TextAreaAutoResize
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-500"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition placeholder:text-slate-400"
                />
            )}
        </div>
    )
}

function TextAreaAutoResize({ value, onChange, placeholder, className }: { value: string, onChange: (v: string) => void, placeholder?: string, className?: string }) {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Reset to auto to get the correct scrollHeight for shrinking
        el.style.minHeight = '0';
        el.style.height = 'auto';

        const scrollHeight = el.scrollHeight;

        // Set min-height to fit content
        el.style.minHeight = `${scrollHeight}px`;
        // Set height to 100% to fill container (equal height with neighbors)
        el.style.height = '100%';
    }, [value]);

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none transition resize-none overflow-hidden leading-normal ${className || ''}`}
            rows={1}
        />
    );
}

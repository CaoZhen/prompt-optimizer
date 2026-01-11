import { useState, useEffect } from 'react';
import { PromptStructure } from '@/lib/types';
import { buildPrompt } from '@/lib/prompt-engine';
import { Loader2, Wand2, ArrowRight, Copy, Check } from 'lucide-react';
import { UI_LABELS, PLACEHOLDERS } from '@/lib/i18n';

import DeepSeekConfig from './DeepSeekConfig';

interface QuickModeProps {
    onGenerate: (data: PromptStructure) => void;
    onEditInStandard: () => void;
    currentData: PromptStructure;
    language: 'english' | 'chinese';
    input: string;
    onInputChange: (value: string) => void;
}

export default function QuickMode({ onGenerate, onEditInStandard, language, input, onInputChange }: QuickModeProps) {
    const [loading, setLoading] = useState(false);
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [rawJson, setRawJson] = useState<PromptStructure | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isJsonCopied, setIsJsonCopied] = useState(false);

    // DeepSeek Config State
    const [hasServerKey, setHasServerKey] = useState<boolean | null>(null);
    const [clientKey, setClientKey] = useState<string | null>(null);

    useEffect(() => {
        // Check for server-side key
        fetch('/api/env-check')
            .then(res => res.json())
            .then(data => setHasServerKey(data.hasDeepSeekKey))
            .catch(err => console.error('Env check failed', err));
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanitizeStructure = (obj: any): any => {
        if (!obj || typeof obj !== 'object') return obj;

        const forbidden = ['无', 'none', 'n/a', 'not applicable', 'null', 'undefined'];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = Array.isArray(obj) ? [] : {};

        for (const key in obj) {
            const val = obj[key];
            if (typeof val === 'string') {
                const lowerVal = val.trim().toLowerCase();
                result[key] = forbidden.includes(lowerVal) ? '' : val;
            } else if (typeof val === 'object') {
                result[key] = sanitizeStructure(val);
            } else {
                result[key] = val;
            }
        }
        return result;
    };

    const [showStyleSelector, setShowStyleSelector] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [styleOptions, setStyleOptions] = useState<any[]>([]);


    const [customStyleInput, setCustomStyleInput] = useState('');

    const handleDeepSeekGenerate = async (selectedStyleId?: string) => {
        if (!input.trim()) return;
        setLoading(true);
        // Only clear previous results if this is a fresh start, not a style selection continuation
        if (!selectedStyleId) {
            setGeneratedPrompt('');
            setRawJson(null);
        }
        setShowStyleSelector(false); // Close selector if open

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInput: input,
                    mode: 'quick',
                    language,
                    apiKey: clientKey, // Pass client key if available
                    style: selectedStyleId,
                    customStyle: selectedStyleId === 'custom' ? customStyleInput : undefined
                })
            });

            // Handle Non-OK responses
            if (!res.ok) {
                const err = await res.json();
                alert('Error: ' + (err.error || 'Failed to fetch'));
                return;
            }

            // Check content type to see if it's JSON (action required) or Stream (generation)
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await res.json();
                if (data.action === 'style_selection_required') {
                    setStyleOptions(data.options);
                    setShowStyleSelector(true);
                    setLoading(false);
                    return;
                }
            }

            // Standard Streaming Handling
            const reader = res.body?.getReader();
            if (!reader) return;

            const decoder = new TextDecoder();
            let accumulated = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulated += chunk;
                // Update display with raw streaming data
                setGeneratedPrompt(accumulated);
            }

            // Final Parsing
            try {
                // Sanitize: find first '{' and last '}' to handle potential markdown wrappers
                const firstBrace = accumulated.indexOf('{');
                const lastBrace = accumulated.lastIndexOf('}');

                if (firstBrace !== -1 && lastBrace !== -1) {
                    const jsonString = accumulated.substring(firstBrace, lastBrace + 1);
                    let data = JSON.parse(jsonString); // This is now just the metadata

                    // Client-side sanitization ensure no "无" etc.
                    data = sanitizeStructure(data);

                    // Client-side prompt assembly
                    const assembledPrompt = buildPrompt(data, 'jimeng', language);

                    setGeneratedPrompt(assembledPrompt);
                    setRawJson(data);
                    onGenerate({
                        ...data,
                        originalInput: input,
                        enrichedPrompt: assembledPrompt
                    });

                } else {
                    // Start of non-JSON response might mean it's just text (rare with our prompt)
                    // But we keep accumulated text
                }
            } catch (e) {
                console.error("Failed to parse JSON structure:", e);
            }
        } catch (e) {
            console.error(e);
            alert("Generation failed. See console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 relative">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative z-10">
                <label className="block text-sm font-medium mb-2 text-slate-700">
                    {UI_LABELS.quickModeInputLabel[language]}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder={PLACEHOLDERS.quickInput[language]}
                    rows={10}

                    className="w-full bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-slate-400"
                />

                {showStyleSelector && (
                    <div className="mt-4 border-t border-slate-100 pt-4 animate-in fade-in slide-in-from-top-2">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-slate-700">{UI_LABELS.styleSelection.title[language]}</h3>
                            <p className="text-xs text-slate-500 mt-1">
                                {UI_LABELS.styleSelection.description[language]}
                            </p>
                        </div>


                        {/* Suggested Styles Section */}
                        {styleOptions.some((s: any) => s.isSuggested) && (
                            <div className="mb-6">
                                <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                                    {language === 'chinese' ? 'AI 推荐风格' : 'AI Recommended Styles'}
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {styleOptions.filter((s: any) => s.isSuggested).map((style) => (
                                        <button
                                            key={style.id}
                                            onClick={() => handleDeepSeekGenerate(style.id)}
                                            className="p-3 text-left border rounded-lg border-blue-100 bg-blue-50/50 hover:border-blue-500 hover:bg-blue-50 transition-all group hover:shadow-sm"
                                        >
                                            <div className="font-semibold text-sm text-slate-800 group-hover:text-blue-700 mb-0.5">
                                                {style.name}
                                            </div>
                                            <div className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                                {style.description}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Standard Styles Section */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                {language === 'chinese' ? '预设风格' : 'Preset Styles'}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {styleOptions.filter((s: any) => !s.isSuggested).map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => handleDeepSeekGenerate(style.id)}
                                        className="p-3 text-left border rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all group bg-white hover:shadow-sm"
                                    >
                                        <div className="font-semibold text-sm text-slate-800 group-hover:text-slate-900 mb-0.5">
                                            {/* @ts-expect-error - Dynamic access to strict typed i18n object */}
                                            {UI_LABELS.styleNames[style.id]?.[language] || style.name}
                                        </div>
                                        <div className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                            {/* @ts-expect-error - Dynamic access to strict typed i18n object */}
                                            {UI_LABELS.styleDescriptions[style.id]?.[language] || style.description}
                                        </div>
                                    </button>
                                ))}
                                {/* Custom Style Input - Inline */}
                                <div
                                    className="p-3 text-left border rounded-lg border-dashed border-purple-200 bg-purple-50 hover:bg-purple-100/50 transition-all group relative flex flex-col gap-2"
                                >
                                    <div className="font-semibold text-sm text-slate-800">
                                        {UI_LABELS.styleNames.custom[language]}
                                    </div>
                                    <div className="flex gap-2 h-full">
                                        <textarea
                                            value={customStyleInput}
                                            onChange={(e) => setCustomStyleInput(e.target.value)}
                                            placeholder={UI_LABELS.customStyle.placeholder[language]}
                                            className="flex-1 bg-white border border-purple-200 rounded px-2 py-1 text-xs text-slate-800 focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all resize-none placeholder:text-slate-400"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    if (customStyleInput.trim()) {
                                                        handleDeepSeekGenerate('custom');
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() => handleDeepSeekGenerate('custom')}
                                            disabled={!customStyleInput.trim()}
                                            className="px-3 py-1 text-xs font-medium bg-purple-600 text-white hover:bg-purple-500 rounded transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed self-end h-full"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {hasServerKey === false && (
                    <div className="mt-4">
                        <DeepSeekConfig onKeyChange={setClientKey} language={language} />
                    </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">{UI_LABELS.poweredBy[language]}</span>
                    </div>

                    <button
                        onClick={() => handleDeepSeekGenerate()}
                        disabled={loading || !input.trim() || (hasServerKey === false && !clientKey)}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
                        {UI_LABELS.generate[language]}
                    </button>
                </div>
            </div>



            {/* Custom Input Modal Overlay (Replaces standard selector content if active) */}



            {generatedPrompt && (
                <div className="space-y-4">
                    {/* Main Prompt Result */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">{UI_LABELS.generatedResult[language]}</h3>
                        <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 break-words mb-4 border border-slate-200">

                            {generatedPrompt}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(generatedPrompt);
                                    setIsCopied(true);
                                    setTimeout(() => setIsCopied(false), 2000);
                                }}
                                disabled={loading}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition font-medium ${isCopied
                                    ? 'bg-green-600 text-white'
                                    : loading
                                        ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    }`}
                            >
                                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? UI_LABELS.copied[language] : UI_LABELS.copy[language]}
                            </button>

                            <button
                                onClick={() => {
                                    if (rawJson) {
                                        onGenerate({
                                            ...rawJson,
                                            originalInput: input,
                                            enrichedPrompt: generatedPrompt
                                        });
                                        onEditInStandard();
                                    }
                                }}
                                disabled={loading || !rawJson}
                                className={`flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 py-2 rounded-lg text-sm transition flex items-center justify-center gap-2 font-medium ${loading || !rawJson ? 'opacity-50 cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200' : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin w-4 h-4" />
                                        {UI_LABELS.structuring[language]}
                                    </>
                                ) : !rawJson ? (
                                    UI_LABELS.structureFailed[language]
                                ) : (
                                    <>
                                        {UI_LABELS.refine[language]} <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* JSON Display Panel */}
                    {rawJson && (
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-6">
                            <h3 className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wider flex items-center justify-between">
                                <span>{UI_LABELS.structureJson[language]}</span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(JSON.stringify(rawJson, null, 2));
                                        setIsJsonCopied(true);
                                        setTimeout(() => setIsJsonCopied(false), 2000);
                                    }}
                                    className="text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                                    title={UI_LABELS.copy[language]}
                                >
                                    {isJsonCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    <span className="text-xs">{isJsonCopied ? UI_LABELS.copied[language] : UI_LABELS.copy[language]}</span>
                                </button>
                            </h3>
                            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 relative group">
                                <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap break-words leading-relaxed">
                                    {JSON.stringify(rawJson, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

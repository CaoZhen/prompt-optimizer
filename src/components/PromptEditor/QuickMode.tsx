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
}

export default function QuickMode({ onGenerate, onEditInStandard, currentData: _currentData, language }: QuickModeProps) {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [rawJson, setRawJson] = useState<PromptStructure | null>(null);
    const [isCopied, setIsCopied] = useState(false);

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

    const handleDeepSeekGenerate = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setGeneratedPrompt(''); // Clear previous result

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInput: input,
                    mode: 'quick',
                    language,
                    apiKey: clientKey // Pass client key if available
                })
            });

            if (!res.ok) {
                const err = await res.json();
                alert('Error: ' + (err.error || 'Failed to fetch'));
                return;
            }

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
                    const data = JSON.parse(jsonString); // This is now just the metadata

                    // Client-side prompt assembly
                    const assembledPrompt = buildPrompt(data, 'midjourney'); // Defaulting to MJ or making it generic

                    setGeneratedPrompt(assembledPrompt);
                    setRawJson(data);
                    onGenerate({
                        ...data,
                        originalInput: input,
                        enrichedPrompt: assembledPrompt
                    });

                } else {
                    throw new Error('No JSON found in response');
                }
            } catch (e) {
                console.error("Failed to parse JSON structure:", e);
                console.log("Raw output:", accumulated);
                alert("Failed to parse AI response. Please try again.");
            }
        } catch (e) {
            console.error(e);
            alert("Generation failed. See console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-sm font-medium mb-2 text-slate-700">
                    {UI_LABELS.quickModeInputLabel[language]}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={PLACEHOLDERS.quickInput[language]}
                    rows={10}

                    className="w-full bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-slate-400"
                />

                {/* DeepSeek Config Panel */}
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
                        onClick={handleDeepSeekGenerate}
                        disabled={loading || !input.trim() || (hasServerKey === false && !clientKey)}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
                        {UI_LABELS.generate[language]}
                    </button>
                </div>
            </div>

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
                            </h3>
                            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">

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

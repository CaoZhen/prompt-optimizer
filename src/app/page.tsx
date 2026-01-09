'use client';

import { useState } from 'react';
import QuickMode from '@/components/PromptEditor/QuickMode';
import StandardMode from '@/components/PromptEditor/StandardMode';
import { PromptStructure } from '@/lib/types';
import { TEMPLATES } from '@/lib/templates';
import { BookTemplate, Settings, Check } from 'lucide-react';
import { UI_LABELS, CATEGORY_NAMES } from '@/lib/i18n';



const DEFAULT_STRUCTURE: PromptStructure = {
    subject: '',
    spatialRelationship: '',
    environment: '',
    theme: '',
    style: '',
    modifiers: { lighting: '', colorMood: '', composition: '', visualLayers: '', details: '', effects: '', typography: '' },
    technical: { quality: '', aspectRatio: '', model: '' },
    negative: ''
};

export default function Home() {
    const [mode, setMode] = useState<'quick' | 'standard'>('quick');
    const [quickInput, setQuickInput] = useState('');
    const [promptData, setPromptData] = useState<PromptStructure>(DEFAULT_STRUCTURE);
    const [showTemplates, setShowTemplates] = useState(false);
    const [language, setLanguage] = useState<'chinese' | 'english'>('chinese');
    const [showSettings, setShowSettings] = useState(false);

    const handleGenerate = (data: PromptStructure) => {
        setPromptData(data);
        // Stay in quick mode to show result, user can manually switch
    };

    const applyTemplate = (template: typeof TEMPLATES[0]) => {
        setPromptData(template.structure);
        setMode('standard'); // Switch to standard to edit template
        setShowTemplates(false);
    };

    const groupedTemplates = TEMPLATES.reduce((acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = [];
        acc[curr.category].push(curr);
        return acc;
    }, {} as Record<string, typeof TEMPLATES>);

    return (
        <div className="max-w-6xl mx-auto relative">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                        {UI_LABELS.appTitle[language]}
                    </h1>

                    {/* Mode Switcher */}
                    <div className="bg-slate-100 p-1 rounded-lg inline-flex relative border border-slate-200 shadow-inner">
                        {/* Sliding Background */}
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm transition-all duration-300 ease-out ${mode === 'quick' ? 'left-1' : 'left-[calc(50%+0px)]'
                                }`}
                        />
                        <button
                            onClick={() => setMode('quick')}
                            className={`relative z-10 px-6 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 ${mode === 'quick'
                                ? 'text-blue-600'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {UI_LABELS.quickMode[language]}
                        </button>
                        <button
                            onClick={() => setMode('standard')}
                            className={`relative z-10 px-6 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 ${mode === 'standard'
                                ? 'text-blue-600'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {UI_LABELS.standardMode[language]}
                        </button>
                    </div>
                </div>

                {/* Template Dropdown */}
                <div className="relative flex items-center">
                    <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className={`flex items-center gap-2 transition px-4 py-2 rounded-lg border ${showTemplates ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm'}`}
                    >
                        <BookTemplate className="w-4 h-4" />
                        {UI_LABELS.loadTemplate[language]}
                    </button>


                    {/* Settings Button */}
                    <div className="relative inline-block ml-2">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`flex items-center gap-2 transition px-3 py-2.5 rounded-lg border ${showSettings ? 'bg-slate-100 border-slate-300' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm'}`}
                        >
                            <Settings className="w-5 h-5" />
                        </button>

                        {/* Settings Dropdown */}
                        {showSettings && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowSettings(false)} />
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-20 animate-in fade-in zoom-in-95 origin-top-right overflow-hidden">
                                    <div className="p-2 border-b border-slate-100 bg-slate-50/50">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">Language</span>
                                    </div>
                                    <div className="p-1">
                                        <button
                                            onClick={() => { setLanguage('chinese'); setShowSettings(false); }}
                                            className="w-full text-left flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-slate-50 transition text-slate-700"
                                        >
                                            <span>中文 (Chinese)</span>
                                            {language === 'chinese' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                                        </button>
                                        <button
                                            onClick={() => { setLanguage('english'); setShowSettings(false); }}
                                            className="w-full text-left flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-slate-50 transition text-slate-700"
                                        >
                                            <span>English</span>
                                            {language === 'english' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>


                    {/* Dropdown Menu */}
                    {showTemplates && (
                        <>
                            {/* Backdrop to close */}
                            <div className="fixed inset-0 z-10" onClick={() => setShowTemplates(false)} />

                            {/* Menu */}
                            <div className="absolute right-0 top-full mt-2 w-80 max-h-[600px] overflow-y-auto bg-white rounded-xl border border-slate-200 shadow-xl z-20 animate-in fade-in zoom-in-95 origin-top-right">
                                {(Object.keys(groupedTemplates) as (keyof typeof groupedTemplates)[]).map(category => (
                                    <div key={category} className="p-2">
                                        <div className="px-3 py-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50 rounded-md mb-1 border border-slate-100">
                                            {/* @ts-expect-error: Category keys mismatch potential */}
                                            {CATEGORY_NAMES[category]?.[language] || category}
                                        </div>

                                        <div className="space-y-1">
                                            {groupedTemplates[category].map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => applyTemplate(t)}
                                                    className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 transition group"
                                                >
                                                    <div className="font-medium text-slate-700 group-hover:text-blue-600 text-sm">{t.name.split('_')[1] || t.name}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="transition-all duration-300">
                {mode === 'quick' ? (
                    <div key="quick" className="animate-in fade-in slide-in-from-left-8 duration-500">
                        <QuickMode
                            onGenerate={handleGenerate}
                            onEditInStandard={() => setMode('standard')}
                            currentData={promptData}
                            language={language}
                            input={quickInput}
                            onInputChange={setQuickInput}
                        />
                    </div>
                ) : (
                    <div key="standard" className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <StandardMode
                            initialData={promptData}
                            onChange={setPromptData}
                            language={language}
                        />
                    </div>
                )}
            </div>

        </div>
    );
}

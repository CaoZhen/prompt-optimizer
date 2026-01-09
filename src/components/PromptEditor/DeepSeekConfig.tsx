import { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Save, Trash2, Zap, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { UI_LABELS } from '@/lib/i18n';

interface DeepSeekConfigProps {
    onKeyChange: (key: string | null) => void;
    language: 'chinese' | 'english';
}

export default function DeepSeekConfig({ onKeyChange, language }: DeepSeekConfigProps) {
    const [key, setKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [savedKey, setSavedKey] = useState<string | null>(null);
    const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
    const [testMessage, setTestMessage] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('deepseek_api_key');
        if (stored) {
            setSavedKey(stored);
            onKeyChange(stored);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTest = async () => {
        if (!key.trim()) return;
        setTestStatus('testing');
        setTestMessage('');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInput: 'Hello',
                    mode: 'quick', // Use quick mode for simple test
                    language: 'english',
                    apiKey: key
                })
            });

            if (res.ok) {
                setTestStatus('success');
                setTestMessage(UI_LABELS.deepSeekConfig.connectionSuccess[language]);
                // Auto-hide success message after 3 seconds
                setTimeout(() => {
                    setTestStatus('idle');
                    setTestMessage('');
                }, 3000);
            } else {
                const err = await res.json();
                setTestStatus('error');
                setTestMessage(err.error || UI_LABELS.deepSeekConfig.connectionFailed[language]);
            }
        } catch (e: unknown) {
            console.error('Test connection failed:', e);
            setTestStatus('error');
            setTestMessage(UI_LABELS.deepSeekConfig.networkError[language]);
        }

    };

    const handleSave = () => {
        if (!key.trim()) return;
        localStorage.setItem('deepseek_api_key', key);
        setSavedKey(key);
        onKeyChange(key);
        setKey(''); // Clear input for security
        setTestStatus('idle');
        setTestMessage('');
    };

    const handleClear = () => {
        localStorage.removeItem('deepseek_api_key');
        setSavedKey(null);
        onKeyChange(null);
    };

    if (savedKey) {
        return (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                    <Key className="w-4 h-4" />
                    <span>{UI_LABELS.deepSeekConfig.apiKeyConfigured[language]}</span>
                </div>
                <button
                    onClick={handleClear}
                    className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-red-50"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="text-xs">{UI_LABELS.deepSeekConfig.remove[language]}</span>
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 border border-orange-200 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600 shrink-0">
                    <Key className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-3">
                    <div>
                        <h4 className="text-sm font-semibold text-slate-800">{UI_LABELS.deepSeekConfig.title[language]}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-normal">
                            {UI_LABELS.deepSeekConfig.description[language]}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type={showKey ? "text" : "password"}
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="sk-..."
                                className={`w-full pl-3 pr-10 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${testStatus === 'error' ? 'border-red-300 bg-red-50' : testStatus === 'success' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300'}`}
                            />
                            <button
                                onClick={() => setShowKey(!showKey)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        <button
                            onClick={handleTest}
                            disabled={!key.trim() || testStatus === 'testing'}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border flex items-center gap-2 ${testStatus === 'success'
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                : testStatus === 'error'
                                    ? 'bg-red-100 text-red-700 border-red-200'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            title="Test Connection"
                        >
                            {testStatus === 'testing' ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : testStatus === 'success' ? (
                                <CheckCircle2 className="w-4 h-4" />
                            ) : testStatus === 'error' ? (
                                <AlertCircle className="w-4 h-4" />
                            ) : (
                                <Zap className="w-4 h-4" />
                            )}
                            {UI_LABELS.deepSeekConfig.test[language]}
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={!key.trim() || testStatus === 'testing'}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {UI_LABELS.deepSeekConfig.save[language]}
                        </button>
                    </div>

                    {/* Test Result Message */}
                    {testMessage && (
                        <div className={`text-xs flex items-center gap-1.5 ${testStatus === 'success' ? 'text-emerald-600' : 'text-red-600'
                            } animate-in fade-in slide-in-from-top-1`}>
                            {testStatus === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                            {testMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}



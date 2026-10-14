import { useState } from 'react';
import { SettingsForm } from './components/SettingsForm';
import { WidgetPreview } from './components/WidgetPreview';
import type { WidgetSettings, FormErrors } from './types/widget';
import { DEFAULT_SETTINGS } from './types/widget';
import { validateSettings } from './utils/validation';
import { Bot, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'flyrank_widget_settings_v1';

export function App() {
  const [settings, setSettings] = useState<WidgetSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const handleChange = (field: keyof WidgetSettings, value: any) => {
    setSettings((prev) => {
      const next = { ...prev, [field]: value };
      // Clear error for field if fixed
      if (errors[field as keyof FormErrors]) {
        const nextErrors = { ...errors };
        delete nextErrors[field as keyof FormErrors];
        setErrors(nextErrors);
      }
      return next;
    });
    setIsSaved(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all widget settings back to default values?')) {
      setSettings(DEFAULT_SETTINGS);
      setErrors({});
      localStorage.removeItem(STORAGE_KEY);
      setIsSaved(false);
    }
  };

  const handleSave = () => {
    const validationErrors = validateSettings(settings);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSaved(false);
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 4000);
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  FlyRank
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Lead Qualifier Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Interactive Widget Configuration & Deployment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Tab Switcher */}
            <div className="flex lg:hidden bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'editor'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Settings
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'preview'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Preview
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-time preview synchronized</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Settings Configuration Column */}
          <div
            className={`lg:col-span-7 space-y-6 ${
              activeTab === 'editor' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Widget Settings
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Configure how your AI lead qualification widget engages prospects, evaluates intent criteria, and guides visitors to take action.
              </p>
            </div>

            <SettingsForm
              settings={settings}
              errors={errors}
              onChange={handleChange}
              onReset={handleReset}
              onSave={handleSave}
              isSaved={isSaved}
            />
          </div>

          {/* Live Preview Column */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 ${
              activeTab === 'preview' ? 'block' : 'hidden lg:block'
            }`}
          >
            <WidgetPreview settings={settings} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-5 text-center text-xs text-slate-500">
        <p>
          FlyRank Capstone • AI-Powered Lead Qualification Platform
        </p>
      </footer>
    </div>
  );
}

export default App;

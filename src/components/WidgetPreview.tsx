import { useState } from 'react';
import { Sparkles, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import type { WidgetSettings } from '../types/widget';

interface WidgetPreviewProps {
  settings: WidgetSettings;
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({ settings }) => {
  const [simulatedBudget, setSimulatedBudget] = useState<string>('$5,000 - $20,000');
  const [isQualified, setIsQualified] = useState<boolean | null>(null);

  const isPositionRight = settings.position === 'bottom-right';

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQualified(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 rounded-2xl border border-slate-800/80 p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Live Preview
          </span>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Position: {settings.position}
        </div>
      </div>

      {/* Simulated Browser Viewport */}
      <div className="relative mt-4 flex-1 min-h-[520px] rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden flex flex-col">
        {/* Mock browser header */}
        <div className="h-9 bg-slate-900 border-b border-slate-800 px-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <div className="flex-1 max-w-xs mx-auto text-[11px] text-slate-400 bg-slate-950/80 px-3 py-0.5 rounded border border-slate-800 truncate font-mono text-center">
            {settings.websiteUrl || 'https://yourwebsite.com'}
          </div>
        </div>

        {/* Mock webpage content */}
        <div className="flex-1 p-6 flex flex-col justify-center items-center text-center opacity-40 select-none">
          <div className="h-5 w-32 bg-slate-800 rounded mb-3" />
          <div className="h-8 w-64 bg-slate-800 rounded mb-2" />
          <div className="h-4 w-48 bg-slate-800/70 rounded" />
        </div>

        {/* Floating interactive qualification widget overlay */}
        <div
          className={`absolute bottom-4 ${
            isPositionRight ? 'right-4' : 'left-4'
          } w-[360px] max-w-[calc(100%-2rem)] z-10 transition-all duration-300`}
        >
          <div className="bg-slate-900 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100 transition-all">
            {/* Widget Header */}
            <div
              className="p-4 flex items-center justify-between text-white"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight">
                    {settings.businessName || 'Lead Qualifier'}
                  </h4>
                  <p className="text-[11px] text-white/80 leading-none mt-0.5">
                    AI Intent Assessment
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20 text-white font-medium">
                Live
              </span>
            </div>

            {/* Widget Body */}
            <div className="p-4 space-y-4">
              {isQualified ? (
                <div className="text-center py-4 space-y-3">
                  <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="font-medium text-slate-100 text-sm">
                    High Intent Match Detected
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed px-2">
                    Thanks for providing context. Based on your inputs, your team aligns directly with our enterprise workflow.
                  </p>
                  <button
                    onClick={() => {
                      setIsQualified(null);
                    }}
                    className="text-xs text-slate-400 underline hover:text-slate-200 mt-2"
                  >
                    Reset preview conversation
                  </button>
                </div>
              ) : (
                <>
                  {/* Qualification prompt preview */}
                  <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-medium text-indigo-300">
                          Qualification Focus
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {settings.qualificationGoal ||
                            'Tell us about your team size and timeline to check eligibility.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form fields simulator */}
                  <form onSubmit={handleSimulateSubmit} className="space-y-2.5">
                    {settings.collectEmail && (
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Work Email
                        </label>
                        <input
                          type="email"
                          disabled
                          placeholder="alex@company.com"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 cursor-not-allowed"
                        />
                      </div>
                    )}

                    {settings.collectPhone && (
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          disabled
                          placeholder="+1 (555) 019-2834"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 cursor-not-allowed"
                        />
                      </div>
                    )}

                    {settings.collectBudget && (
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Budget Range
                        </label>
                        <select
                          value={simulatedBudget}
                          onChange={(e) => setSimulatedBudget(e.target.value)}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Under $5,000">Under $5,000</option>
                          <option value="$5,000 - $20,000">$5,000 - $20,000</option>
                          <option value="$20,000 - $50,000+">$20,000 - $50,000+</option>
                        </select>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.99]"
                        style={{ backgroundColor: settings.primaryColor }}
                      >
                        <span>{settings.ctaText || 'Submit & Qualify'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      {settings.ctaSubtext && (
                        <p className="text-[10px] text-center text-slate-500 mt-1.5">
                          {settings.ctaSubtext}
                        </p>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Micro footer */}
            <div className="bg-slate-950/60 px-3 py-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-400" />
                Verified Qualification AI
              </span>
              <span>FlyRank</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

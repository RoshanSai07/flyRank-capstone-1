import { useState } from 'react';
import {
  Building2,
  Globe,
  Target,
  MousePointerClick,
  Palette,
  CheckCircle,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import type { FormErrors, WidgetSettings } from '../types/widget';
import { QUALIFICATION_GOAL_PRESETS } from '../types/widget';

interface SettingsFormProps {
  settings: WidgetSettings;
  errors: FormErrors;
  onChange: (field: keyof WidgetSettings, value: any) => void;
  onReset: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  settings,
  errors,
  onChange,
  onReset,
  onSave,
  isSaved,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  const handleApplyPreset = (presetIndex: number) => {
    const preset = QUALIFICATION_GOAL_PRESETS[presetIndex];
    if (preset) {
      setSelectedPreset(preset.label);
      onChange('qualificationGoal', preset.goal);
      onChange('ctaText', preset.cta);
    }
  };

  return (
    <div className="space-y-6">
      {/* Save Success Banner */}
      {isSaved && (
        <div className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl animate-fade-in text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-medium">Settings saved successfully!</p>
            <p className="text-xs text-emerald-400/80">
              Your widget configuration is updated and ready to qualify prospects.
            </p>
          </div>
        </div>
      )}

      {/* Section 1: Basic Widget Settings */}
      <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-6 backdrop-blur-sm shadow-sm space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">
              Basic Widget Settings
            </h3>
            <p className="text-xs text-slate-400">
              Set your business identity and host destination.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Business Name */}
          <div>
            <label
              htmlFor="businessName"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Business Name <span className="text-rose-400">*</span>
            </label>
            <input
              id="businessName"
              type="text"
              value={settings.businessName}
              onChange={(e) => onChange('businessName', e.target.value)}
              placeholder="e.g. Acme Cloud Corp"
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl bg-slate-950 border transition-all text-slate-100 placeholder-slate-500 focus:outline-none ${
                errors.businessName
                  ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-blue-500'
              }`}
            />
            {errors.businessName && (
              <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.businessName}
              </p>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label
              htmlFor="websiteUrl"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Website URL <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                id="websiteUrl"
                type="url"
                value={settings.websiteUrl}
                onChange={(e) => onChange('websiteUrl', e.target.value)}
                placeholder="https://acme.com"
                className={`w-full text-sm pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border transition-all text-slate-100 placeholder-slate-500 focus:outline-none ${
                  errors.websiteUrl
                    ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                    : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
            {errors.websiteUrl && (
              <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.websiteUrl}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Qualification Goals */}
      <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-6 backdrop-blur-sm shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 text-sm">
                Qualification Goals & Criteria
              </h3>
              <p className="text-xs text-slate-400">
                Specify what profile or answers qualify a lead for priority routing.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            Load Strategy Preset (Optional)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {QUALIFICATION_GOAL_PRESETS.map((preset, idx) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleApplyPreset(idx)}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                  selectedPreset === preset.label
                    ? 'border-indigo-500/80 bg-indigo-500/10 text-indigo-200'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-300'
                }`}
              >
                <div className="font-medium truncate">{preset.label}</div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {preset.goal}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Qualification Goal Text Area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="qualificationGoal"
              className="text-xs font-medium text-slate-300"
            >
              Qualification Objective <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {settings.qualificationGoal.length} characters
            </span>
          </div>
          <textarea
            id="qualificationGoal"
            rows={3}
            value={settings.qualificationGoal}
            onChange={(e) => {
              setSelectedPreset('');
              onChange('qualificationGoal', e.target.value);
            }}
            placeholder="e.g. Identify teams with at least 50 employees who plan to implement solution within 3 months..."
            className={`w-full text-sm p-3 rounded-xl bg-slate-950 border transition-all text-slate-100 placeholder-slate-500 focus:outline-none resize-none ${
              errors.qualificationGoal
                ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                : 'border-slate-800 focus:border-indigo-500'
            }`}
          />
          {errors.qualificationGoal ? (
            <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.qualificationGoal}
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 mt-1">
              The AI conversational engine uses this objective to evaluate visitor inputs.
            </p>
          )}
        </div>

        {/* Target Audience */}
        <div>
          <label
            htmlFor="targetAudience"
            className="block text-xs font-medium text-slate-300 mb-1.5"
          >
            Target Audience Persona
          </label>
          <input
            id="targetAudience"
            type="text"
            value={settings.targetAudience}
            onChange={(e) => onChange('targetAudience', e.target.value)}
            placeholder="e.g. VP Sales, Head of RevOps, IT Procurement"
            className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 transition-all text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </section>

      {/* Section 3: Call-to-Action Configuration */}
      <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-6 backdrop-blur-sm shadow-sm space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">
              Call-to-Action (CTA) Configuration
            </h3>
            <p className="text-xs text-slate-400">
              Customize button labeling and subtext to maximize click-through rate.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CTA Text */}
          <div>
            <label
              htmlFor="ctaText"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              CTA Button Text <span className="text-rose-400">*</span>
            </label>
            <input
              id="ctaText"
              type="text"
              value={settings.ctaText}
              onChange={(e) => onChange('ctaText', e.target.value)}
              placeholder="e.g. Qualify Your Team Now"
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl bg-slate-950 border transition-all text-slate-100 placeholder-slate-500 focus:outline-none ${
                errors.ctaText
                  ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-emerald-500'
              }`}
            />
            {errors.ctaText && (
              <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.ctaText}
              </p>
            )}
          </div>

          {/* CTA Subtext */}
          <div>
            <label
              htmlFor="ctaSubtext"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Supporting Micro-copy
            </label>
            <input
              id="ctaSubtext"
              type="text"
              value={settings.ctaSubtext}
              onChange={(e) => onChange('ctaSubtext', e.target.value)}
              placeholder="e.g. Free 60-second assessment • No card required"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 transition-all text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Appearance & Capture Controls */}
      <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-6 backdrop-blur-sm shadow-sm space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">
              Styling & Information Capture
            </h3>
            <p className="text-xs text-slate-400">
              Tailor branding colors, screen placement, and lead data requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Brand Accent Color */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Brand Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => onChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => onChange('primaryColor', e.target.value)}
                className="w-32 text-xs font-mono px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none uppercase"
              />
            </div>
          </div>

          {/* Widget Placement */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Screen Position
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChange('position', 'bottom-right')}
                className={`flex-1 py-2 px-3 text-xs rounded-xl border font-medium transition-all ${
                  settings.position === 'bottom-right'
                    ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                Bottom Right
              </button>
              <button
                type="button"
                onClick={() => onChange('position', 'bottom-left')}
                className={`flex-1 py-2 px-3 text-xs rounded-xl border font-medium transition-all ${
                  settings.position === 'bottom-left'
                    ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                Bottom Left
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields Toggles */}
        <div className="pt-2">
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Fields to Prompt & Collect
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={settings.collectEmail}
                onChange={(e) => onChange('collectEmail', e.target.checked)}
                className="rounded border-slate-700 text-blue-600 focus:ring-0"
              />
              <span className="text-xs text-slate-300">Work Email</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={settings.collectPhone}
                onChange={(e) => onChange('collectPhone', e.target.checked)}
                className="rounded border-slate-700 text-blue-600 focus:ring-0"
              />
              <span className="text-xs text-slate-300">Phone Number</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={settings.collectBudget}
                onChange={(e) => onChange('collectBudget', e.target.checked)}
                className="rounded border-slate-700 text-blue-600 focus:ring-0"
              />
              <span className="text-xs text-slate-300">Budget Range</span>
            </label>
          </div>
        </div>
      </section>

      {/* Action Controls: Save & Reset */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/50 text-sm font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>Reset to Defaults</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

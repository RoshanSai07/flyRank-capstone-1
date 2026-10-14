import React from 'react';
import { Palette, Layout, RotateCcw, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AppearanceConfig, TemplateId, WidgetPosition } from '../../types/widget';
import { TEMPLATES } from '../../constants/templates';
import { evaluateButtonContrast } from '../../utils/contrast';

interface AppearanceSettingsProps {
  appearance: AppearanceConfig;
  onChangeAppearance: (fields: Partial<AppearanceConfig>) => void;
  onRestoreTemplateDefaults: () => void;
}

const PRESET_PALETTES = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Deep Indigo', hex: '#4f46e5' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Dark Slate', hex: '#0f172a' },
  { name: 'Violet', hex: '#7c3aed' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Teal', hex: '#0d9488' },
];

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  appearance,
  onChangeAppearance,
  onRestoreTemplateDefaults,
}) => {
  const contrast = evaluateButtonContrast(appearance.primaryColor);
  const currentTemplate = TEMPLATES[appearance.template];

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
              Beta Preview: Themes & Appearance
            </h2>
            <p className="text-xs text-slate-500">
              Customize design template, brand styling, and floating launcher placement
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRestoreTemplateDefaults}
          title="Restore this template's default primary color"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-slate-400" />
          <span>Restore Theme Defaults</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Template Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
            Design Template
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(TEMPLATES) as TemplateId[]).map((tmplKey) => {
              const tmpl = TEMPLATES[tmplKey];
              const isSelected = appearance.template === tmplKey;
              return (
                <button
                  key={tmplKey}
                  type="button"
                  onClick={() => onChangeAppearance({ template: tmplKey })}
                  className={`text-left p-3.5 rounded-xl border transition-all text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{tmpl.name}</span>
                    <span
                      className="w-3 h-3 rounded-full border border-slate-300"
                      style={{ backgroundColor: tmpl.defaultPrimaryColor }}
                    />
                  </div>
                  <span className="inline-block text-[11px] font-medium text-indigo-600 mb-1">
                    {tmpl.tagline}
                  </span>
                  <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                    {tmpl.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Brand Color & Contrast Verification */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="primaryColorInput"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
            >
              Primary Color
            </label>
            <span className="text-xs text-slate-500 font-mono">
              Default for {currentTemplate.name}: {currentTemplate.defaultPrimaryColor}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Color Input */}
            <div className="flex items-center gap-2 border border-slate-300 rounded-lg p-1.5 bg-white shadow-2xs">
              <input
                id="primaryColorInput"
                type="color"
                value={appearance.primaryColor}
                onChange={(e) => onChangeAppearance({ primaryColor: e.target.value })}
                className="w-8 h-8 rounded border-0 cursor-pointer p-0 bg-transparent"
                aria-label="Pick custom primary color"
              />
              <input
                type="text"
                value={appearance.primaryColor}
                onChange={(e) => onChangeAppearance({ primaryColor: e.target.value })}
                className="w-20 text-xs font-mono uppercase px-1 py-0.5 border-0 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700"
                aria-label="Primary color hex value"
              />
            </div>

            {/* Quick Swatches */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {PRESET_PALETTES.map((swatch) => (
                <button
                  key={swatch.hex}
                  type="button"
                  onClick={() => onChangeAppearance({ primaryColor: swatch.hex })}
                  title={swatch.name}
                  aria-label={`Select ${swatch.name}`}
                  className={`w-6 h-6 rounded-full border transition-transform ${
                    appearance.primaryColor.toLowerCase() === swatch.hex.toLowerCase()
                      ? 'scale-125 ring-2 ring-indigo-500 ring-offset-1 border-white shadow-xs'
                      : 'border-slate-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              ))}
            </div>
          </div>

          {/* Contrast & Accessibility Indicator */}
          <div className="p-3 rounded-lg border bg-slate-50 text-xs flex items-start gap-2.5">
            {contrast.passesAA ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-900">
                  Contrast Ratio: {contrast.ratio}:1
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    contrast.passesAA
                      ? 'bg-emerald-100 text-emerald-800'
                      : contrast.passesAALarge
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {contrast.passesAA ? 'WCAG AA Compliant' : 'Low Contrast Warning'}
                </span>
              </div>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Dynamic text color automatically set to{' '}
                <span className="font-mono font-semibold">{contrast.textColor}</span> to ensure
                legibility against the active template.
              </p>
            </div>
          </div>
        </div>

        {/* Widget Placement */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Widget Screen Position
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {(['bottom-right', 'bottom-left'] as WidgetPosition[]).map((pos) => {
              const isSelected = appearance.position === pos;
              return (
                <button
                  key={pos}
                  type="button"
                  onClick={() => onChangeAppearance({ position: pos })}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span>{pos === 'bottom-right' ? 'Bottom Right' : 'Bottom Left'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

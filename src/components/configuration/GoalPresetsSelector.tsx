import React from 'react';
import { Target, Check, Sparkles } from 'lucide-react';
import { PresetId } from '../../types/widget';
import { GOAL_PRESETS } from '../../constants/presets';

interface GoalPresetsSelectorProps {
  selectedPresetId: PresetId | null;
  objective: string;
  error?: string;
  onSelectPreset: (presetId: PresetId) => void;
  onChangeObjective: (objective: string) => void;
}

export const GoalPresetsSelector: React.FC<GoalPresetsSelectorProps> = ({
  selectedPresetId,
  objective,
  error,
  onSelectPreset,
  onChangeObjective,
}) => {
  return (
    <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Target className="w-5 h-5 text-indigo-600" />
        <div>
          <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
            Qualification Goals & Presets
          </h2>
          <p className="text-xs text-slate-500">
            Select a target customer segment to pre-fill your objective, then customize freely
          </p>
        </div>
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {GOAL_PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id)}
              className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-semibold text-slate-900 leading-snug">
                  {preset.name}
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Editable Objective Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="qualificationObjective"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            Qualification Objective <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-indigo-600 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Fully customizable
          </span>
        </div>
        <textarea
          id="qualificationObjective"
          rows={3}
          value={objective}
          onChange={(e) => onChangeObjective(e.target.value)}
          placeholder="State what qualifications a visitor must meet to be prioritized..."
          aria-invalid={!!error}
          aria-describedby={error ? 'objective-error' : undefined}
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors leading-relaxed ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-950'
              : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
          }`}
        />
        {error ? (
          <p id="objective-error" className="mt-1.5 text-xs text-rose-600 font-medium">
            {error}
          </p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">
            This objective guides the conversational context and rules used to evaluate prospective leads.
          </p>
        )}
      </div>
    </section>
  );
};

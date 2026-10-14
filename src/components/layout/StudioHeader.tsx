import React from 'react';
import { Sliders, RotateCcw, Save, Check } from 'lucide-react';

interface StudioHeaderProps {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onReset: () => void;
  onSave: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  hasUnsavedChanges,
  isSaving,
  onReset,
  onSave,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Sliders className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Widget Settings Studio
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                Beta Studio
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Configure visitor qualification flow and appearance in real-time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 mr-2">
            {hasUnsavedChanges ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Unsaved changes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Check className="w-3 h-3 text-emerald-600" />
                All changes saved
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 active:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

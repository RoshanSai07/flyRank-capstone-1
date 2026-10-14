import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-4 right-4 z-50 max-w-md w-full p-4 rounded-xl shadow-xl border flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : isError
          ? 'bg-rose-50 border-rose-200 text-rose-900'
          : 'bg-slate-900 border-slate-800 text-white'
      }`}
    >
      <div className="shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        ) : isError ? (
          <AlertCircle className="w-5 h-5 text-rose-600" />
        ) : null}
      </div>

      <div className="flex-1 text-sm">
        <h4 className="font-semibold text-slate-900">{toast.title}</h4>
        {toast.description && (
          <p className="mt-1 text-xs opacity-90 text-slate-700 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss message"
        className="shrink-0 text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

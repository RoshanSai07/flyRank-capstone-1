import React from 'react';
import { Trash2, Plus, Type, ListFilter, AlertCircle } from 'lucide-react';
import { QualificationQuestion, QuestionType, QuestionError } from '../../types/widget';

interface QuestionItemProps {
  question: QualificationQuestion;
  index: number;
  totalQuestions: number;
  error?: QuestionError;
  onUpdateLabel: (label: string) => void;
  onUpdateType: (type: QuestionType) => void;
  onAddOption: () => void;
  onUpdateOption: (optionId: string, label: string) => void;
  onRemoveOption: (optionId: string) => void;
  onRemoveQuestion: () => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  totalQuestions,
  error,
  onUpdateLabel,
  onUpdateType,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
  onRemoveQuestion,
}) => {
  return (
    <div
      data-testid={`question-item-${index}`}
      className={`p-4 sm:p-5 rounded-xl border transition-all ${
        error?.label || error?.options
          ? 'border-rose-300 bg-rose-50/20 shadow-xs'
          : 'border-slate-200 hover:border-slate-300 bg-white shadow-xs'
      }`}
    >
      {/* Header with question number and delete button */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center border border-slate-200">
            {index + 1}
          </span>
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Question #{index + 1}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Question Type Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => onUpdateType('short_text')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                question.type === 'short_text'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Type className="w-3 h-3" />
              <span>Short Text</span>
            </button>
            <button
              type="button"
              onClick={() => onUpdateType('single_select')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                question.type === 'single_select'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-3 h-3" />
              <span>Single Select</span>
            </button>
          </div>

          {/* Remove Question button (only if > 1 question) */}
          <button
            type="button"
            onClick={onRemoveQuestion}
            disabled={totalQuestions <= 1}
            aria-label={`Remove question ${index + 1}`}
            className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400 rounded-md hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Label Input */}
      <div className="mb-3">
        <label
          htmlFor={`q-label-${question.id}`}
          className="block text-xs font-medium text-slate-700 mb-1"
        >
          Question Prompt / Label <span className="text-rose-500">*</span>
        </label>
        <input
          id={`q-label-${question.id}`}
          type="text"
          value={question.label}
          onChange={(e) => onUpdateLabel(e.target.value)}
          placeholder="e.g., What is your estimated annual budget?"
          aria-invalid={!!error?.label}
          aria-describedby={error?.label ? `q-error-label-${question.id}` : undefined}
          className={`w-full px-3 py-2 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
            error?.label
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-950'
              : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
          }`}
        />
        {error?.label && (
          <p
            id={`q-error-label-${question.id}`}
            className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {error.label}
          </p>
        )}
      </div>

      {/* Single Select Options */}
      {question.type === 'single_select' && (
        <div className="mt-3 pl-3 sm:pl-4 border-l-2 border-slate-200 space-y-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Answer Choices (min 2 required)
            </span>
            <button
              type="button"
              onClick={onAddOption}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Option</span>
            </button>
          </div>

          {error?.options && (
            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mb-2 bg-rose-50 p-2 rounded-md border border-rose-200">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error.options}</span>
            </p>
          )}

          <div className="space-y-2">
            {(question.options || []).map((opt, optIndex) => (
              <div key={opt.id} className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 w-4 text-center">
                  {String.fromCharCode(65 + optIndex)}
                </span>
                <input
                  type="text"
                  value={opt.label}
                  onChange={(e) => onUpdateOption(opt.id, e.target.value)}
                  placeholder={`Option ${optIndex + 1} text`}
                  aria-label={`Option ${optIndex + 1} for question ${index + 1}`}
                  className="flex-1 px-2.5 py-1.5 text-xs sm:text-sm rounded-md border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => onRemoveOption(opt.id)}
                  disabled={(question.options || []).length <= 2}
                  aria-label={`Delete option ${optIndex + 1}`}
                  className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

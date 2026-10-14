import React from 'react';
import { HelpCircle, Plus } from 'lucide-react';
import { QualificationQuestion, QuestionType, ValidationErrors } from '../../types/widget';
import { QuestionItem } from './QuestionItem';

interface QuestionManagerProps {
  questions: QualificationQuestion[];
  errors: ValidationErrors;
  onUpdateQuestions: (questions: QualificationQuestion[]) => void;
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({
  questions,
  errors,
  onUpdateQuestions,
}) => {
  const handleAddQuestion = () => {
    const newId = `q-${Date.now()}`;
    const newQuestion: QualificationQuestion = {
      id: newId,
      label: '',
      type: 'single_select',
      options: [
        { id: `opt-${Date.now()}-1`, label: 'Option 1' },
        { id: `opt-${Date.now()}-2`, label: 'Option 2' },
      ],
    };
    onUpdateQuestions([...questions, newQuestion]);
  };

  const handleUpdateLabel = (index: number, label: string) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], label };
    onUpdateQuestions(updated);
  };

  const handleUpdateType = (index: number, type: QuestionType) => {
    const updated = [...questions];
    const target = updated[index];
    if (type === 'single_select' && (!target.options || target.options.length < 2)) {
      target.options = [
        { id: `opt-${Date.now()}-1`, label: 'Option 1' },
        { id: `opt-${Date.now()}-2`, label: 'Option 2' },
      ];
    }
    target.type = type;
    onUpdateQuestions(updated);
  };

  const handleAddOption = (questionIndex: number) => {
    const updated = [...questions];
    const target = updated[questionIndex];
    const options = target.options ? [...target.options] : [];
    options.push({
      id: `opt-${Date.now()}-${options.length + 1}`,
      label: `Option ${options.length + 1}`,
    });
    target.options = options;
    onUpdateQuestions(updated);
  };

  const handleUpdateOption = (questionIndex: number, optionId: string, label: string) => {
    const updated = [...questions];
    const target = updated[questionIndex];
    if (!target.options) return;
    target.options = target.options.map((opt) =>
      opt.id === optionId ? { ...opt, label } : opt
    );
    onUpdateQuestions(updated);
  };

  const handleRemoveOption = (questionIndex: number, optionId: string) => {
    const updated = [...questions];
    const target = updated[questionIndex];
    if (!target.options) return;
    target.options = target.options.filter((opt) => opt.id !== optionId);
    onUpdateQuestions(updated);
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    if (questions.length <= 1) return;
    const updated = questions.filter((_, i) => i !== questionIndex);
    onUpdateQuestions(updated);
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
              Qualification Questions
            </h2>
            <p className="text-xs text-slate-500">
              Customize the interactive questions presented to your website prospects
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddQuestion}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 active:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Question</span>
        </button>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => {
          const qError = errors.questions ? errors.questions[q.id] : undefined;
          return (
            <QuestionItem
              key={q.id}
              question={q}
              index={index}
              totalQuestions={questions.length}
              error={qError}
              onUpdateLabel={(label) => handleUpdateLabel(index, label)}
              onUpdateType={(type) => handleUpdateType(index, type)}
              onAddOption={() => handleAddOption(index)}
              onUpdateOption={(optId, label) => handleUpdateOption(index, optId, label)}
              onRemoveOption={(optId) => handleRemoveOption(index, optId)}
              onRemoveQuestion={() => handleRemoveQuestion(index)}
            />
          );
        })}
      </div>
    </section>
  );
};

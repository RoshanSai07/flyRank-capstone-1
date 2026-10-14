import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  X,
  ChevronRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { WidgetConfig } from '../../types/widget';
import { TEMPLATES } from '../../constants/templates';
import { evaluateButtonContrast } from '../../utils/contrast';

interface WidgetFloatingCardProps {
  config: WidgetConfig;
}

export const WidgetFloatingCard: React.FC<WidgetFloatingCardProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = welcome, 1..N = question steps, N+1 = completed
  const [sampleAnswers, setSampleAnswers] = useState<Record<string, string>>({});
  const [currentInputText, setCurrentInputText] = useState('');

  // Reset step if questions count changed or template switched
  useEffect(() => {
    setCurrentStep(0);
    setSampleAnswers({});
    setCurrentInputText('');
  }, [config.questions.length, config.appearance.template]);

  const templateDef = TEMPLATES[config.appearance.template];
  const contrast = evaluateButtonContrast(config.appearance.primaryColor);

  const totalQuestions = config.questions.length;
  const isWelcomeStep = currentStep === 0;
  const isCompleted = currentStep > totalQuestions;
  const currentQuestionIndex = currentStep - 1;
  const activeQuestion =
    currentStep >= 1 && currentStep <= totalQuestions
      ? config.questions[currentQuestionIndex]
      : null;

  const handleStart = () => {
    if (totalQuestions > 0) {
      setCurrentStep(1);
    }
  };

  const handleSelectOption = (optionLabel: string) => {
    if (!activeQuestion) return;
    setSampleAnswers((prev) => ({ ...prev, [activeQuestion.id]: optionLabel }));
    if (currentStep < totalQuestions) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(totalQuestions + 1);
    }
  };

  const handleNextText = () => {
    if (!activeQuestion) return;
    setSampleAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: currentInputText.trim() || 'Sample visitor response',
    }));
    setCurrentInputText('');
    if (currentStep < totalQuestions) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(totalQuestions + 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSampleAnswers({});
    setCurrentInputText('');
  };

  return (
    <div
      data-testid="widget-preview-card"
      className="flex flex-col items-end pointer-events-auto max-w-[360px] w-full"
    >
      {isOpen ? (
        <div
          className={`w-full overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${templateDef.cardStyle}`}
        >
          {/* Top Preview Banner */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-1 text-[10px] text-amber-800 font-medium flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Interactive Demo (Simulated Flow)
            </span>
            <span className="text-[9px] uppercase tracking-wider text-amber-700/80">
              {templateDef.name} Theme
            </span>
          </div>

          {/* Widget Card Header */}
          <div className={`flex items-center justify-between px-4 py-3 ${templateDef.headerStyle}`}>
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-2xs"
                style={{
                  backgroundColor: config.appearance.primaryColor,
                  color: contrast.textColor,
                }}
              >
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight leading-tight">
                  {config.businessName || 'Your Business'}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-slate-500 font-normal">
                    AI Lead Assistant
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close widget preview"
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Widget Body Content */}
          <div className="p-4 space-y-4 text-xs">
            {/* Step 0: Welcome / Objective */}
            {isWelcomeStep && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Qualification Objective
                  </span>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {config.objective || 'Identify high-value leads and clarify project requirements.'}
                  </p>
                </div>

                <div className="space-y-1 text-slate-600 text-xs">
                  <p className="font-medium text-slate-800">
                    Hello! Answer {totalQuestions} quick {totalQuestions === 1 ? 'question' : 'questions'} to see if we're a match:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStart}
                  style={{
                    backgroundColor: config.appearance.primaryColor,
                    color: contrast.textColor,
                  }}
                  className={`w-full py-2.5 px-4 font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-opacity hover:opacity-95 active:scale-[0.99] ${templateDef.buttonRadius}`}
                >
                  <span>{config.appearance.ctaText || 'Qualify Now'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Step 1..N: Question Steps */}
            {!isWelcomeStep && !isCompleted && activeQuestion && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>
                    Question {currentStep} of {totalQuestions}
                  </span>
                  <span className="text-slate-400">
                    {Math.round((currentStep / totalQuestions) * 100)}% Complete
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${(currentStep / totalQuestions) * 100}%`,
                      backgroundColor: config.appearance.primaryColor,
                    }}
                  />
                </div>

                <div className="pt-1">
                  <h5 className="text-sm font-semibold text-slate-900 leading-snug">
                    {activeQuestion.label || `Question #${currentStep}`}
                  </h5>
                </div>

                {/* Single Select Options */}
                {activeQuestion.type === 'single_select' && (
                  <div className="space-y-2 pt-1">
                    {(activeQuestion.options || []).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(opt.label)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs font-medium flex items-center justify-between ${templateDef.optionStyle}`}
                      >
                        <span>{opt.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Short Text Option */}
                {activeQuestion.type === 'short_text' && (
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      value={currentInputText}
                      onChange={(e) => setCurrentInputText(e.target.value)}
                      placeholder={activeQuestion.placeholder || 'Type sample response...'}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                    <button
                      type="button"
                      onClick={handleNextText}
                      style={{
                        backgroundColor: config.appearance.primaryColor,
                        color: contrast.textColor,
                      }}
                      className={`w-full py-2 px-3 font-semibold text-xs shadow-xs transition-opacity hover:opacity-95 ${templateDef.buttonRadius}`}
                    >
                      Continue
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step N+1: Completed Summary */}
            {isCompleted && (
              <div className="space-y-3 animate-in fade-in text-center py-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">
                    Qualification Completed
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Illustrative qualification summary captured in simulation.
                  </p>
                </div>

                <div className="text-left bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] space-y-1.5 max-h-36 overflow-y-auto">
                  {config.questions.map((q) => (
                    <div key={q.id}>
                      <span className="font-semibold text-slate-700 block text-[10px]">
                        {q.label}
                      </span>
                      <span className="text-slate-600 italic">
                        {sampleAnswers[q.id] || '(Sample option selected)'}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restart Preview Flow</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer Notice */}
          <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 text-[10px] text-slate-400 text-center">
            Simulated visitor preview • No real data stored or submitted
          </div>
        </div>
      ) : (
        /* Floating Launcher Bubble */
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: config.appearance.primaryColor,
            color: contrast.textColor,
          }}
          aria-label="Open widget preview"
          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export type QuestionType = 'short_text' | 'single_select';

export interface AnswerOption {
  id: string;
  label: string;
}

export interface QualificationQuestion {
  id: string;
  label: string;
  type: QuestionType;
  options?: AnswerOption[];
  placeholder?: string;
}

export type TemplateId = 'minimal' | 'professional' | 'bold';
export type WidgetPosition = 'bottom-right' | 'bottom-left';

export interface AppearanceConfig {
  template: TemplateId;
  primaryColor: string;
  position: WidgetPosition;
  ctaText: string;
}

export type PresetId = 'enterprise' | 'agency' | 'self_serve';

export interface GoalPreset {
  id: PresetId;
  name: string;
  description: string;
  objective: string;
  startingQuestions: QualificationQuestion[];
}

export interface WidgetConfig {
  businessName: string;
  websiteUrl: string;
  objective: string;
  selectedPresetId: PresetId | null;
  questions: QualificationQuestion[];
  appearance: AppearanceConfig;
}

export interface QuestionError {
  label?: string;
  options?: string;
}

export interface ValidationErrors {
  businessName?: string;
  websiteUrl?: string;
  objective?: string;
  ctaText?: string;
  questions?: Record<string, QuestionError>;
}

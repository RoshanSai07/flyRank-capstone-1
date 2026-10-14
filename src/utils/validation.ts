import { WidgetConfig, ValidationErrors, QuestionError } from '../types/widget';

export function isValidHttpUrl(string: string): boolean {
  try {
    const url = new URL(string.trim());
    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      url.hostname.length > 0 &&
      url.hostname.includes('.')
    );
  } catch {
    return false;
  }
}

export function validateWidgetConfig(config: WidgetConfig): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};
  let isValid = true;

  // Business Name
  if (!config.businessName || config.businessName.trim() === '') {
    errors.businessName = 'Business name is required.';
    isValid = false;
  }

  // Website URL
  const trimmedUrl = (config.websiteUrl || '').trim();
  if (!trimmedUrl) {
    errors.websiteUrl = 'Website URL is required.';
    isValid = false;
  } else if (!isValidHttpUrl(trimmedUrl)) {
    errors.websiteUrl = 'Please enter a valid HTTP or HTTPS URL (e.g., https://example.com).';
    isValid = false;
  }

  // Qualification Objective
  if (!config.objective || config.objective.trim() === '') {
    errors.objective = 'Qualification objective is required.';
    isValid = false;
  }

  // CTA Text
  if (!config.appearance.ctaText || config.appearance.ctaText.trim() === '') {
    errors.ctaText = 'Call-to-action text is required.';
    isValid = false;
  }

  // Custom Questions
  const questionErrors: Record<string, QuestionError> = {};
  let hasQuestionError = false;

  config.questions.forEach((q, index) => {
    const qError: QuestionError = {};
    const key = q.id || `q-${index}`;

    if (!q.label || q.label.trim() === '') {
      qError.label = 'Question label cannot be empty.';
      hasQuestionError = true;
    }

    if (q.type === 'single_select') {
      const options = q.options || [];
      if (options.length < 2) {
        qError.options = 'Single-select questions require at least 2 answer options.';
        hasQuestionError = true;
      } else {
        const hasEmptyOption = options.some(
          (opt) => !opt.label || opt.label.trim() === ''
        );
        if (hasEmptyOption) {
          qError.options = 'All answer options must contain non-empty text.';
          hasQuestionError = true;
        }
      }
    }

    if (qError.label || qError.options) {
      questionErrors[key] = qError;
    }
  });

  if (hasQuestionError) {
    errors.questions = questionErrors;
    isValid = false;
  }

  return { isValid, errors };
}

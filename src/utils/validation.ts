import type { FormErrors, WidgetSettings } from '../types/widget';

export function validateSettings(settings: WidgetSettings): FormErrors {
  const errors: FormErrors = {};

  // Business Name validation
  if (!settings.businessName.trim()) {
    errors.businessName = 'Business name is required.';
  } else if (settings.businessName.trim().length < 2) {
    errors.businessName = 'Business name must be at least 2 characters.';
  }

  // Website URL validation
  if (!settings.websiteUrl.trim()) {
    errors.websiteUrl = 'Website URL is required.';
  } else {
    try {
      const url = new URL(settings.websiteUrl);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        errors.websiteUrl = 'URL must begin with http:// or https://';
      }
    } catch {
      errors.websiteUrl = 'Please enter a valid website URL (e.g. https://example.com)';
    }
  }

  // Qualification Goal validation
  if (!settings.qualificationGoal.trim()) {
    errors.qualificationGoal = 'Please define what criteria your widget should qualify.';
  } else if (settings.qualificationGoal.trim().length < 15) {
    errors.qualificationGoal = 'Provide at least 15 characters describing what makes a qualified lead.';
  }

  // CTA Text validation
  if (!settings.ctaText.trim()) {
    errors.ctaText = 'Call-to-action button text is required.';
  } else if (settings.ctaText.trim().length > 35) {
    errors.ctaText = 'CTA text should be concise (max 35 characters).';
  }

  return errors;
}

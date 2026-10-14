import { describe, it, expect } from 'vitest';
import { validateWidgetConfig, isValidHttpUrl } from '../utils/validation';
import { INITIAL_WIDGET_CONFIG } from '../constants/defaults';
import { WidgetConfig } from '../types/widget';

describe('Widget Validation Engine', () => {
  it('validates a correct initial configuration with zero errors', () => {
    const { isValid, errors } = validateWidgetConfig(INITIAL_WIDGET_CONFIG);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  describe('Website URL validation', () => {
    it('accepts valid HTTP and HTTPS URLs', () => {
      expect(isValidHttpUrl('https://example.com')).toBe(true);
      expect(isValidHttpUrl('http://mysite.org/leads')).toBe(true);
      expect(isValidHttpUrl('https://sub.domain.co.uk')).toBe(true);
    });

    it('rejects invalid URLs without protocol, non-http, or malformed strings', () => {
      expect(isValidHttpUrl('example.com')).toBe(false);
      expect(isValidHttpUrl('ftp://example.com')).toBe(false);
      expect(isValidHttpUrl('htt://invalid')).toBe(false);
      expect(isValidHttpUrl('random-text')).toBe(false);
      expect(isValidHttpUrl('')).toBe(false);
    });

    it('returns error when website URL is invalid in config', () => {
      const config: WidgetConfig = {
        ...INITIAL_WIDGET_CONFIG,
        websiteUrl: 'not-a-url',
      };
      const { isValid, errors } = validateWidgetConfig(config);
      expect(isValid).toBe(false);
      expect(errors.websiteUrl).toContain('valid HTTP or HTTPS URL');
    });
  });

  describe('Required fields validation', () => {
    it('requires non-empty business name', () => {
      const config: WidgetConfig = {
        ...INITIAL_WIDGET_CONFIG,
        businessName: '   ',
      };
      const { isValid, errors } = validateWidgetConfig(config);
      expect(isValid).toBe(false);
      expect(errors.businessName).toBe('Business name is required.');
    });

    it('requires non-empty qualification objective', () => {
      const config: WidgetConfig = {
        ...INITIAL_WIDGET_CONFIG,
        objective: '',
      };
      const { isValid, errors } = validateWidgetConfig(config);
      expect(isValid).toBe(false);
      expect(errors.objective).toBe('Qualification objective is required.');
    });

    it('requires non-empty CTA text', () => {
      const config: WidgetConfig = {
        ...INITIAL_WIDGET_CONFIG,
        appearance: {
          ...INITIAL_WIDGET_CONFIG.appearance,
          ctaText: '   ',
        },
      };
      const { isValid, errors } = validateWidgetConfig(config);
      expect(isValid).toBe(false);
      expect(errors.ctaText).toBe('Call-to-action text is required.');
    });
  });

  describe('Questions validation', () => {
    it('flags empty question label', () => {
      const config: WidgetConfig = {
        ...INITIAL_WIDGET_CONFIG,
        questions: [
          {
            id: 'q-1',
            label: '   ',
            type: 'short_text',
          },
        ],
      };
      const { isValid, errors } = validateWidgetConfig(config);
      expect(isValid).toBe(false);
      expect(errors.questions?.['q-1']?.label).toBe('Question label cannot be empty.');
    });

    it('flags single-select questions with fewer than 2 options', () => {
      const config: WidgetConfig = {
        ...INITIAL_WIDGET_CONFIG,
        questions: [
          {
            id: 'q-1',
            label: 'Valid Question Prompt',
            type: 'single_select',
            options: [{ id: 'opt-1', label: 'Only One Option' }],
          },
        ],
      };
      const { isValid, errors } = validateWidgetConfig(config);
      expect(isValid).toBe(false);
      expect(errors.questions?.['q-1']?.options).toContain('at least 2 answer options');
    });

    it('flags single-select questions with blank options', () => {
      const config: WidgetConfig = {
        ...INITIAL_WIDGET_CONFIG,
        questions: [
          {
            id: 'q-1',
            label: 'Valid Question Prompt',
            type: 'single_select',
            options: [
              { id: 'opt-1', label: 'Option A' },
              { id: 'opt-2', label: '  ' },
            ],
          },
        ],
      };
      const { isValid, errors } = validateWidgetConfig(config);
      expect(isValid).toBe(false);
      expect(errors.questions?.['q-1']?.options).toContain('non-empty text');
    });
  });
});

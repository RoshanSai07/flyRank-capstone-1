import { WidgetConfig } from '../types/widget';
import { GOAL_PRESETS } from './presets';
import { TEMPLATES } from './templates';

export const INITIAL_WIDGET_CONFIG: WidgetConfig = {
  businessName: 'Your Business',
  websiteUrl: 'https://example.com',
  objective: GOAL_PRESETS[0].objective,
  selectedPresetId: 'enterprise',
  questions: JSON.parse(JSON.stringify(GOAL_PRESETS[0].startingQuestions)),
  appearance: {
    template: 'professional',
    primaryColor: TEMPLATES.professional.defaultPrimaryColor,
    position: 'bottom-right',
    ctaText: 'Qualify Now',
  },
};

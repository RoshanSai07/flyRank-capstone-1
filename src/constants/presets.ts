import { GoalPreset } from '../types/widget';

export const GOAL_PRESETS: GoalPreset[] = [
  {
    id: 'enterprise',
    name: 'Enterprise Lead Qualification',
    description: 'Filter for high-value enterprise accounts, team capacity, and purchasing authority.',
    objective: 'Qualify enterprise accounts by evaluating organization size, annual software budget, and procurement timeline before routing to senior sales executives.',
    startingQuestions: [
      {
        id: 'ent-1',
        label: 'How many employees are in your organization?',
        type: 'single_select',
        options: [
          { id: 'opt-1', label: '1 - 50 employees' },
          { id: 'opt-2', label: '51 - 250 employees' },
          { id: 'opt-3', label: '251 - 1,000 employees' },
          { id: 'opt-4', label: '1,000+ employees' },
        ],
      },
      {
        id: 'ent-2',
        label: 'What is your estimated annual budget for this initiative?',
        type: 'single_select',
        options: [
          { id: 'opt-5', label: 'Under $25,000' },
          { id: 'opt-6', label: '$25,000 - $75,000' },
          { id: 'opt-7', label: '$75,000+' },
        ],
      },
      {
        id: 'ent-3',
        label: 'What is your primary implementation timeline?',
        type: 'short_text',
        placeholder: 'e.g., Immediate (next 30 days) or Q3 rollout',
      },
    ],
  },
  {
    id: 'agency',
    name: 'Agency Prospect Discovery',
    description: 'Uncover prospective client scope, monthly retainer budgets, and urgent deliverables.',
    objective: 'Discover incoming client project scopes, monthly retainer range, and decision-maker readiness to ensure high-value proposal alignment.',
    startingQuestions: [
      {
        id: 'agy-1',
        label: 'What services are you seeking help with?',
        type: 'single_select',
        options: [
          { id: 'opt-8', label: 'Growth Strategy & Paid Media' },
          { id: 'opt-9', label: 'Custom Web & Product Design' },
          { id: 'opt-10', label: 'Full Full-Funnel Consulting' },
        ],
      },
      {
        id: 'agy-2',
        label: 'What is your target monthly budget for an agency partner?',
        type: 'single_select',
        options: [
          { id: 'opt-11', label: '$3,000 - $7,000 / month' },
          { id: 'opt-12', label: '$7,000 - $15,000 / month' },
          { id: 'opt-13', label: '$15,000+ / month' },
        ],
      },
      {
        id: 'agy-3',
        label: 'What is your target project launch date?',
        type: 'short_text',
        placeholder: 'e.g., Within 60 days',
      },
    ],
  },
  {
    id: 'self_serve',
    name: 'Self-Serve Product Qualification',
    description: 'Direct inbound visitors between instant self-serve onboarding vs. high-touch product demos.',
    objective: 'Identify team scale and primary use cases to seamlessly guide self-serve signups while capturing high-intent prospects for customized demos.',
    startingQuestions: [
      {
        id: 'ss-1',
        label: 'How will you or your team primarily use the product?',
        type: 'single_select',
        options: [
          { id: 'opt-14', label: 'Individual productivity & evaluation' },
          { id: 'opt-15', label: 'Team collaboration (2-20 users)' },
          { id: 'opt-16', label: 'Company-wide automated workflow' },
        ],
      },
      {
        id: 'ss-2',
        label: 'What is your main priority for getting started today?',
        type: 'short_text',
        placeholder: 'e.g., Automating lead capture on marketing website',
      },
    ],
  },
];

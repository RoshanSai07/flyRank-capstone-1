export interface WidgetSettings {
  businessName: string;
  websiteUrl: string;
  qualificationGoal: string;
  targetAudience: string;
  ctaText: string;
  ctaSubtext: string;
  primaryColor: string;
  position: 'bottom-right' | 'bottom-left';
  collectEmail: boolean;
  collectPhone: boolean;
  collectBudget: boolean;
}

export interface FormErrors {
  businessName?: string;
  websiteUrl?: string;
  qualificationGoal?: string;
  ctaText?: string;
}

export const DEFAULT_SETTINGS: WidgetSettings = {
  businessName: 'Acme SaaS',
  websiteUrl: 'https://acme.example.com',
  qualificationGoal: 'Identify enterprise teams with 50+ members needing automated lead routing.',
  targetAudience: 'VP of Sales, RevOps Directors, Marketing Leads',
  ctaText: 'Qualify Your Team Now',
  ctaSubtext: 'Takes less than 60 seconds • Get immediate fit report',
  primaryColor: '#2563eb',
  position: 'bottom-right',
  collectEmail: true,
  collectPhone: false,
  collectBudget: true,
};

export const QUALIFICATION_GOAL_PRESETS = [
  {
    label: 'B2B Enterprise Lead Routing',
    goal: 'Identify enterprise teams with 50+ members needing automated lead routing.',
    cta: 'Check Enterprise Eligibility',
  },
  {
    label: 'High-Ticket Agency Discovery',
    goal: 'Filter prospects with monthly marketing budgets exceeding $5,000 seeking bespoke advisory.',
    cta: 'Book Discovery Assessment',
  },
  {
    label: 'Self-Serve Product Pilot',
    goal: 'Find software engineering teams seeking self-hosted developer tool pilots.',
    cta: 'Start 14-Day Free Pilot',
  },
];

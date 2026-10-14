import { TemplateId } from '../types/widget';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  defaultPrimaryColor: string;
  cardStyle: string;
  headerStyle: string;
  badgeStyle: string;
  buttonRadius: string;
  optionStyle: string;
}

export const TEMPLATES: Record<TemplateId, TemplateDefinition> = {
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Restrained & Clean',
    description: 'Clean typography, subtle hairline borders, and understated monochrome or muted accents.',
    defaultPrimaryColor: '#0f172a', // Slate 900
    cardStyle: 'bg-white border border-slate-200/90 shadow-sm rounded-lg',
    headerStyle: 'border-b border-slate-100 pb-3 text-slate-800',
    badgeStyle: 'bg-slate-100 text-slate-700 text-xs font-normal border border-slate-200',
    buttonRadius: 'rounded-md',
    optionStyle: 'border border-slate-200 hover:border-slate-400 bg-white text-slate-800 transition-colors',
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    tagline: 'Structured & Polished',
    description: 'Balanced visual hierarchy, subtle card elevation, and a credible corporate SaaS appearance.',
    defaultPrimaryColor: '#2563eb', // Royal Blue
    cardStyle: 'bg-white border border-slate-200 shadow-xl rounded-xl ring-1 ring-slate-900/5',
    headerStyle: 'bg-slate-50/80 border-b border-slate-200/80 p-4 -m-4 mb-4 rounded-t-xl',
    badgeStyle: 'bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100',
    buttonRadius: 'rounded-lg',
    optionStyle: 'border border-slate-200/80 bg-slate-50/60 hover:bg-slate-100/80 text-slate-800 hover:border-blue-400 transition-all',
  },
  bold: {
    id: 'bold',
    name: 'Bold',
    tagline: 'High Contrast & Expressive',
    description: 'Strong contrast framing, prominent calls to action, and energetic visual engagement.',
    defaultPrimaryColor: '#4f46e5', // Vibrant Indigo
    cardStyle: 'bg-white border-2 border-slate-900 shadow-2xl rounded-2xl',
    headerStyle: 'bg-slate-900 text-white p-4 -m-4 mb-4 rounded-t-xl',
    badgeStyle: 'bg-amber-400/20 text-amber-900 font-semibold text-xs border border-amber-300',
    buttonRadius: 'rounded-xl font-bold shadow-md',
    optionStyle: 'border-2 border-slate-200 hover:border-slate-900 bg-white text-slate-900 font-medium hover:shadow-sm transition-all',
  },
};

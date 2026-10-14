import React from 'react';
import { Building2, Globe, Sparkles } from 'lucide-react';
import { ValidationErrors } from '../../types/widget';

interface BusinessSettingsFormProps {
  businessName: string;
  websiteUrl: string;
  ctaText: string;
  errors: ValidationErrors;
  onChange: (fields: { businessName?: string; websiteUrl?: string; ctaText?: string }) => void;
}

export const BusinessSettingsForm: React.FC<BusinessSettingsFormProps> = ({
  businessName,
  websiteUrl,
  ctaText,
  errors,
  onChange,
}) => {
  return (
    <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Building2 className="w-5 h-5 text-indigo-600" />
        <div>
          <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
            Business Settings
          </h2>
          <p className="text-xs text-slate-500">
            Define basic company details and the primary lead qualification trigger
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Business Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => onChange({ businessName: e.target.value })}
            placeholder="e.g., Your Business"
            aria-invalid={!!errors.businessName}
            aria-describedby={errors.businessName ? 'businessName-error' : undefined}
            className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
              errors.businessName
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-950'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
            }`}
          />
          {errors.businessName && (
            <p id="businessName-error" className="mt-1.5 text-xs text-rose-600 font-medium">
              {errors.businessName}
            </p>
          )}
        </div>

        {/* Website URL */}
        <div>
          <label
            htmlFor="websiteUrl"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Website URL <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4" />
            </div>
            <input
              id="websiteUrl"
              type="url"
              value={websiteUrl}
              onChange={(e) => onChange({ websiteUrl: e.target.value })}
              placeholder="https://example.com"
              aria-invalid={!!errors.websiteUrl}
              aria-describedby={errors.websiteUrl ? 'websiteUrl-error' : undefined}
              className={`w-full pl-9 pr-3.5 py-2 text-sm rounded-lg border bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                errors.websiteUrl
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-950'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
              }`}
            />
          </div>
          {errors.websiteUrl ? (
            <p id="websiteUrl-error" className="mt-1.5 text-xs text-rose-600 font-medium">
              {errors.websiteUrl}
            </p>
          ) : (
            <p className="mt-1 text-xs text-slate-500">
              Must include protocol (e.g., https://example.com)
            </p>
          )}
        </div>

        {/* Call to Action Text */}
        <div>
          <label
            htmlFor="ctaText"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Call-to-Action Text <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <input
              id="ctaText"
              type="text"
              value={ctaText}
              onChange={(e) => onChange({ ctaText: e.target.value })}
              placeholder="e.g., Qualify Now or Start Evaluation"
              aria-invalid={!!errors.ctaText}
              aria-describedby={errors.ctaText ? 'ctaText-error' : undefined}
              className={`w-full pl-9 pr-3.5 py-2 text-sm rounded-lg border bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                errors.ctaText
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-950'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
              }`}
            />
          </div>
          {errors.ctaText && (
            <p id="ctaText-error" className="mt-1.5 text-xs text-rose-600 font-medium">
              {errors.ctaText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

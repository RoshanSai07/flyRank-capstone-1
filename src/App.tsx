import { useState, useEffect, useMemo } from 'react';
import { StudioHeader } from './components/layout/StudioHeader';
import { Toast, ToastMessage } from './components/layout/Toast';
import { BusinessSettingsForm } from './components/configuration/BusinessSettingsForm';
import { GoalPresetsSelector } from './components/configuration/GoalPresetsSelector';
import { QuestionManager } from './components/configuration/QuestionManager';
import { AppearanceSettings } from './components/configuration/AppearanceSettings';
import { LivePreviewContainer } from './components/preview/LivePreviewContainer';
import {
  WidgetConfig,
  PresetId,
  AppearanceConfig,
  QualificationQuestion,
  ValidationErrors,
} from './types/widget';
import { INITIAL_WIDGET_CONFIG } from './constants/defaults';
import { GOAL_PRESETS } from './constants/presets';
import { TEMPLATES } from './constants/templates';
import { validateWidgetConfig } from './utils/validation';
import {
  loadSavedConfig,
  saveConfigToStorage,
  clearSavedConfig,
} from './utils/storage';

export function App() {
  const [config, setConfig] = useState<WidgetConfig>(INITIAL_WIDGET_CONFIG);
  const [lastSavedConfig, setLastSavedConfig] = useState<WidgetConfig>(INITIAL_WIDGET_CONFIG);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize and restore saved configuration from localStorage
  useEffect(() => {
    const { config: saved, restored, error } = loadSavedConfig();
    if (restored && saved) {
      setConfig(saved);
      setLastSavedConfig(saved);
      setToast({
        id: 'restore-success',
        type: 'info',
        title: 'Restored Saved Configuration',
        description: 'Loaded your previously saved widget settings from browser storage.',
      });
    } else if (error) {
      setToast({
        id: 'restore-error',
        type: 'error',
        title: 'Storage Warning',
        description: error,
      });
    }
  }, []);

  // Compute if unsaved changes exist
  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(config) !== JSON.stringify(lastSavedConfig);
  }, [config, lastSavedConfig]);

  // Business settings update
  const handleUpdateBusinessSettings = (fields: {
    businessName?: string;
    websiteUrl?: string;
    ctaText?: string;
  }) => {
    setConfig((prev) => {
      const nextAppearance = fields.ctaText !== undefined
        ? { ...prev.appearance, ctaText: fields.ctaText }
        : prev.appearance;
      return {
        ...prev,
        businessName: fields.businessName !== undefined ? fields.businessName : prev.businessName,
        websiteUrl: fields.websiteUrl !== undefined ? fields.websiteUrl : prev.websiteUrl,
        appearance: nextAppearance,
      };
    });

    // Clear field-level error on edit if present
    setErrors((prev) => {
      const next = { ...prev };
      if (fields.businessName !== undefined) delete next.businessName;
      if (fields.websiteUrl !== undefined) delete next.websiteUrl;
      if (fields.ctaText !== undefined) delete next.ctaText;
      return next;
    });
  };

  // Presets update
  const handleSelectPreset = (presetId: PresetId) => {
    const preset = GOAL_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setConfig((prev) => ({
      ...prev,
      selectedPresetId: presetId,
      objective: preset.objective,
      questions: JSON.parse(JSON.stringify(preset.startingQuestions)),
    }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next.objective;
      delete next.questions;
      return next;
    });
  };

  // Objective text change
  const handleChangeObjective = (objective: string) => {
    setConfig((prev) => ({ ...prev, objective }));
    if (errors.objective) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.objective;
        return next;
      });
    }
  };

  // Questions update
  const handleUpdateQuestions = (questions: QualificationQuestion[]) => {
    setConfig((prev) => ({ ...prev, questions }));
    if (errors.questions) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.questions;
        return next;
      });
    }
  };

  // Appearance settings update
  const handleUpdateAppearance = (fields: Partial<AppearanceConfig>) => {
    setConfig((prev) => {
      let updatedPrimaryColor = fields.primaryColor !== undefined
        ? fields.primaryColor
        : prev.appearance.primaryColor;

      // If switching template and user hadn't customized color or wants template color
      if (fields.template && fields.template !== prev.appearance.template && !fields.primaryColor) {
        updatedPrimaryColor = TEMPLATES[fields.template].defaultPrimaryColor;
      }

      return {
        ...prev,
        appearance: {
          ...prev.appearance,
          ...fields,
          primaryColor: updatedPrimaryColor,
        },
      };
    });
  };

  // Restore active template appearance defaults
  const handleRestoreTemplateDefaults = () => {
    const currentTemplate = TEMPLATES[config.appearance.template];
    setConfig((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        primaryColor: currentTemplate.defaultPrimaryColor,
      },
    }));
    setToast({
      id: 'template-restored',
      type: 'info',
      title: 'Theme Defaults Restored',
      description: `Reset primary color to ${currentTemplate.name}'s default (${currentTemplate.defaultPrimaryColor}). Your business settings and questions were preserved.`,
    });
  };

  // Save configuration
  const handleSave = () => {
    setIsSaving(true);
    const { isValid, errors: validationErrors } = validateWidgetConfig(config);

    if (!isValid) {
      setErrors(validationErrors);
      setIsSaving(false);
      setToast({
        id: 'save-error',
        type: 'error',
        title: 'Validation Errors Detected',
        description: 'Please resolve the highlighted errors before saving your configuration.',
      });
      return;
    }

    setErrors({});
    const saveResult = saveConfigToStorage(config);

    if (!saveResult.success) {
      setIsSaving(false);
      setToast({
        id: 'save-failed',
        type: 'error',
        title: 'Save Failed',
        description: saveResult.error || 'Unable to persist configuration to browser storage.',
      });
      return;
    }

    setLastSavedConfig(config);
    setIsSaving(false);
    setToast({
      id: 'save-success',
      type: 'success',
      title: 'Configuration Saved Successfully',
      description: 'Your lead qualification widget configuration has been stored and will persist across reloads.',
    });
  };

  // Reset to canonical initial defaults
  const handleReset = () => {
    const cleanDefault = JSON.parse(JSON.stringify(INITIAL_WIDGET_CONFIG)) as WidgetConfig;
    setConfig(cleanDefault);
    setLastSavedConfig(cleanDefault);
    setErrors({});
    clearSavedConfig();
    setToast({
      id: 'reset-success',
      type: 'info',
      title: 'Studio Reset Complete',
      description: 'Restored the documented initial configuration, appearance settings, and template defaults.',
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Toast Alert */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Main Studio Navigation Header */}
      <StudioHeader
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        onReset={handleReset}
        onSave={handleSave}
      />

      {/* Studio Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Configuration Panels (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Business Settings */}
            <BusinessSettingsForm
              businessName={config.businessName}
              websiteUrl={config.websiteUrl}
              ctaText={config.appearance.ctaText}
              errors={errors}
              onChange={handleUpdateBusinessSettings}
            />

            {/* Presets & Qualification Objective */}
            <GoalPresetsSelector
              selectedPresetId={config.selectedPresetId}
              objective={config.objective}
              error={errors.objective}
              onSelectPreset={handleSelectPreset}
              onChangeObjective={handleChangeObjective}
            />

            {/* Custom Qualification Questions */}
            <QuestionManager
              questions={config.questions}
              errors={errors}
              onUpdateQuestions={handleUpdateQuestions}
            />

            {/* Appearance, Themes & Placement */}
            <AppearanceSettings
              appearance={config.appearance}
              onChangeAppearance={handleUpdateAppearance}
              onRestoreTemplateDefaults={handleRestoreTemplateDefaults}
            />
          </div>

          {/* Right Column: Sticky Live Widget Preview (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <LivePreviewContainer config={config} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

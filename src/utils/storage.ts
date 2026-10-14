import { WidgetConfig } from '../types/widget';

export const STORAGE_KEY = 'lead_qualification_widget_config_v2';

export interface StorageLoadResult {
  config: WidgetConfig | null;
  restored: boolean;
  error: string | null;
}

export interface StorageSaveResult {
  success: boolean;
  error: string | null;
}

export function loadSavedConfig(): StorageLoadResult {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { config: null, restored: false, error: 'Local storage is not available in this environment.' };
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { config: null, restored: false, error: null };
    }
    const parsed = JSON.parse(raw) as WidgetConfig;
    if (!parsed || typeof parsed !== 'object' || !parsed.businessName || !parsed.appearance) {
      return { config: null, restored: false, error: 'Saved configuration format was corrupted.' };
    }
    return { config: parsed, restored: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to access local storage.';
    return { config: null, restored: false, error: message };
  }
}

export function saveConfigToStorage(config: WidgetConfig): StorageSaveResult {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { success: false, error: 'Local storage is not accessible.' };
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Storage quota exceeded or storage disabled.';
    return { success: false, error: message };
  }
}

export function clearSavedConfig(): StorageSaveResult {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to clear local storage.';
    return { success: false, error: message };
  }
}

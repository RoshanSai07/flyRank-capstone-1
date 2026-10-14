import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveConfigToStorage,
  loadSavedConfig,
  clearSavedConfig,
  STORAGE_KEY,
} from '../utils/storage';
import { INITIAL_WIDGET_CONFIG } from '../constants/defaults';
import { WidgetConfig } from '../types/widget';

describe('Storage Persistence Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('saves configuration to localStorage successfully', () => {
    const config: WidgetConfig = {
      ...INITIAL_WIDGET_CONFIG,
      businessName: 'Custom Enterprise Inc',
    };
    const result = saveConfigToStorage(config);
    expect(result.success).toBe(true);
    expect(result.error).toBeNull();

    const storedRaw = localStorage.getItem(STORAGE_KEY);
    expect(storedRaw).not.toBeNull();
    const parsed = JSON.parse(storedRaw!);
    expect(parsed.businessName).toBe('Custom Enterprise Inc');
  });

  it('restores saved configuration from localStorage', () => {
    const config: WidgetConfig = {
      ...INITIAL_WIDGET_CONFIG,
      businessName: 'Restored Business',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));

    const loadResult = loadSavedConfig();
    expect(loadResult.restored).toBe(true);
    expect(loadResult.config?.businessName).toBe('Restored Business');
    expect(loadResult.error).toBeNull();
  });

  it('handles empty storage gracefully with restored=false', () => {
    const loadResult = loadSavedConfig();
    expect(loadResult.restored).toBe(false);
    expect(loadResult.config).toBeNull();
    expect(loadResult.error).toBeNull();
  });

  it('handles corrupted storage data safely without throwing', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid json {[');
    const loadResult = loadSavedConfig();
    expect(loadResult.restored).toBe(false);
    expect(loadResult.config).toBeNull();
    expect(loadResult.error).not.toBeNull();
  });

  it('handles storage save failure gracefully when quota exceeded or storage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const result = saveConfigToStorage(INITIAL_WIDGET_CONFIG);
    expect(result.success).toBe(false);
    expect(result.error).toBe('QuotaExceededError');
  });

  it('clears saved configuration from storage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WIDGET_CONFIG));
    clearSavedConfig();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});

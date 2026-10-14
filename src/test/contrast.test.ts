import { describe, it, expect } from 'vitest';
import {
  parseHexColor,
  getContrastRatio,
  evaluateButtonContrast,
} from '../utils/contrast';

describe('WCAG Contrast Utilities', () => {
  it('parses 3-character and 6-character hex colors correctly', () => {
    expect(parseHexColor('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHexColor('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(parseHexColor('#2563eb')).toEqual({ r: 37, g: 99, b: 235 });
    expect(parseHexColor('invalid')).toBeNull();
  });

  it('calculates maximum contrast between black and white (21:1)', () => {
    const ratio = getContrastRatio('#000000', '#ffffff');
    expect(ratio).toBeCloseTo(21, 0);
  });

  it('calculates minimum contrast between identical colors (1:1)', () => {
    const ratio = getContrastRatio('#ffffff', '#ffffff');
    expect(ratio).toBeCloseTo(1, 1);
  });

  it('evaluates button contrast and selects white text for dark backgrounds', () => {
    const result = evaluateButtonContrast('#0f172a'); // dark slate
    expect(result.textColor).toBe('#ffffff');
    expect(result.passesAA).toBe(true);
    expect(result.ratio).toBeGreaterThan(10);
  });

  it('evaluates button contrast and selects dark text for light backgrounds', () => {
    const result = evaluateButtonContrast('#fef08a'); // light yellow
    expect(result.textColor).toBe('#0f172a');
    expect(result.passesAA).toBe(true);
  });

  it('flags low contrast colors that fail WCAG AA (4.5:1)', () => {
    // #7b7b7b has luminance ~0.20, giving ~4.2:1 contrast against both white and dark slate
    const lowContrastResult = evaluateButtonContrast('#7b7b7b');
    expect(lowContrastResult.passesAA).toBe(false);
    expect(lowContrastResult.passesAALarge).toBe(true); // Still passes large text (3:1)
  });
});

/**
 * WCAG 2.1 Color Contrast Utilities
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

export function parseHexColor(hex: string): RGB | null {
  const cleanHex = hex.trim().replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  return null;
}

function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.04045
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Returns contrast ratio between two hex colors (1 to 21)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = parseHexColor(hex1);
  const rgb2 = parseHexColor(hex2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

export interface ContrastResult {
  textColor: '#ffffff' | '#0f172a';
  ratio: number;
  passesAA: boolean; // >= 4.5:1
  passesAALarge: boolean; // >= 3:1
}

/**
 * Evaluates the best readable text color against a background color,
 * and checks real contrast ratio against WCAG AA standards.
 */
export function evaluateButtonContrast(bgHex: string): ContrastResult {
  const whiteRatio = getContrastRatio(bgHex, '#ffffff');
  const darkRatio = getContrastRatio(bgHex, '#0f172a');

  const useWhite = whiteRatio >= darkRatio;
  const bestColor = useWhite ? '#ffffff' : '#0f172a';
  const bestRatio = useWhite ? whiteRatio : darkRatio;

  return {
    textColor: bestColor,
    ratio: Math.round(bestRatio * 10) / 10,
    passesAA: bestRatio >= 4.5,
    passesAALarge: bestRatio >= 3.0,
  };
}

import { Platform } from 'react-native';

// Font weight mappings
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type FontFamily = 'sans' | 'mono';

// Platform-specific font configurations
const FONT_CONFIG = {
  sans: {
    ios: {
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semibold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
    },
    android: {
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semibold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
    },
    web: {
      regular: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      medium: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      semibold: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      bold: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  },
  mono: {
    ios: {
      regular: 'Courier New',
      medium: 'Courier New',
      semibold: 'Courier New',
      bold: 'Courier New',
    },
    android: {
      regular: 'monospace',
      medium: 'monospace',
      semibold: 'monospace',
      bold: 'monospace',
    },
    web: {
      regular: 'IBM Plex Mono, Consolas, Monaco, "Courier New", monospace',
      medium: 'IBM Plex Mono, Consolas, Monaco, "Courier New", monospace',
      semibold: 'IBM Plex Mono, Consolas, Monaco, "Courier New", monospace',
      bold: 'IBM Plex Mono, Consolas, Monaco, "Courier New", monospace',
    },
  },
};

/**
 * Get the appropriate font family for the current platform
 */
export const getFontFamily = (family: FontFamily, weight: FontWeight = 'regular'): string => {
  const platform = Platform.OS === 'web' ? 'web' : Platform.OS;
  return FONT_CONFIG[family][platform as keyof typeof FONT_CONFIG.sans][weight];
};

/**
 * Get font weight value for React Native
 */
export const getFontWeight = (weight: FontWeight): '400' | '500' | '600' | '700' => {
  switch (weight) {
    case 'medium':
      return '500';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    default:
      return '400';
  }
};

/**
 * Create a complete font style object
 */
export const createFontStyle = (
  family: FontFamily,
  weight: FontWeight = 'regular',
  size: number,
  lineHeight?: number
) => ({
  fontFamily: getFontFamily(family, weight),
  fontWeight: getFontWeight(weight),
  fontSize: size,
  ...(lineHeight && { lineHeight }),
});

// Pre-defined font styles matching the web design system
export const FONT_STYLES = {
  // Sans variants
  'sans-regular-10': createFontStyle('sans', 'regular', 10, 12),
  'sans-regular-12': createFontStyle('sans', 'regular', 12, 16),
  'sans-regular-14': createFontStyle('sans', 'regular', 14, 20),
  'sans-regular-16': createFontStyle('sans', 'regular', 16, 24),
  'sans-medium-12': createFontStyle('sans', 'medium', 12, 16),
  'sans-medium-14': createFontStyle('sans', 'medium', 14, 20),
  'sans-semibold-12': createFontStyle('sans', 'semibold', 12, 16),
  'sans-semibold-14': createFontStyle('sans', 'semibold', 14, 20),
  'sans-semibold-18': createFontStyle('sans', 'semibold', 18, 28),
  'sans-bold-14': createFontStyle('sans', 'bold', 14, 20),
  'sans-bold-18': createFontStyle('sans', 'bold', 18, 28),
  
  // Mono variants
  'mono-regular-14': createFontStyle('mono', 'regular', 14, 20),
  'mono-regular-16': createFontStyle('mono', 'regular', 16, 24),
  'mono-medium-16': createFontStyle('mono', 'medium', 16, 24),
  'mono-semibold-16': createFontStyle('mono', 'semibold', 16, 24),
  
  // Common UI patterns
  'heading-lg': createFontStyle('sans', 'semibold', 18, 22),
  'heading-xl': createFontStyle('sans', 'semibold', 24, 29),
  'body': createFontStyle('sans', 'regular', 14, 20),
  'caption': createFontStyle('sans', 'regular', 12, 16),
  'label': { ...createFontStyle('sans', 'semibold', 12, 16), letterSpacing: 0.5 },
} as const;

export type FontStyleKey = keyof typeof FONT_STYLES; 
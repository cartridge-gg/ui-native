// Port of CSS variables from ui/src/themes/default.css and dark.css
export const lightColors = {
  background: {
    100: '#161a17',
    125: '#181c19',
    150: '#1a1e1b',
    200: '#1e221f',
    300: '#242824',
    400: '#2a2f2a',
    500: '#373c38',
  },
  'translucent-dark': {
    100: '#00000014',
    150: '#0000001F',
    200: '#0000007a',
    300: '#000000a3',
  },
  'translucent-light': {
    100: '#ffffff0a',
    150: '#ffffff29',
    200: '#ffffff7a',
    300: '#ffffffa3',
  },
  spacer: {
    100: '#0f1410',
  },
  foreground: {
    100: '#ffffff',
    200: '#9c9c9c',
    300: '#808080',
    400: '#505050',
  },
  primary: {
    100: '#fbcb4a',
    200: '#cca63e',
    foreground: '#0f1410',
  },
  'wallet-theme': {
    100: '#ab9ff2',
    200: '#7483f7',
    300: '#e88a39',
    400: '#ff875b',
    500: '#7289da',
    600: '#3b99fc',
  },
  secondary: {
    100: '#a7e7a7',
  },
  destructive: {
    100: '#e66666',
    foreground: '#0f1410',
  },
  constructive: {
    100: '#6de27c',
    foreground: '#0f1410',
  },
  // Additional colors for compatibility
  border: '#161a17',
  input: '#242824',
  radius: 8, // 0.5rem converted to number for React Native
};

export const darkColors = {
  ...lightColors,
  // Dark mode would have different values if needed
  // For now, using the same values as they appear to be dark theme already
};

export type ColorTheme = typeof lightColors; 
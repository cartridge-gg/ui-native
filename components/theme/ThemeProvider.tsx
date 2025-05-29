import React, { createContext, useContext, type ReactNode } from 'react';
import { useColorScheme } from 'nativewind';
import { lightColors, darkColors, ColorTheme } from './colors';

interface ThemeContextType {
  colors: ColorTheme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: lightColors,
  isDark: false,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { colorScheme } = useColorScheme();
  // Force dark mode to match UI web version
  const isDark = true; // colorScheme === 'dark';
  
  return (
    <ThemeContext.Provider value={{ 
      colors: isDark ? darkColors : lightColors,
      isDark 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}; 
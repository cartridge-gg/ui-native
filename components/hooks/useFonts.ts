import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          // Inter font family - using system fallbacks for now
          'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
          'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
          'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
          
          // IBM Plex Mono font family
          'IBMPlexMono-Regular': require('../../assets/fonts/IBMPlexMono-Regular.ttf'),
          'IBMPlexMono-Medium': require('../../assets/fonts/IBMPlexMono-Medium.ttf'),
          'IBMPlexMono-SemiBold': require('../../assets/fonts/IBMPlexMono-SemiBold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn('Font loading failed, using system fonts:', error);
        setFontError(error as Error);
        setFontsLoaded(true); // Continue with system fonts
      }
    };

    loadFonts();
  }, []);

  return { fontsLoaded, fontError };
};

export const getFontFamily = (family: 'sans' | 'mono', weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular') => {
  if (family === 'mono') {
    switch (weight) {
      case 'medium':
        return 'IBMPlexMono-Medium';
      case 'semibold':
        return 'IBMPlexMono-SemiBold';
      default:
        return 'IBMPlexMono-Regular';
    }
  }
  
  // Sans family (Inter)
  switch (weight) {
    case 'medium':
      return 'Inter-Medium';
    case 'semibold':
      return 'Inter-SemiBold';
    case 'bold':
      return 'Inter-Bold';
    default:
      return 'Inter-Regular';
  }
}; 
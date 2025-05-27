import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

export type SubIconVariant = 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
export type SubIconSize = 'lg' | 'xl';

export interface ThumbnailsSubIconProps {
  Icon: React.ReactNode;
  variant?: SubIconVariant;
  size?: SubIconSize;
  style?: any;
}

export const ThumbnailsSubIcon: React.FC<ThumbnailsSubIconProps> = ({
  Icon,
  variant = 'default',
  size = 'lg',
  style,
}) => {
  const { colors } = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'lg': return { width: 20, height: 20, padding: 4 }; // w-5 h-5 (web default)
      case 'xl': return { width: 24, height: 24, padding: 4 }; // w-6 h-6
      default: return { width: 20, height: 20, padding: 4 };
    }
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'darkest': return colors.background[200];
      case 'darker': return colors.background[200];
      case 'dark': return colors.background[200];
      case 'default': return colors.background[300];
      case 'light': return colors.background[300];
      case 'lighter': return colors.background[400];
      case 'lightest': return colors.background[400];
      case 'ghost': return 'transparent';
      default: return colors.background[300];
    }
  };

  const sizeStyles = getSizeStyles();
  const backgroundColor = getBackgroundColor();

  const styles = StyleSheet.create({
    container: {
      ...sizeStyles,
      backgroundColor,
      borderRadius: sizeStyles.width / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={[styles.container, style]}>
      {Icon}
    </View>
  );
}; 
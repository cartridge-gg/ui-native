import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '../../../typography/Text';
import { useTheme } from '../../../theme/ThemeProvider';

export type ThumbnailVariant = 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
export type ThumbnailSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ThumbnailProps {
  icon?: string | React.ReactNode;
  subIcon?: React.ReactNode;
  rounded?: boolean;
  centered?: boolean;
  loading?: boolean;
  error?: boolean;
  variant?: ThumbnailVariant;
  size?: ThumbnailSize;
  className?: string;
  style?: any;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  icon,
  subIcon,
  rounded = false,
  centered = false,
  loading = false,
  error = false,
  variant = 'default',
  size = 'md',
  style,
}) => {
  const { colors } = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'xs': return { width: 20, height: 20, minWidth: 20, minHeight: 20, padding: 2 }; // w-5 h-5
      case 'sm': return { width: 24, height: 24, minWidth: 24, minHeight: 24, padding: 2 }; // w-6 h-6
      case 'md': return { width: 32, height: 32, minWidth: 32, minHeight: 32, padding: 2 }; // w-8 h-8
      case 'lg': return { width: 40, height: 40, minWidth: 40, minHeight: 40, padding: 3 }; // w-10 h-10 (web default)
      case 'xl': return { width: 48, height: 48, minWidth: 48, minHeight: 48, padding: 3 }; // w-12 h-12
      case 'xxl': return { width: 80, height: 80, minWidth: 80, minHeight: 80, padding: 4 }; // w-20 h-20
      default: return { width: 32, height: 32, minWidth: 32, minHeight: 32, padding: 2 };
    }
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'darkest': return colors.background[100];
      case 'darker': return colors.background[100];
      case 'dark': return colors.background[100];
      case 'default': return colors.background[200];
      case 'light': return colors.background[300];
      case 'lighter': return colors.background[400];
      case 'lightest': return colors.background[500];
      case 'ghost': return 'transparent';
      default: return colors.background[200];
    }
  };

  const sizeStyles = getSizeStyles();
  const backgroundColor = getBackgroundColor();

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      ...sizeStyles,
      backgroundColor,
      borderRadius: rounded ? sizeStyles.width / 2 : 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: rounded ? sizeStyles.width / 2 : 4,
    },
    subIconContainer: {
      position: 'absolute',
      top: '75%',
      left: '75%',
      transform: [{ translateX: -12 }, { translateY: -12 }],
      zIndex: 20,
    },
    errorText: {
      color: colors.destructive[100],
      fontSize: 16,
    },
    loadingText: {
      color: colors.foreground[300],
      fontSize: 16,
    },
  });

  if (error) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>⚠️</Text>
        {subIcon && (
          <View style={styles.subIconContainer}>
            {subIcon}
          </View>
        )}
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.loadingText}>⟳</Text>
        {subIcon && (
          <View style={styles.subIconContainer}>
            {subIcon}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        {typeof icon === 'string' ? (
          icon.startsWith('http') ? (
            <Image source={{ uri: icon }} style={styles.image} />
          ) : (
            <Text style={{ fontSize: sizeStyles.width * 0.5, color: colors.foreground[100] }}>
              {icon}
            </Text>
          )
        ) : (
          icon
        )}
      </View>
      {subIcon && (
        <View style={styles.subIconContainer}>
          {subIcon}
        </View>
      )}
    </View>
  );
}; 
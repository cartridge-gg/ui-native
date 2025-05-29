import React from 'react';
import { Pressable, Text, View, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Spinner } from '../spinner/Spinner';
import { getSizeValue } from '../../icons/utils';

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'link' | 'destructive' | 'outline' | 'ghost';
  size?: 'default' | 'tall' | 'icon' | 'thumbnail';
  isLoading?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: any;
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'default',
      isLoading = false,
      isActive = false,
      disabled = false,
      onPress,
      style,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();

    // Get variant styles
    const getVariantStyles = () => {
      if (isActive) {
        return {
          backgroundColor: colors.background[300],
          borderColor: colors.background[300],
        };
      }

      switch (variant) {
        case 'primary':
          return {
            backgroundColor: colors.primary[100],
            borderColor: colors.primary[100],
          };
        case 'secondary':
          return {
            backgroundColor: colors.background[200],
            borderColor: colors.background[200],
          };
        case 'tertiary':
          return {
            backgroundColor: colors.background[200],
            borderColor: colors.background[200],
          };
        case 'icon':
          return {
            backgroundColor: colors.background[200],
            borderColor: colors.background[200],
          };
        case 'link':
          return {
            backgroundColor: colors.background[100],
            borderColor: colors.background[200],
            borderWidth: 1,
          };
        case 'destructive':
          return {
            backgroundColor: colors.destructive[100],
            borderColor: colors.destructive[100],
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            borderColor: colors.background[200],
            borderWidth: 1,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          };
        default:
          return {
            backgroundColor: colors.primary[100],
            borderColor: colors.primary[100],
          };
      }
    };

    // Get text color
    const getTextColor = () => {
      if (disabled) {
        switch (variant) {
          case 'secondary':
          case 'tertiary':
          case 'icon':
            return colors.foreground[300];
          default:
            return colors.foreground[400];
        }
      }

      if (isActive) {
        return colors.foreground[100];
      }

      switch (variant) {
        case 'primary':
          return colors.primary.foreground;
        case 'secondary':
        case 'icon':
          return colors.foreground[100];
        case 'tertiary':
          return colors.foreground[300];
        case 'link':
          return colors.foreground[300];
        case 'destructive':
          return colors.destructive.foreground;
        case 'outline':
        case 'ghost':
          return colors.foreground[200];
        default:
          return colors.primary.foreground;
      }
    };

    // Get size styles
    const getSizeStyles = () => {
      const baseStyles = {
        height: 40,
        borderRadius: 6,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        flexDirection: 'row' as const,
        gap: 6,
      };

      switch (size) {
        case 'default':
          return {
            ...baseStyles,
            paddingHorizontal: 24,
            paddingVertical: 10,
            // Only set minWidth when not loading (loading state should be compact)
            ...(isLoading ? {} : { minWidth: 118 }),
          };
        case 'tall':
          return {
            ...baseStyles,
            height: '100%',
            width: 36,
            padding: 8,
          };
        case 'icon':
          return {
            ...baseStyles,
            height: 40,
            width: 40,
            padding: 0,
          };
        case 'thumbnail':
          return {
            ...baseStyles,
            height: 40,
            paddingHorizontal: 12,
            paddingVertical: 10,
          };
        default:
          return {
            ...baseStyles,
            paddingHorizontal: 24,
            paddingVertical: 10,
            // Only set minWidth when not loading (loading state should be compact)
            ...(isLoading ? {} : { minWidth: 118 }),
          };
      }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();
    const textColor = getTextColor();

    const buttonStyles = {
      ...sizeStyles,
      ...variantStyles,
      opacity: (disabled || isLoading) ? 0.5 : 1,
    };

    // Build text styles based on variant
    const getTextStyles = (): TextStyle => {
      const baseStyles: TextStyle = {
        color: textColor,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontFamily: 'monospace',
      };

      // For link variant, use normal case and sans font
      if (variant === 'link') {
        return {
          ...baseStyles,
          textTransform: 'none',
          letterSpacing: 0,
          fontFamily: 'system',
          fontWeight: '400',
        };
      }

      // For tertiary variant, use medium weight
      if (variant === 'tertiary') {
        return {
          ...baseStyles,
          fontWeight: '500',
        };
      }

      return baseStyles;
    };

    const textStyles = getTextStyles();

    const handlePress = () => {
      if (!disabled && !isLoading && onPress) {
        onPress();
      }
    };

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          buttonStyles,
          pressed && !disabled && !isLoading && { opacity: 0.8 },
          style,
        ]}
        onPress={handlePress}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Spinner color={textColor} size="sm" />
        ) : (
          <>
            {typeof children === 'string' ? (
              <Text style={textStyles}>{children}</Text>
            ) : (
              children
            )}
          </>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button'; 
import React, { useEffect, useRef } from 'react';
import { Pressable, Text, View, TextStyle, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeProvider';

// Custom Spinner component that matches UI web version with animation
const Spinner = ({ color, size = 16 }: { color: string; size?: number }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill={color}
          d="M11.111 5.778c0-.491.398-.89.89-.89a7.11 7.11 0 0 1 6.158 10.668c-.245.425-.79.572-1.24.325-.4-.245-.544-.79-.3-1.24.453-.758.715-1.669.715-2.666A5.335 5.335 0 0 0 12 6.642a.873.873 0 0 1-.889-.89v.026Z"
        />
        <Path
          fill={color}
          opacity="0.25"
          d="M11.975 6.667A5.319 5.319 0 0 0 6.64 12a5.335 5.335 0 0 0 5.334 5.333 5.34 5.34 0 0 0 4.605-2.6l.003.003a.906.906 0 0 0 .336 1.145c.45.247.995.1 1.24-.325A7.106 7.106 0 0 1 12 19.112 7.11 7.11 0 0 1 4.888 12a7.11 7.11 0 0 1 7.11-7.111.888.888 0 1 0 0 1.778h-.024Z"
        />
      </Svg>
    </Animated.View>
  );
};

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
          <Spinner color={textColor} size={16} />
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
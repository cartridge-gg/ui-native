import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../../typography/Text';

export interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  style?: ViewStyle;
  trackColor?: string;
  fillColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  style,
  trackColor,
  fillColor,
}) => {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: percentage,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(percentage);
    }
  }, [percentage, animated, animatedValue]);
  
  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return {
          track: trackColor || colors.background[300],
          fill: fillColor || colors.constructive[100],
        };
      case 'warning':
        return {
          track: trackColor || colors.background[300],
          fill: fillColor || '#f59e0b',
        };
      case 'error':
        return {
          track: trackColor || colors.background[300],
          fill: fillColor || colors.destructive[100],
        };
      default:
        return {
          track: trackColor || colors.background[300],
          fill: fillColor || colors.primary[100],
        };
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { height: 4, borderRadius: 2 };
      case 'lg':
        return { height: 12, borderRadius: 6 };
      default:
        return { height: 8, borderRadius: 4 };
    }
  };
  
  const variantColors = getVariantColors();
  const sizeStyles = getSizeStyles();
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    track: {
      backgroundColor: variantColors.track,
      ...sizeStyles,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      backgroundColor: variantColors.fill,
      borderRadius: sizeStyles.borderRadius,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    label: {
      fontSize: 14,
      color: colors.foreground[200],
    },
    percentage: {
      fontSize: 12,
      color: colors.foreground[300],
    },
  });
  
  return (
    <View style={[styles.container, style]}>
      {(showLabel || label) && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label || 'Progress'}</Text>
          <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
        </View>
      )}
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

// Circular Progress Bar
export interface CircularProgressProps {
  value: number; // 0-100
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animated?: boolean;
  style?: ViewStyle;
  trackColor?: string;
  fillColor?: string;
  children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  animated = true,
  style,
  trackColor,
  fillColor,
  children,
}) => {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: percentage,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(percentage);
    }
  }, [percentage, animated, animatedValue]);
  
  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return {
          track: trackColor || colors.background[300],
          fill: fillColor || colors.constructive[100],
        };
      case 'warning':
        return {
          track: trackColor || colors.background[300],
          fill: fillColor || '#f59e0b',
        };
      case 'error':
        return {
          track: trackColor || colors.background[300],
          fill: fillColor || colors.destructive[100],
        };
      default:
        return {
          track: trackColor || colors.background[300],
          fill: fillColor || colors.primary[100],
        };
    }
  };
  
  const variantColors = getVariantColors();
  
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    track: {
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: strokeWidth,
      borderColor: variantColors.track,
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: size * 0.15,
      fontWeight: 'bold',
      color: colors.foreground[200],
    },
  });
  
  // Create animated stroke dash offset
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });
  
  return (
    <View style={[styles.container, style]}>
      {/* Track circle */}
      <View style={styles.track} />
      
      {/* Progress circle - simplified for React Native */}
      <Animated.View
        style={[
          styles.track,
          {
            borderColor: variantColors.fill,
            transform: [{ rotate: '-90deg' }],
          },
        ]}
      />
      
      {/* Content */}
      <View style={styles.content}>
        {children || (showLabel && (
          <Text style={styles.label}>{Math.round(percentage)}%</Text>
        ))}
      </View>
    </View>
  );
};

// Step Progress Bar
export interface StepProgressProps {
  steps: string[];
  currentStep: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  style?: ViewStyle;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();
  
  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return colors.constructive[100];
      case 'warning':
        return '#f59e0b';
      case 'error':
        return colors.destructive[100];
      default:
        return colors.primary[100];
    }
  };
  
  const variantColor = getVariantColor();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    stepContainer: {
      alignItems: 'center',
      flex: 1,
    },
    stepCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      marginBottom: 8,
    },
    stepNumber: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    stepLabel: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.foreground[300],
    },
    connector: {
      height: 2,
      flex: 1,
      marginHorizontal: 8,
      marginBottom: 24,
    },
  });
  
  return (
    <View style={[styles.container, style]}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;
        
        return (
          <React.Fragment key={index}>
            <View style={styles.stepContainer}>
              <View
                style={[
                  styles.stepCircle,
                  {
                    backgroundColor: isCompleted || isCurrent 
                      ? variantColor 
                      : colors.background[200],
                    borderColor: isCompleted || isCurrent 
                      ? variantColor 
                      : colors.background[300],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.stepNumber,
                    {
                      color: isCompleted || isCurrent 
                        ? colors.background[100] 
                        : colors.foreground[300],
                    },
                  ]}
                >
                  {isCompleted ? '✓' : index + 1}
                </Text>
              </View>
              <Text style={styles.stepLabel}>{step}</Text>
            </View>
            
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.connector,
                  {
                    backgroundColor: isCompleted 
                      ? variantColor 
                      : colors.background[300],
                  },
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}; 
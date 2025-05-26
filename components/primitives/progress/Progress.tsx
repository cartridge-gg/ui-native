import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface ProgressProps {
  value?: number;
  completed?: boolean;
  color?: string;
  style?: any;
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  completed = false,
  color,
  style,
}) => {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targetValue = value && value > 0 ? value : 0;
    
    Animated.timing(animatedValue, {
      toValue: targetValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const styles = StyleSheet.create({
    container: {
      height: 8,
      width: '100%',
      backgroundColor: colors.background[300],
      borderRadius: 4,
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      borderRadius: 4,
      backgroundColor: completed && color ? color : colors.primary[100],
    },
  });

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.progress,
          {
            width: progressWidth,
          },
        ]}
      />
    </View>
  );
}; 
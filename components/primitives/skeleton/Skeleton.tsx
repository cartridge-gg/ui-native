import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const { colors } = useTheme();
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const shimmerOpacity = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const styles = StyleSheet.create({
    skeleton: {
      width,
      height,
      borderRadius,
      backgroundColor: colors.background[300],
      overflow: 'hidden',
    },
    shimmer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.background[400],
    },
  });

  return (
    <View style={[styles.skeleton, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            opacity: shimmerOpacity,
          },
        ]}
      />
    </View>
  );
};

// Pre-defined skeleton variants
export const SkeletonText: React.FC<{ lines?: number; style?: any }> = ({ 
  lines = 1, 
  style 
}) => (
  <View style={[{ gap: 8 }, style]}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        height={16}
        width={i === lines - 1 ? '75%' : '100%'}
      />
    ))}
  </View>
);

export const SkeletonAvatar: React.FC<{ size?: number; style?: any }> = ({ 
  size = 40, 
  style 
}) => (
  <Skeleton
    width={size}
    height={size}
    borderRadius={size / 2}
    style={style}
  />
);

export const SkeletonCard: React.FC<{ style?: any }> = ({ style }) => {
  const { colors } = useTheme();
  
  return (
    <View
      style={[
        {
          padding: 16,
          backgroundColor: colors.background[200],
          borderRadius: 8,
          gap: 12,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <SkeletonAvatar size={48} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton height={16} width="60%" />
          <Skeleton height={14} width="40%" />
        </View>
      </View>
      <SkeletonText lines={3} />
    </View>
  );
}; 
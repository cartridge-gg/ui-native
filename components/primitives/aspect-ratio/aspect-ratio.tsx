import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface AspectRatioProps {
  /**
   * The desired aspect ratio (width / height)
   * Examples: 16/9, 4/3, 1 (square), 9/16 (portrait)
   */
  ratio?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * A component that maintains a specific aspect ratio for its content.
 * The ratio is calculated as width / height.
 */
export const AspectRatio: React.FC<AspectRatioProps> = ({ 
  ratio = 1, 
  children,
  style 
}) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      aspectRatio: ratio,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}; 
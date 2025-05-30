import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface AchievementBitProps {
  completed?: boolean;
  active?: boolean;
  onClick?: () => void;
  style?: ViewStyle;
}

export function AchievementBit({
  completed = false,
  active = false,
  onClick,
  style,
}: AchievementBitProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    bit: {
      height: 10, // h-2.5 = 10px
      width: 10,  // w-2.5 = 10px
      backgroundColor: completed ? colors.primary[100] : colors.foreground[400],
      opacity: active ? 1 : 0.5,
    },
  });

  if (onClick) {
    return (
      <TouchableOpacity
        style={[styles.bit, style]}
        onPress={onClick}
        activeOpacity={0.8}
      />
    );
  }

  return (
    <TouchableOpacity
      style={[styles.bit, style]}
      disabled
      activeOpacity={1}
    />
  );
}

export default AchievementBit; 
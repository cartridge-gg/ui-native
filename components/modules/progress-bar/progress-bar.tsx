import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Progress } from '../../primitives/progress/Progress';

export interface ProgressBarProps {
  count: number;
  total: number;
  completed: boolean;
  style?: ViewStyle;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  count,
  total,
  completed,
  style,
  color,
}) => {
  const { colors } = useTheme();

  const value = useMemo(() => {
    return Math.floor((100 * Math.min(count, total)) / total);
  }, [count, total]);

  const styles = StyleSheet.create({
    container: {
      flex: 1, // grow
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background[300],
      borderRadius: 999, // rounded-full
      padding: 4, // p-1 = 4px
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Progress
        value={value}
        color={color}
        completed={completed}
        style={{
          flex: 1, // grow
          borderRadius: 999, // rounded-full
          backgroundColor: completed ? colors.primary[100] : colors.foreground[200],
        }}
      />
    </View>
  );
};

export default ProgressBar;
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ProgressBar } from '../../progress-bar/progress-bar';
import { AchievementTaskHeader } from '../task-header/task-header';
import { AchievementTaskStatus } from '../task-status/task-status';

export interface AchievementTaskProps {
  count: number;
  total: number;
  description: string;
  completed?: boolean;
  style?: ViewStyle;
}

export const AchievementTask: React.FC<AchievementTaskProps> = ({
  count,
  total,
  description,
  completed = false,
  style,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 8, // gap-2 = 8px
    },
    progressRow: {
      flexDirection: 'row',
      gap: 12, // gap-3 = 12px
      alignItems: 'center',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <AchievementTaskHeader
        count={count}
        total={total}
        description={description}
      />
      <View style={styles.progressRow}>
        <ProgressBar count={count} total={total} completed={completed} />
        <AchievementTaskStatus count={count} total={total} />
      </View>
    </View>
  );
};

export default AchievementTask;
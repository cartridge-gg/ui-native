import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { CardContent } from '../../../primitives/card/Card';
import { AchievementLabel } from '../label/label';
import { AchievementTask, AchievementTaskProps } from '../task/task';

export interface AchievementContentProps {
  points: number;
  difficulty: number;
  hidden: boolean;
  icon?: string;
  title?: string;
  description?: string;
  tasks?: (AchievementTaskProps & { id: string })[];
  timestamp?: number;
  style?: ViewStyle;
}

export const AchievementContent: React.FC<AchievementContentProps> = ({
  points,
  difficulty,
  icon,
  title,
  description,
  tasks,
  timestamp,
  hidden,
  style,
}) => {
  const { colors } = useTheme();

  const completed = useMemo(() => {
    return tasks && tasks.every((task) => task.count >= task.total);
  }, [tasks]);

  const show = useMemo(() => {
    return completed || !hidden;
  }, [hidden, completed]);

  const styles = StyleSheet.create({
    content: {
      flex: 1, // grow
      width: '100%',
      flexDirection: 'column',
      gap: 12, // gap-y-3 = 12px
    },
    description: {
      fontSize: 12, // text-xs
      color: colors.foreground[300],
    },
  });

  return (
    <CardContent style={[styles.content, style]}>
      <AchievementLabel
        icon={icon}
        title={show ? (title ?? "") : "Hidden Achievement"}
        points={points}
        difficulty={difficulty}
        timestamp={timestamp}
        completed={completed}
      />
      {show && description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
      {show &&
        tasks &&
        tasks.map((task) => (
          <AchievementTask key={task.id} completed={completed} {...task} />
        ))}
    </CardContent>
  );
};

export default AchievementContent;
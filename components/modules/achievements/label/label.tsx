import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { AchievementIcon } from '../icon/icon';
import { AchievementPoints } from '../points/points';

export interface AchievementLabelProps {
  title: string;
  points: number;
  difficulty: number;
  icon?: string;
  timestamp?: number;
  completed?: boolean;
  style?: ViewStyle;
}

export const AchievementLabel: React.FC<AchievementLabelProps> = ({
  title,
  points,
  difficulty,
  icon,
  timestamp,
  completed = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: 12, // gap-x-3 = 12px
    },
    content: {
      flex: 1, // grow
      flexDirection: 'column',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    difficultyText: {
      color: colors.foreground[300],
      fontSize: 10,
      lineHeight: 12,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <AchievementIcon icon={icon} completed={completed} />
      <View style={styles.content}>
        <View style={styles.row}>
          <AchievementTitle title={title} completed={completed} />
          <AchievementPoints points={points} timestamp={timestamp} />
        </View>
        <Text style={styles.difficultyText}>
          {`${difficulty}% of players earned`}
        </Text>
      </View>
    </View>
  );
};

export interface AchievementTitleProps {
  title: string;
  completed?: boolean;
  style?: ViewStyle;
}

export const AchievementTitle: React.FC<AchievementTitleProps> = ({
  title,
  completed = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      color: completed ? colors.foreground[100] : colors.foreground[300],
    },
  });

  return (
    <Text style={[styles.text, style]}>
      {title}
    </Text>
  );
};

export default AchievementLabel;
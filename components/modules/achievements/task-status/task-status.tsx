import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { CheckIcon } from '../../../icons/utility/CheckIcon';

export interface AchievementTaskStatusProps {
  count: number;
  total: number;
  style?: ViewStyle;
}

export const AchievementTaskStatus: React.FC<AchievementTaskStatusProps> = ({
  count,
  total,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4, // gap-x-1 = 4px
    },
    text: {
      fontSize: 12, // text-xs
      color: colors.foreground[300],
    },
  });

  if (count >= total) {
    return (
      <View style={[styles.container, style]}>
        <CheckIcon 
          size="xs" 
          color={colors.foreground[300]}
        />
        <Text style={styles.text}>
          {total > 1 ? `${count.toLocaleString()}` : "Completed"}
        </Text>
      </View>
    );
  }

  return (
    <Text style={[styles.text, style]}>
      {`${count.toLocaleString()} of ${total.toLocaleString()}`}
    </Text>
  );
};

export default AchievementTaskStatus;
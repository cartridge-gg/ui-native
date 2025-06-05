import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { CheckboxCheckedIcon } from '../../../icons/utility/CheckboxCheckedIcon';
import { CheckboxUncheckedIcon } from '../../../icons/utility/CheckboxUncheckedIcon';

export interface AchievementTaskHeaderProps {
  count: number;
  total: number;
  description: string;
  style?: ViewStyle;
}

export const AchievementTaskHeader: React.FC<AchievementTaskHeaderProps> = ({
  count,
  total,
  description,
  style,
}) => {
  const { colors } = useTheme();

  const IconComponent = useMemo(() => {
    if (count >= total) {
      return CheckboxCheckedIcon;
    }
    return CheckboxUncheckedIcon;
  }, [count, total]);

  const isCompleted = count >= total;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8, // gap-x-2 = 8px
    },
    icon: {
      minWidth: 16, // min-w-4 = 16px
    },
    text: {
      fontSize: 12, // text-xs
      color: colors.foreground[300],
      textDecorationLine: isCompleted ? 'line-through' : 'none',
      opacity: isCompleted ? 0.5 : 1,
    } as TextStyle,
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.icon}>
        <IconComponent 
          size="xs" 
          color={colors.foreground[300]}
        />
      </View>
      <Text style={styles.text}>
        {description}
      </Text>
    </View>
  );
};

export default AchievementTaskHeader;
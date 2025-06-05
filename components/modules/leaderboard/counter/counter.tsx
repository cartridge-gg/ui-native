import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { LeaderboardIcon } from '../../../icons/state/LeaderboardIcon';

export interface LeaderboardCounterProps {
  rank: number;
  active?: boolean;
  style?: ViewStyle;
}

export const LeaderboardCounter: React.FC<LeaderboardCounterProps> = ({
  rank,
  active = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8, // px-2
      paddingVertical: 4, // py-1
      borderRadius: 999, // rounded-full
      backgroundColor: active ? colors.background[300] : colors.background[200],
    },
    text: {
      fontSize: 12, // text-xs
      letterSpacing: 0.5, // tracking-wider
      fontWeight: '600', // font-semibold
      paddingHorizontal: 2, // px-0.5
      color: active ? colors.foreground[100] : colors.foreground[300],
    },
  });

  return (
    <View style={[styles.container, style]}>
      <LeaderboardIcon
        variant="solid"
        size="xs"
        color={active ? colors.foreground[100] : colors.foreground[300]}
      />
      <Text style={styles.text}>
        {rank}
      </Text>
    </View>
  );
};

export default LeaderboardCounter;
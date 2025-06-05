import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { BronzeTagIcon } from '../../../icons/badge/BronzeTagIcon';
import { GoldTagIcon } from '../../../icons/badge/GoldTagIcon';
import { SilverTagIcon } from '../../../icons/badge/SilverTagIcon';
import { SparklesIcon } from '../../../icons/state/SparklesIcon';
import { LeaderboardUsername } from '../username/username';

export interface LeaderboardRowProps {
  rank: number;
  name: string;
  points: number;
  icon?: string;
  highlight?: boolean;
  following?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  name,
  points,
  icon,
  highlight = false,
  following,
  style,
  onPress,
}) => {
  const { colors } = useTheme();

  const Tag = useMemo(() => {
    switch (rank) {
      case 1:
        return <GoldTagIcon size="sm" />;
      case 2:
        return <SilverTagIcon size="sm" />;
      case 3:
        return <BronzeTagIcon size="sm" />;
      default:
        return null;
    }
  }, [rank]);

  const styles = StyleSheet.create({
    container: {
      minHeight: 44, // min-h-11
      flexDirection: 'row',
      paddingVertical: 10, // py-2.5
      paddingHorizontal: 12, // px-3
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: highlight ? colors.background[300] : colors.background[200],
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'transparent',
      // Sticky positioning would need special handling in React Native
    },
    leftSection: {
      flexDirection: 'row',
      gap: 8, // gap-x-2
      alignItems: 'center',
    },
    rankSection: {
      flexDirection: 'row',
      width: 44, // w-11
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rankText: {
      fontSize: 14, // text-sm
      color: highlight ? colors.foreground[300] : colors.foreground[400],
    },
    rightSection: {
      flexDirection: 'row',
      gap: 12, // gap-x-3
      alignItems: 'center',
    },
    pointsContainer: {
      flexDirection: 'row',
      gap: 4, // gap-1
      minWidth: 56, // min-w-14
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    pointsText: {
      fontSize: 14, // text-sm
      color: highlight ? colors.primary[100] : colors.foreground[100],
    },
  });

  const Container = onPress ? Pressable : View;

  return (
    <Container 
      style={[styles.container, style]}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.rankSection}>
          <Text style={styles.rankText}>{`${rank}.`}</Text>
          {Tag}
        </View>
        <LeaderboardUsername
          username={name}
          icon={icon}
          highlight={highlight}
        />
      </View>
      <View style={styles.rightSection}>
        {following !== undefined && (
          <View style={{ display: highlight ? 'none' : 'flex' }}>
            {/* FollowerMark component would need to be implemented */}
            {/* For now, placeholder */}
            <View style={{ 
              width: 16, 
              height: 16, 
              borderRadius: 8, 
              backgroundColor: following ? colors.primary[100] : colors.background[400] 
            }} />
          </View>
        )}
        <View style={styles.pointsContainer}>
          <SparklesIcon 
            variant={highlight ? "solid" : "line"} 
            size="sm"
            color={highlight ? colors.primary[100] : colors.foreground[100]}
          />
          <Text style={styles.pointsText}>{points}</Text>
        </View>
      </View>
    </Container>
  );
};

export default LeaderboardRow;
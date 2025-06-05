import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { AchievementPlayerAvatar } from '../../achievements/player-avatar/player-avatar';
import { TrophyIcon } from '../../../icons/state/TrophyIcon';

export interface LeaderboardUsernameProps {
  username: string;
  icon?: string;
  highlight?: boolean;
  style?: ViewStyle;
}

export const LeaderboardUsername: React.FC<LeaderboardUsernameProps> = ({
  username,
  icon,
  highlight = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 4, // gap-1
      alignItems: 'center',
    },
    iconContainer: {
      height: 20, // h-5
      width: 20, // w-5
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconFallback: {
      height: 16, // h-4
      width: 16, // w-4
    },
    text: {
      fontSize: 14, // text-sm
      color: highlight ? colors.primary[100] : colors.foreground[100],
      // truncate max-w-28 lg:max-w-none - would need responsive logic
      maxWidth: 112, // max-w-28 = 112px (28 * 4)
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        {icon ? (
          // For now using TrophyIcon as placeholder for FontAwesome icons
          <TrophyIcon 
            variant="solid" 
            size="xs" 
            style={styles.iconFallback}
          />
        ) : (
          <AchievementPlayerAvatar username={username} size="sm" />
        )}
      </View>
      <Text style={styles.text} numberOfLines={1}>
        {username}
      </Text>
    </View>
  );
};

export default LeaderboardUsername;
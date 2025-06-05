import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../typography/Text';
import { useTheme } from '../theme/ThemeProvider';
import {
  EmptyStateIcon,
  EmptyStateActivityIcon,
  EmptyStateAchievementIcon,
  EmptyStateDiscoverIcon,
  EmptyStateGuildIcon,
  EmptyStateInventoryIcon,
  EmptyStateLeaderboardIcon,
} from '../icons/utility';

export type EmptyVariant = 'default';

export type EmptyIcon = 
  | 'activity'
  | 'achievement'
  | 'guild'
  | 'inventory'
  | 'discover'
  | 'leaderboard';

export interface EmptyProps {
  title?: string;
  icon?: EmptyIcon;
  variant?: EmptyVariant;
  style?: ViewStyle;
}

export const Empty: React.FC<EmptyProps> = ({
  title = "Something went wrong",
  icon,
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const IconComponent = useMemo(() => {
    const iconProps = { 
      size: '3xl' as const, 
      color: colors.foreground[300] 
    };

    switch (icon) {
      case "activity":
        return <EmptyStateActivityIcon {...iconProps} />;
      case "achievement":
        return <EmptyStateAchievementIcon {...iconProps} />;
      case "guild":
        return <EmptyStateGuildIcon {...iconProps} />;
      case "inventory":
        return <EmptyStateInventoryIcon {...iconProps} />;
      case "discover":
        return <EmptyStateDiscoverIcon {...iconProps} />;
      case "leaderboard":
        return <EmptyStateLeaderboardIcon {...iconProps} />;
      default:
        return <EmptyStateIcon {...iconProps} />;
    }
  }, [icon, colors.foreground]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      borderRadius: 4,
      paddingHorizontal: 64, // px-16
      paddingVertical: 16,   // py-4
      borderWidth: 2,
      borderColor: colors.border[200], // Approximate #242824
      borderStyle: 'dashed', // Note: React Native has limited dashed support
      margin: 8,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {IconComponent}
        <Text 
          variant="sans-regular-14" 
          style={{ 
            color: colors.background[500], 
            textAlign: 'center',
            paddingHorizontal: 16,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Empty;
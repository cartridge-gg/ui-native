import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { AchievementPlayerAvatar } from '../../achievements/player-avatar/player-avatar';
import { FollowerAction } from '../action/action';
import { SparklesIcon } from '../../../icons/utility/SparklesIcon';

export interface FollowerSocialRowProps {
  username: string;
  following: boolean;
  unfollowable: boolean;
  onSocialClick: () => void;
  points?: number;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
  style?: ViewStyle;
}

export const FollowerSocialRow: React.FC<FollowerSocialRowProps> = ({
  username,
  following,
  unfollowable,
  points,
  loading = false,
  disabled = false,
  onSocialClick,
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'ghost':
        return { backgroundColor: 'transparent' };
      case 'default':
        return { backgroundColor: colors.background[200] };
      default:
        return { backgroundColor: colors.background[200] };
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16, // gap-4
      height: 44, // h-11
      paddingLeft: 12, // pl-3
      paddingRight: 6, // pr-1.5
      paddingVertical: 10, // py-2.5
      ...getVariantStyles(),
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12, // gap-3
      flex: 1,
    },
    userSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2, // gap-0.5
    },
    usernameText: {
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      paddingHorizontal: 2, // px-0.5
      color: colors.foreground[100],
    } as TextStyle,
    separator: {
      width: 1, // w-px
      height: 8, // h-2
      backgroundColor: colors.background[400],
    },
    pointsSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4, // gap-1
    },
    pointsText: {
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      color: colors.foreground[300],
    } as TextStyle,
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        <View style={styles.userSection}>
          <AchievementPlayerAvatar username={username} size="sm" />
          <Text style={styles.usernameText}>{username}</Text>
        </View>
        
        {points && (
          <>
            <View style={styles.separator} />
            <View style={styles.pointsSection}>
              <SparklesIcon variant="line" size="sm" color={colors.foreground[300]} />
              <Text style={styles.pointsText}>{points}</Text>
            </View>
          </>
        )}
      </View>

      <FollowerAction
        following={following}
        unfollowable={unfollowable}
        onPress={onSocialClick}
        variant={variant}
        loading={loading}
        disabled={disabled}
      />
    </View>
  );
};

export default FollowerSocialRow;
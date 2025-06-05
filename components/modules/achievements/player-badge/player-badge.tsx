import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { BronzeIcon } from '../../../icons/badge/BronzeIcon';
import { DefaultIcon } from '../../../icons/badge/DefaultIcon';
import { GoldIcon } from '../../../icons/badge/GoldIcon';
import { SilverIcon } from '../../../icons/badge/SilverIcon';
import { AchievementPlayerAvatar } from '../player-avatar/player-avatar';
import { Thumbnail } from '../../thumbnails/thumbnail/Thumbnail';
import { IconSize } from '../../../icons/types';

export interface AchievementPlayerBadgeProps {
  username?: string;
  icon?: React.ReactNode;
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
  rank?: 'default' | 'gold' | 'silver' | 'bronze';
  size?: 'xl' | '2xl' | '3xl';
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const AchievementPlayerBadge: React.FC<AchievementPlayerBadgeProps> = ({
  username,
  icon,
  variant = 'default',
  rank,
  size = 'xl',
  style,
  children,
}) => {
  const { colors } = useTheme();

  const BadgeIcon = useMemo(() => {
    const iconSize: IconSize = size === '3xl' ? '3xl' : size === '2xl' ? '2xl' : 'xl';
    const iconColor = colors.primary[100];

    switch (rank) {
      case "gold":
        return (
          <GoldIcon 
            style={styles.badgeIcon} 
            color={iconColor} 
            size={iconSize} 
          />
        );
      case "silver":
        return (
          <SilverIcon 
            style={styles.badgeIcon} 
            color={iconColor} 
            size={iconSize} 
          />
        );
      case "bronze":
        return (
          <BronzeIcon 
            style={styles.badgeIcon} 
            color={iconColor} 
            size={iconSize} 
          />
        );
      case "default":
      default:
        return (
          <DefaultIcon 
            style={styles.badgeIcon} 
            color={iconColor} 
            size={iconSize} 
          />
        );
    }
  }, [rank, size, colors.primary]);

  const ThumbnailIcon = useMemo(() => {
    if (icon) return icon;
    return (
      <AchievementPlayerAvatar
        username={username ?? ""}
        style={{ height: '100%', width: '100%' }}
      />
    );
  }, [icon, username]);

  const getThumbnailSize = () => {
    switch (size) {
      case '3xl':
        return 'xl';
      case '2xl':
        return 'lg';
      default:
        return 'md';
    }
  };

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      height: 48, // h-12
      width: 48, // w-12
    },
    badgeIcon: {
      position: 'absolute',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Thumbnail
        icon={ThumbnailIcon}
        variant={variant}
        size={getThumbnailSize()}
        style={{
          borderRadius: 999, // rounded-full
        }}
        centered
        rounded
      />
      {BadgeIcon}
      {children}
    </View>
  );
};

export default AchievementPlayerBadge;
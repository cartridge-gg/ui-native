import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { CardTitle } from '../../../primitives/card/Card';
import { Skeleton } from '../../../primitives/skeleton/Skeleton';
import { JoystickIcon } from '../../../icons/state/JoystickIcon'; // Using as SpaceInvaderIcon fallback
import { TrophyIcon } from '../../../icons/state/TrophyIcon';

export interface ArcadeDiscoveryEventProps {
  name: string;
  timestamp: number;
  Icon?: React.ReactNode;
  achievement?: {
    title: string;
    icon: string;
  };
  loading?: boolean;
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
  color?: string;
  style?: ViewStyle;
}

export const ArcadeDiscoveryEvent: React.FC<ArcadeDiscoveryEventProps> = ({
  name,
  timestamp,
  Icon,
  achievement,
  loading = false,
  variant = 'default',
  color,
  style,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'darkest':
      case 'darker':
      case 'dark':
        return { backgroundColor: colors.background[100] };
      case 'ghost':
        return { backgroundColor: 'transparent' };
      default:
        return { backgroundColor: colors.background[200] };
    }
  };

  const getSkeletonColor = () => {
    switch (variant) {
      case 'darkest':
      case 'darker':
      case 'dark':
        return colors.background[200];
      default:
        return colors.background[300];
    }
  };

  const styles = StyleSheet.create({
    container: {
      height: 44, // h-11
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12, // px-3
      paddingVertical: 10, // py-2.5
      ...getVariantStyles(),
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6, // gap-x-1.5
    },
    nameText: {
      fontSize: 14, // text-sm
      fontWeight: '400', // font-normal
      letterSpacing: 0, // tracking-normal
      color: colors.foreground[100],
    } as TextStyle,
  });

  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <Skeleton 
          style={{ 
            width: 120, 
            height: '100%', 
            backgroundColor: getSkeletonColor() 
          }} 
        />
        <Skeleton 
          style={{ 
            width: 60, 
            height: '100%', 
            backgroundColor: getSkeletonColor() 
          }} 
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {Icon ? Icon : <JoystickIcon size="sm" variant="solid" />}
        <CardTitle style={styles.nameText}>
          {name}
        </CardTitle>
        {achievement && (
          <AchievementEvent
            title={achievement.title}
            icon={achievement.icon}
            color={color}
          />
        )}
      </View>
      <Timestamp timestamp={timestamp} />
    </View>
  );
};

interface AchievementEventProps {
  title: string;
  icon: string;
  color?: string;
}

const AchievementEvent: React.FC<AchievementEventProps> = ({ 
  title, 
  icon, 
  color 
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6, // gap-x-1.5
    },
    earnedText: {
      fontSize: 12, // text-xs
      color: colors.foreground[300],
    },
    achievementBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4, // gap-1
      padding: 4, // p-1
      borderWidth: 1,
      borderColor: colors.background[400],
      borderRadius: 2, // rounded-sm
    },
    iconContainer: {
      width: 12, // w-3
      height: 12, // h-3
    },
    achievementTitle: {
      fontSize: 12, // text-xs
      color: color || colors.primary[100],
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.earnedText}>earned</Text>
      <View style={styles.achievementBadge}>
        <View style={styles.iconContainer}>
          <TrophyIcon variant="solid" size="xs" color={color || colors.primary[100]} />
        </View>
        <Text style={styles.achievementTitle}>{title}</Text>
      </View>
    </View>
  );
};

interface TimestampProps {
  timestamp: number;
}

const Timestamp: React.FC<TimestampProps> = ({ timestamp }) => {
  const { colors } = useTheme();
  const [state, setState] = useState<{
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  }>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - timestamp * 1000;
      setState({
        seconds: Math.floor(diff / 1000),
        minutes: Math.floor(diff / (1000 * 60)),
        hours: Math.floor(diff / (1000 * 60 * 60)),
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const label = useMemo(() => {
    if (state.days > 0) return `${state.days}d ago`;
    if (state.hours > 0) return `${state.hours}h ago`;
    if (state.minutes > 0) return `${state.minutes}m ago`;
    return `${state.seconds}s ago`;
  }, [state]);

  const styles = StyleSheet.create({
    text: {
      fontSize: 12, // text-xs
      color: colors.foreground[300],
    },
  });

  return <Text style={styles.text}>{label}</Text>;
};

export default ArcadeDiscoveryEvent;
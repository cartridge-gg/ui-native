import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityCard } from './ActivityCard';
import { Text } from '../../../typography/Text';
import { useTheme } from '../../../theme/ThemeProvider';

export interface ActivityAchievementCardProps {
  title: string;
  topic: string;
  points: number;
  website: string;
  image?: string;
  error?: boolean;
  loading?: boolean;
  certified?: boolean;
  onPress?: () => void;
  style?: any;
}

export const ActivityAchievementCard: React.FC<ActivityAchievementCardProps> = ({
  title,
  topic,
  points,
  website,
  image,
  error = false,
  loading = false,
  certified = false,
  onPress,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    logoContainer: {
      position: 'relative',
      width: 48,
      height: 48,
    },
    logoBackground: {
      width: 48,
      height: 48,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoIcon: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    subIcon: {
      position: 'absolute',
      bottom: -4,
      right: -4,
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.background[200],
    },
    subIconText: {
      fontSize: 10,
    },
    socialContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    socialIcon: {
      fontSize: 12,
    },
    socialText: {
      fontSize: 12,
    },
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    pointsIcon: {
      fontSize: 12,
    },
    pointsText: {
      fontSize: 12,
    },
  });

  // Create the achievement logo with trophy icon
  const Logo = (
    <View style={styles.logoContainer}>
      <View style={[styles.logoBackground, { backgroundColor: colors.primary[100] }]}>
        <Text style={[styles.logoIcon, { color: colors.primary.foreground }]}>🏆</Text>
      </View>
      <View style={[styles.subIcon, { backgroundColor: colors.background[300] }]}>
        <Text style={[styles.subIconText, { color: colors.primary[100] }]}>⭐</Text>
      </View>
    </View>
  );

  // Create the social website component
  const Social = (
    <View style={styles.socialContainer}>
      <Text style={[styles.socialIcon, { color: colors.foreground[300] }]}>
        {certified ? '✓' : '🌐'}
      </Text>
      <Text style={[styles.socialText, { color: colors.foreground[300] }]}>
        {website.replace(/^.*https?:\/\//, '').replace(/\/$/, '')}
      </Text>
    </View>
  );

  // Create the points component
  const Points = (
    <View style={styles.pointsContainer}>
      <Text style={[styles.pointsIcon, { color: colors.foreground[300] }]}>✨</Text>
      <Text style={[styles.pointsText, { color: colors.foreground[300] }]}>{points}</Text>
    </View>
  );

  return (
    <ActivityCard
      Logo={Logo}
      title={title}
      subTitle={Social}
      topic={topic}
      subTopic={Points}
      error={error}
      loading={loading}
      onPress={onPress}
      style={style}
    />
  );
}; 
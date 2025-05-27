import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ActivityCard } from './ActivityCard';
import { ActivitySocialWebsite } from './ActivitySocialWebsite';
import { Text } from '../../../typography/Text';
import { useTheme } from '../../../theme/ThemeProvider';
import { Thumbnail, ThumbnailsSubIcon } from '../../thumbnails';
import { TrophyIcon, SparklesIcon } from '../../../icons/utility/SvgIcons';

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
  image = '',
  error = false,
  loading = false,
  certified = false,
  onPress,
  style,
}) => {
  const { colors } = useTheme();

  const Icon = useMemo(
    () => (
      <TrophyIcon
        size="default"
        color={colors.foreground[100]}
      />
    ),
    [colors.foreground],
  );

  const Logo = useMemo(
    () => (
      <Thumbnail
        icon={image || Icon}
        subIcon={
          <ThumbnailsSubIcon
            variant="light"
            size="lg"
            Icon={<TrophyIcon size="xs" color={colors.primary[100]} />}
          />
        }
        error={error}
        loading={loading}
        size="lg"
        variant="light"
        style={!error && !loading ? { backgroundColor: colors.primary[100] } : undefined}
      />
    ),
    [image, error, loading, Icon, colors.primary],
  );

  const Social = useMemo(() => {
    return <ActivitySocialWebsite website={website} certified={certified} />;
  }, [website, certified]);

  const Points = useMemo(() => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <SparklesIcon size="xs" color={colors.foreground[300]} />
        <Text style={{ fontSize: 12, color: colors.foreground[300] }}>{points}</Text>
      </View>
    );
  }, [points, colors.foreground]);

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
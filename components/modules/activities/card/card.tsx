import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { GlobeIcon } from '../../../icons/state/GlobeIcon';
import { UserCheckIcon } from '../../../icons/state/UserCheckIcon'; // Using as VerifiedIcon substitute

export interface ActivityCardProps {
  Logo: React.ReactNode;
  title: string;
  subTitle: string | React.ReactNode;
  topic?: string;
  subTopic?: string | React.ReactNode;
  error?: boolean;
  loading?: boolean;
  variant?: 'default';
  style?: ViewStyle;
  onPress?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  Logo,
  title,
  subTitle,
  topic,
  subTopic,
  error = false,
  loading = false,
  variant = 'default',
  style,
  onPress,
}) => {
  const { colors } = useTheme();

  const getTextColor = () => {
    if (error) return colors.destructive[100];
    if (loading) return colors.foreground[300];
    return colors.foreground[100];
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: 8, // rounded
      padding: 12, // p-3
      paddingRight: 16, // pr-4
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16, // gap-4
      backgroundColor: colors.background[200],
      // hover:bg-background-300 would need hover state management
    },
    contentColumn: {
      flexDirection: 'column',
      gap: 2, // gap-0.5
      flex: 1, // grow
      overflow: 'hidden',
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 24, // gap-6
      justifyContent: 'space-between',
    },
    titleText: {
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      textTransform: 'capitalize',
      color: getTextColor(),
    },
    topicText: {
      fontSize: 14,
      fontWeight: '500',
      color: getTextColor(),
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4, // gap-1
      justifyContent: 'space-between',
    },
    subTitleText: {
      fontSize: 12, // text-xs
      color: error ? colors.destructive[100] : colors.foreground[300],
    },
  });

  const Container = onPress ? Pressable : View;

  return (
    <Container 
      style={[styles.container, style]}
      onPress={onPress}
    >
      {Logo}
      <View style={styles.contentColumn}>
        <View style={styles.topRow}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
          {!!topic && (
            <Text style={styles.topicText} numberOfLines={1}>
              {topic}
            </Text>
          )}
        </View>
        <View style={styles.bottomRow}>
          {typeof subTitle === 'string' ? (
            <Text style={styles.subTitleText}>
              {subTitle}
            </Text>
          ) : (
            subTitle
          )}
          {!!subTopic && (
            typeof subTopic === 'string' ? (
              <Text style={styles.subTitleText}>
                {subTopic}
              </Text>
            ) : (
              subTopic
            )
          )}
        </View>
      </View>
    </Container>
  );
};

export interface ActivitySocialWebsiteProps {
  website: string;
  certified?: boolean;
  style?: ViewStyle;
}

export const ActivitySocialWebsite: React.FC<ActivitySocialWebsiteProps> = ({
  website,
  certified = false,
  style,
}) => {
  const { colors } = useTheme();

  const label = useMemo(() => {
    return website.replace(/^.*https?:\/\//, "").replace(/\/$/, "");
  }, [website]);

  const IconComponent = useMemo(() => {
    if (certified) {
      return <UserCheckIcon variant="solid" size="xs" color={colors.foreground[300]} />;
    }
    return <GlobeIcon variant="line" size="xs" color={colors.foreground[300]} />;
  }, [certified, colors.foreground]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 4, // gap-x-1
      alignItems: 'center',
    },
    text: {
      fontSize: 12, // text-xs
      color: colors.foreground[300],
    },
  });

  return (
    <View style={[styles.container, style]}>
      {IconComponent}
      {label && <Text style={styles.text}>{label}</Text>}
    </View>
  );
};

export default ActivityCard;
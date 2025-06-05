import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';

export interface ActivityHeaderProps {
  Logo: React.ReactNode;
  title: string;
  topic?: string;
  subTopic?: string | React.ReactNode;
  error?: boolean;
  loading?: boolean;
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest';
  style?: ViewStyle;
}

export const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  Logo,
  title,
  topic,
  subTopic,
  error = false,
  loading = false,
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const getTextColor = (isMain: boolean = false) => {
    if (error) return colors.destructive[100];
    if (loading) return colors.foreground[300];
    return isMain ? colors.foreground[100] : colors.foreground[200];
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24, // gap-6
    },
    titleText: {
      fontSize: 18, // text-lg
      lineHeight: 22, // /[22px]
      fontWeight: '600', // font-semibold
      color: getTextColor(),
    },
    contentContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    topicText: {
      fontSize: 24, // text-2xl
      lineHeight: 29, // /[29px]
      fontWeight: '600', // font-semibold
      color: getTextColor(true),
      textAlign: 'center',
    },
    subTopicText: {
      fontSize: 14, // text-sm
      color: error ? colors.destructive[100] : colors.foreground[300],
      textAlign: 'center',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.titleText}>{title}</Text>
      {Logo}
      <View style={styles.contentContainer}>
        {topic && (
          <Text style={styles.topicText}>
            {topic}
          </Text>
        )}
        {(subTopic || error) && (
          typeof subTopic === 'string' || error ? (
            <Text style={styles.subTopicText}>
              {error ? "Failed" : subTopic}
            </Text>
          ) : (
            subTopic
          )
        )}
      </View>
    </View>
  );
};

export default ActivityHeader;
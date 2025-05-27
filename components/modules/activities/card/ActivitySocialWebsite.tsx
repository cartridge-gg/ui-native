import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../typography/Text';
import { useTheme } from '../../../theme/ThemeProvider';
import { GlobeIcon, VerifiedIcon } from '../../../icons/utility/SvgIcons';

export interface ActivitySocialWebsiteProps {
  website: string;
  certified?: boolean;
  style?: any;
}

export const ActivitySocialWebsite: React.FC<ActivitySocialWebsiteProps> = ({
  website,
  certified = false,
  style,
}) => {
  const { colors } = useTheme();

  const label = useMemo(() => {
    return website.replace(/^.*https?:\/\//, '').replace(/\/$/, '');
  }, [website]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    icon: {
      fontSize: 16, // xs size = 16px
      color: colors.foreground[300],
    },
    label: {
      fontSize: 12,
      color: colors.foreground[300],
    },
  });

  const Icon = useMemo(() => {
    if (certified) {
      return <VerifiedIcon size="xs" color={colors.foreground[300]} />;
    }
    return <GlobeIcon size="xs" color={colors.foreground[300]} />;
  }, [certified, colors.foreground]);

  return (
    <View style={[styles.container, style]}>
      {Icon}
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}; 
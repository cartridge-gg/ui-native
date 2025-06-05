import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, ImageBackground, Pressable, Linking, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { CardTitle } from '../../../primitives/card/Card';
import { Thumbnail } from '../../thumbnails/thumbnail/Thumbnail';
import { GlobeIcon } from '../../../icons/state/GlobeIcon';
import { CodeIcon } from '../../../icons/state/CodeIcon'; // Using as DojoIcon fallback
import { AchievementContentProps, AchievementPinProps } from '../../achievements';

export interface Metadata {
  name: string;
  logo?: string;
  cover?: string;
}

export interface Socials {
  website?: string;
  discord?: string;
  telegram?: string;
  twitter?: string;
  github?: string;
}

export interface ArcadeGameHeaderProps {
  metadata: Metadata;
  achievements?: {
    id: string;
    content: AchievementContentProps;
    pin?: AchievementPinProps;
  }[];
  socials?: Socials;
  active?: boolean;
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
  color?: string;
  style?: ViewStyle;
}

export const ArcadeGameHeader: React.FC<ArcadeGameHeaderProps> = ({
  achievements,
  metadata,
  socials,
  active = false,
  variant = 'default',
  color,
  style,
}) => {
  const { colors } = useTheme();

  const pins = useMemo(() => {
    if (!achievements) return [];
    return achievements
      .filter((a) => a.content.icon && a.pin?.pinned)
      .map((a) => ({
        id: a.id,
        icon: a.content.icon || "fa-trophy",
        name: a.content.title || "",
      }))
      .slice(0, 3);
  }, [achievements]);

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

  const getThumbnailVariant = () => {
    if (!variant || variant === 'default' || variant?.includes('light')) {
      return 'light';
    }
    return 'default';
  };

  const styles = StyleSheet.create({
    container: {
      height: 64, // h-16
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16, // px-4
      paddingVertical: 12, // py-3
      gap: 12, // gap-x-3
      ...getVariantStyles(),
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12, // gap-3
      flex: 1,
    },
    titleSection: {
      flexDirection: 'column',
      gap: 2, // gap-y-0.5
      flex: 1,
    },
    titleText: {
      color: colors.foreground[100],
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      letterSpacing: 0, // tracking-normal
    } as TextStyle,
    pinsContainer: {
      flexDirection: 'row',
      gap: 4,
    },
    pinDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: active ? color || colors.primary[100] : colors.foreground[300],
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8, // gap-x-2
      flexWrap: 'wrap',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4, // gap-x-1
      borderRadius: 4, // rounded
      paddingHorizontal: 6, // px-1.5
      paddingVertical: 4, // py-1
      backgroundColor: variant === 'ghost' ? 'transparent' : 
        (variant === 'default' || variant?.includes('light')) ? 
          colors.background[200] : colors.background[100],
    },
    socialText: {
      paddingHorizontal: 2, // px-0.5
      fontSize: 12, // text-xs
      fontWeight: '500', // font-medium
      letterSpacing: 0, // tracking-normal
      color: colors.foreground[100],
    },
  });

  const handleSocialPress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const renderSocialButton = (url: string, icon: React.ReactNode, label?: string) => (
    <Pressable 
      key={url}
      style={styles.socialButton} 
      onPress={() => handleSocialPress(url)}
    >
      {icon}
      {label && (
        <Text style={styles.socialText}>
          {label}
        </Text>
      )}
    </Pressable>
  );

  const getWebsiteLabel = (website: string) => {
    return website.replace(/^.*https?:\/\//, "").replace(/\/$/, "");
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        <Thumbnail
          icon={metadata.logo ? metadata.logo : <CodeIcon size="lg" variant="solid" />}
          variant={getThumbnailVariant()}
          size="lg"
        />
        <View style={styles.titleSection}>
          <CardTitle style={styles.titleText}>
            {metadata.name}
          </CardTitle>
          {pins.length > 0 && (
            <View style={styles.pinsContainer}>
              {pins.map((pin) => (
                <View key={pin.id} style={styles.pinDot} />
              ))}
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.rightSection}>
        {socials?.website && renderSocialButton(
          socials.website,
          <GlobeIcon variant="line" size="xs" />,
          getWebsiteLabel(socials.website)
        )}
        {socials?.github && renderSocialButton(
          socials.github,
          <CodeIcon variant="solid" size="xs" />
        )}
        {/* Additional social platforms would need their respective icons */}
      </View>
    </View>
  );
};

export default ArcadeGameHeader;
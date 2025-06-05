import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { JoystickIcon } from '../../../icons/state/JoystickIcon'; // Using as SpaceInvaderIcon fallback

export interface UniversalHeaderIconProps {
  icon: string | React.ReactNode;
  variant?: 'default' | 'ghost';
  size?: 'default';
  style?: ViewStyle;
}

export const UniversalHeaderIcon: React.FC<UniversalHeaderIconProps> = ({
  icon,
  variant = 'default',
  size = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor: colors.background[200],
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      default:
        return { width: 44, height: 44 }; // w-11 h-11 = 44px
    }
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8, // rounded
      ...getVariantStyles(),
      ...getSizeStyles(),
    },
    fallbackIcon: {
      width: 24, // w-6
      height: 24, // h-6
    },
    urlImage: {
      width: 36, // w-9
      height: 36, // h-9
      borderRadius: 4,
    },
  });

  const renderIcon = () => {
    if (typeof icon === "string") {
      if (icon.includes("fa-")) {
        // For FontAwesome icons, use fallback
        return (
          <JoystickIcon 
            variant="solid" 
            size="lg" 
            color={colors.foreground[100]}
            style={styles.fallbackIcon}
          />
        );
      } else {
        // Assume it's a URL
        return (
          <Image 
            source={{ uri: icon }} 
            style={styles.urlImage}
            resizeMode="cover"
          />
        );
      }
    } else if (icon) {
      return icon;
    } else {
      // Default fallback
      return (
        <JoystickIcon 
          variant="solid" 
          size="lg" 
          color={colors.foreground[100]}
        />
      );
    }
  };

  return (
    <View style={[styles.container, style]}>
      {renderIcon()}
    </View>
  );
};

export default UniversalHeaderIcon;
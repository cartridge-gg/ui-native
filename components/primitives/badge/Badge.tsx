import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';

export type BadgeVariant = 'default' | 'primary' | 'muted' | 'destructive' | 'outline';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  onPress?: () => void;
  style?: any;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = (variant: BadgeVariant) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary[100],
          borderColor: 'transparent',
        };
      case 'muted':
        return {
          backgroundColor: colors.background[200],
          borderColor: 'transparent',
        };
      case 'destructive':
        return {
          backgroundColor: colors.destructive[100],
          borderColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.foreground[400],
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: colors.background[200],
          borderColor: 'transparent',
        };
    }
  };

  const getTextColor = (variant: BadgeVariant) => {
    switch (variant) {
      case 'primary':
        return colors.primary.foreground;
      case 'muted':
        return colors.foreground[400];
      case 'destructive':
        return colors.destructive.foreground;
      case 'outline':
        return colors.foreground[100];
      default:
        return colors.foreground[100];
    }
  };

  const variantStyles = getVariantStyles(variant);
  const textColor = getTextColor(variant);

  const styles = StyleSheet.create({
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 6,
      paddingHorizontal: 4,
      paddingVertical: 2,
      ...variantStyles,
    },
    text: {
      fontSize: 12,
      fontWeight: '600',
      color: textColor,
    },
  });

  const content = (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
        {content}
      </Pressable>
    );
  }

  return content;
}; 
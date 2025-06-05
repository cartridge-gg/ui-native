import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { DotsIcon } from '../../../icons/utility/DotsIcon';

export interface ArcadeMenuButtonProps {
  active?: boolean;
  variant?: 'default';
  size?: 'default';
  style?: ViewStyle;
  onPress?: () => void;
}

export const ArcadeMenuButton: React.FC<ArcadeMenuButtonProps> = ({
  active = false,
  variant = 'default',
  size = 'default',
  style,
  onPress,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      default:
        return {
          backgroundColor: colors.background[200],
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      default:
        return {
          width: 32, // w-8
          height: 32, // h-8
        };
    }
  };

  const styles = StyleSheet.create({
    button: {
      padding: 0, // p-0
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      ...getVariantStyles(),
      ...getSizeStyles(),
    },
    pressed: {
      backgroundColor: colors.background[300],
    },
  });

  const getIconColor = (pressed: boolean) => {
    if (active) return colors.primary[100];
    if (pressed) return colors.foreground[200];
    return colors.foreground[300];
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <DotsIcon 
          size="xs" 
          color={getIconColor(pressed)}
        />
      )}
    </Pressable>
  );
};

export default ArcadeMenuButton;
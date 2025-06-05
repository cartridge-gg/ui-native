import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';

export interface ArcadeMenuItemProps {
  Icon: React.ReactNode;
  value: string;
  label: string;
  active?: boolean;
  variant?: 'default';
  size?: 'default';
  style?: ViewStyle;
  onPress?: () => void;
}

export const ArcadeMenuItem: React.FC<ArcadeMenuItemProps> = ({
  Icon,
  value,
  label,
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
          minWidth: 192, // min-w-[192px]
          paddingHorizontal: 8, // px-2
          paddingVertical: 10, // py-2.5
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: 0, // rounded-none
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 4, // gap-1
      ...getVariantStyles(),
      ...getSizeStyles(),
    },
    pressed: {
      backgroundColor: colors.background[300],
    },
    contentContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 4, // gap-1
      flex: 1,
    },
    labelText: {
      fontSize: 14, // text-sm
      fontWeight: '400', // font-normal
      flex: 1,
    } as TextStyle,
  });

  const getTextColor = (pressed: boolean) => {
    if (active) return colors.primary[100];
    if (pressed) return colors.foreground[200];
    return colors.foreground[300];
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <View style={styles.contentContainer}>
          {Icon}
          <Text style={[styles.labelText, { color: getTextColor(pressed) }]}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ArcadeMenuItem;
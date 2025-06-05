import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';

export interface CollectibleTagProps {
  label?: string;
  variant?: 'default';
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const CollectibleTag: React.FC<CollectibleTagProps> = ({
  label,
  variant = 'default',
  style,
  children,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      paddingHorizontal: 4, // px-1
      paddingVertical: 2, // py-0.5
      borderRadius: 2, // rounded-sm
      height: 24, // h-6
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(30, 34, 31, 0.64)', // bg-[#1E221FA3]
      // backdrop-blur-[8px] not directly supported in RN
    },
    text: {
      color: colors.foreground[100],
      fontSize: 14, // text-sm
      letterSpacing: 0.5, // tracking-wider
      fontWeight: '600', // font-semibold
      paddingHorizontal: 2, // px-0.5
    },
  });

  return (
    <View style={[styles.container, style]}>
      {children}
      {label && <Text style={styles.text}>{label}</Text>}
    </View>
  );
};

export default CollectibleTag;
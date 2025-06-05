import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { UniversalHeaderIcon } from '../header-icon/header-icon';

export interface UniversalHeaderLabelProps {
  label: string;
  icon?: string | React.ReactNode;
  variant?: 'default' | 'ghost';
  size?: 'default';
  style?: ViewStyle;
}

export const UniversalHeaderLabel: React.FC<UniversalHeaderLabelProps> = ({
  label,
  icon,
  variant = 'default',
  size = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 16, // gap-x-4
      alignItems: 'center',
    },
    labelText: {
      fontWeight: '600', // font-semibold
      fontSize: 18, // text-lg
      lineHeight: 22, // /[22px]
      color: variant === 'ghost' ? colors.foreground[300] : colors.foreground[100],
    },
  });

  return (
    <View style={[styles.container, style]}>
      <UniversalHeaderIcon icon={icon} variant={variant} size={size} />
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export default UniversalHeaderLabel;
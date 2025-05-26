import React from 'react';
import { Switch as RNSwitch, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface SwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: any;
}

export const Switch: React.FC<SwitchProps> = ({
  value = false,
  onValueChange,
  disabled = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      // Container for additional styling if needed
    },
  });

  return (
    <View style={[styles.container, style]}>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: colors.background[400],
          true: colors.primary[100],
        }}
        thumbColor={colors['translucent-dark'][300]}
        ios_backgroundColor={colors.background[400]}
      />
    </View>
  );
}; 
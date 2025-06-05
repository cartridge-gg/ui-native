import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { TrophyIcon } from '../../../icons/state/TrophyIcon';

export interface AchievementIconProps {
  icon?: string;
  completed?: boolean;
  style?: ViewStyle;
}

export const AchievementIcon: React.FC<AchievementIconProps> = ({
  icon,
  completed = false,
  style,
}) => {
  const { colors } = useTheme();

  const iconColor = completed ? colors.primary[100] : colors.foreground[300];

  const styles = StyleSheet.create({
    container: {
      width: 32,  // w-8
      height: 32, // h-8
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  // For now, default to trophy icon since we don't have FontAwesome integration
  // In a full implementation, you'd map icon strings to actual icon components
  const IconComponent = TrophyIcon;

  return (
    <View style={[styles.container, style]}>
      <IconComponent 
        variant="solid" 
        size="lg" 
        color={iconColor}
      />
    </View>
  );
};

export default AchievementIcon;
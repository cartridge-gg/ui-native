import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface AchievementBitsProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AchievementBits: React.FC<AchievementBitsProps> = ({ 
  children, 
  style 
}) => {
  const { colors } = useTheme();

  return (
    <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1, // gap-x-px equivalent
          borderRadius: 999, // rounded-full
          backgroundColor: colors.background[300],
          borderWidth: 3,
          borderColor: colors.background[300],
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default AchievementBits;
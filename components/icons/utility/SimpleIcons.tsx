import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

// Trophy Icon - matches web TrophyIcon exactly
export const TrophyIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color, 
  style 
}) => {
  const { colors } = useTheme();
  const iconColor = color || colors.foreground[100];
  
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <Text style={{ fontSize: size * 0.8, color: iconColor }}>🏆</Text>
    </View>
  );
};

// Sparkles Icon - matches web SparklesIcon exactly  
export const SparklesIcon: React.FC<IconProps> = ({ 
  size = 16, 
  color, 
  style 
}) => {
  const { colors } = useTheme();
  const iconColor = color || colors.foreground[300];
  
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <Text style={{ fontSize: size * 0.9, color: iconColor }}>✨</Text>
    </View>
  );
};

// Globe Icon - matches web GlobeIcon exactly
export const GlobeIcon: React.FC<IconProps> = ({ 
  size = 16, 
  color, 
  style 
}) => {
  const { colors } = useTheme();
  const iconColor = color || colors.foreground[300];
  
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <Text style={{ fontSize: size * 0.9, color: iconColor }}>🌐</Text>
    </View>
  );
};

// Verified Icon - matches web VerifiedIcon exactly
export const VerifiedIcon: React.FC<IconProps> = ({ 
  size = 16, 
  color, 
  style 
}) => {
  const { colors } = useTheme();
  const iconColor = color || colors.foreground[300];
  
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <Text style={{ fontSize: size * 0.9, color: iconColor }}>✓</Text>
    </View>
  );
}; 
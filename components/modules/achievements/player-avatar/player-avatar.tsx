import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { UserIcon } from '../../../icons/state/UserIcon';
import { IconSize } from '../../../icons/types';

export interface AchievementPlayerAvatarProps {
  username: string;
  size?: IconSize;
  style?: ViewStyle;
}

export const AchievementPlayerAvatar: React.FC<AchievementPlayerAvatarProps> = ({
  username,
  size = 'md',
  style,
}) => {
  const iconColor = useMemo(() => {
    // Generate a color based on username hash for visual variety
    const hash = username.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    // Generate different color hues based on hash
    const colors = [
      '#3B82F6', // Blue
      '#10B981', // Green  
      '#F59E0B', // Yellow
      '#EF4444', // Red
      '#8B5CF6', // Purple
      '#F97316', // Orange
      '#06B6D4', // Cyan
      '#84CC16', // Lime
    ];
    
    return colors[hash % colors.length];
  }, [username]);

  // For now, using UserIcon as fallback since OlmechIcon doesn't exist in native
  // In a full implementation, you would create the full OlmechIcon component with variants
  return (
    <UserIcon 
      size={size} 
      variant={"solid" as const}
      color={iconColor}
      style={style}
    />
  );
};

export default AchievementPlayerAvatar;
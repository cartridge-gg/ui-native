import React from 'react';
import { ViewStyle } from 'react-native';
import { Button } from '../../../primitives/button/Button';
import { WedgeIcon } from '../../../icons/directional/WedgeIcon';
import { useTheme } from '../../../theme/ThemeProvider';

export interface AchievementPaginationProps {
  direction: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
  style?: ViewStyle;
}

export const AchievementPagination: React.FC<AchievementPaginationProps> = ({
  direction,
  disabled = false,
  onClick,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <Button
      variant="icon"
      size="icon"
      disabled={disabled}
      onPress={onClick}
      style={[
        {
          borderRadius: 0, // rounded-none
          backgroundColor: 'transparent',
        },
        style,
      ]}
    >
      <WedgeIcon 
        variant={direction} 
        size="sm" 
        color={disabled ? colors.foreground[400] : colors.foreground[300]}
      />
    </Button>
  );
};

export default AchievementPagination;
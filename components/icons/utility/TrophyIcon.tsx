import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Icon } from '../Icon';
import { IconProps } from '../types';

export const TrophyIcon: React.FC<IconProps> = ({ 
  size = 'default', 
  color, 
  variant = 'solid',
  ...props 
}) => {
  return (
    <Icon size={size} color={color} {...props}>
      {variant === 'solid' ? (
        <Svg viewBox="0 0 24 24" fill="currentColor">
          <Path d="M6 9a1 1 0 0 0-1 1v1a5 5 0 0 0 5 5h.5a6.5 6.5 0 0 0 6.5-6.5V10a1 1 0 0 0-1-1H6Z" />
          <Path d="M3.5 11.5A3.5 3.5 0 0 1 7 8h1v1a5 5 0 0 1-4.5 4.97v-2.47Z" />
          <Path d="M17 8h1a3.5 3.5 0 0 1 3.5 3.5v2.47A5 5 0 0 1 17 9V8Z" />
          <Path d="M12 17.5a4.5 4.5 0 0 1-4.5-4.5V12h9v1a4.5 4.5 0 0 1-4.5 4.5Z" />
          <Path d="M8.5 20a1.5 1.5 0 0 0 0 3h7a1.5 1.5 0 0 0 0-3h-7Z" />
        </Svg>
      ) : (
        <Svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <Path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" />
          <Path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" />
          <Path d="M6 9a6 6 0 0 0 12 0" />
          <Path d="M9 20h6" />
          <Path d="M10 20v3" />
          <Path d="M14 20v3" />
        </Svg>
      )}
    </Icon>
  );
}; 
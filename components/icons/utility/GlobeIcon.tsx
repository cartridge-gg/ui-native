import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeProvider';

export type IconSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl' | '3xl';
export type IconVariant = 'solid' | 'line';

export interface IconProps {
  size?: IconSize;
  color?: string;
  variant?: IconVariant;
  style?: any;
}

export const GlobeIcon: React.FC<IconProps> = ({ 
  size = 'default', 
  color, 
  variant = 'line',
  style,
}) => {
  const { colors } = useTheme();
  
  const getSizeValue = () => {
    switch (size) {
      case 'xs': return 16;
      case 'sm': return 20;
      case 'default': return 24;
      case 'lg': return 32;
      case 'xl': return 48;
      case '2xl': return 56;
      case '3xl': return 72;
      default: return 24;
    }
  };

  const sizeValue = getSizeValue();
  const iconColor = color || colors.foreground[100];

  return (
    <Svg 
      width={sizeValue} 
      height={sizeValue} 
      viewBox="0 0 24 24" 
      style={style}
    >
      {variant === 'solid' ? (
        <Path 
          fill={iconColor}
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
        />
      ) : (
        <Path 
          fill="none"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18"
        />
      )}
    </Svg>
  );
}; 
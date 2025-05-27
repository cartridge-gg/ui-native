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

export const VerifiedIcon: React.FC<IconProps> = ({ 
  size = 'default', 
  color, 
  variant = 'solid',
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
          d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V4.5C15 3.4 14.6 2.4 13.9 1.7L12 0L10.1 1.7C9.4 2.4 9 3.4 9 4.5V6.5L3 7V9L9 9.5V11.5C9 12.6 9.4 13.6 10.1 14.3L12 16L13.9 14.3C14.6 13.6 15 12.6 15 11.5V9.5L21 9ZM7 10.5L5 10.2V8.8L7 8.5V10.5ZM17 10.5V8.5L19 8.8V10.2L17 10.5Z"
        />
      ) : (
        <Path 
          fill="none"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )}
    </Svg>
  );
}; 
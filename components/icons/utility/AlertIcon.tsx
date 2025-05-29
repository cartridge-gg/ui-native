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

export const AlertIcon: React.FC<IconProps> = ({
  size = 'default',
  color,
  variant = 'solid',
  style,
}) => {
  const { colors } = useTheme();

  const getSizeValue = () => {
    switch (size) {
      case 'xs':
        return 16;
      case 'sm':
        return 20;
      case 'default':
        return 24;
      case 'lg':
        return 32;
      case 'xl':
        return 48;
      case '2xl':
        return 56;
      case '3xl':
        return 72;
      default:
        return 24;
    }
  };

  const sizeValue = getSizeValue();
  const iconColor = color || colors.destructive[100];

  return (
    <Svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" style={style}>
      <Path
        fill={iconColor}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7931 3.32699L20.673 11.2077C21.109 11.6437 21.109 12.3571 20.673 12.7923L12.7923 20.673C12.3563 21.109 11.6437 21.109 11.2077 20.673L3.32699 12.7923C2.891 12.3571 2.891 11.6437 3.32699 11.2077L11.2086 3.32699C11.6445 2.891 12.3571 2.891 12.7931 3.32699ZM11.2616 7.84378C11.2616 7.37794 11.6395 7 12.1054 7C12.5712 7 12.9491 7.3797 12.9491 7.84378V12.3439C12.9491 12.8098 12.5712 13.1877 12.137 13.1877C11.7028 13.1877 11.2616 12.8115 11.2616 12.3439V7.84378ZM12.1054 16.5628C11.495 16.5628 11 16.0678 11 15.4575C11 14.8472 11.4947 14.3521 12.1054 14.3521C12.7161 14.3521 13.2107 14.8472 13.2107 15.4575C13.2093 16.0671 12.7171 16.5628 12.1054 16.5628Z"
      />
    </Svg>
  );
}; 
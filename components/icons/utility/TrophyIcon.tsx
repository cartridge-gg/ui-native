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

export const TrophyIcon: React.FC<IconProps> = ({
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
  const iconColor = color || colors.foreground[100];

  return (
    <Svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" style={style}>
      {variant === 'solid' ? (
        <Path
          fill={iconColor}
          d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h2.284A2.25 2.25 0 0 0 8.977 24h6.046a2.25 2.25 0 0 0 2.248-2.25H19.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207A6.72 6.72 0 0 0 18.666 5.25Z"
        />
      ) : (
        <Path
          fill="none"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52a6.003 6.003 0 0 0 1.051 3.19c.433.749.997 1.32 1.565 1.729 1.283.9 2.15 2.165 2.312 3.792M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 0 1-1.051 3.19c-.433.749-.997 1.32-1.565 1.729-1.283.9-2.15 2.165-2.312 3.792M6.75 7.5l-.75.75m11.25-1.5l.75.75"
        />
      )}
    </Svg>
  );
};

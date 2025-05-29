import React from 'react';
import { Path, Rect } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const LaptopIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Rect x="4" y="6" width="16" height="10" rx="1" ry="1" fill="currentColor" />
          <Path d="M2 18H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V18Z" fill="currentColor" />
        </>
      ) : (
        <>
          <Rect x="4" y="6" width="16" height="10" rx="1" ry="1" stroke="currentColor" strokeWidth="2" fill="none" />
          <Path d="M2 18H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V18Z" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
      )}
    </BaseIcon>
  );
};

LaptopIcon.displayName = "LaptopIcon"; 
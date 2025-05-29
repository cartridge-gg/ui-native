import React from 'react';
import { Path, Rect } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const ChestIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Rect x="3" y="8" width="18" height="12" rx="2" ry="2" fill="currentColor" />
          <Path d="M7 8V6C7 4.34315 8.34315 3 10 3H14C15.6569 3 17 4.34315 17 6V8" fill="currentColor" />
          <Path d="M10 14H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <Rect x="3" y="8" width="18" height="12" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <Path d="M7 8V6C7 4.34315 8.34315 3 10 3H14C15.6569 3 17 4.34315 17 6V8" stroke="currentColor" strokeWidth="2" fill="none" />
          <Path d="M10 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </BaseIcon>
  );
};

ChestIcon.displayName = "ChestIcon"; 
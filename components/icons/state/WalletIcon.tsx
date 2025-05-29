import React from 'react';
import { Path, Rect, Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const WalletIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Rect x="2" y="6" width="20" height="12" rx="2" ry="2" fill="currentColor" />
          <Path d="M6 6V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V6" fill="currentColor" />
          <Circle cx="18" cy="12" r="2" fill="white" />
        </>
      ) : (
        <>
          <Rect x="2" y="6" width="20" height="12" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <Path d="M6 6V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V6" stroke="currentColor" strokeWidth="2" fill="none" />
          <Circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
      )}
    </BaseIcon>
  );
};

WalletIcon.displayName = "WalletIcon"; 
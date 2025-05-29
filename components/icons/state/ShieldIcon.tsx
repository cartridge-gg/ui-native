import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const ShieldIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <Path d="M12 2L3 7V13C3 17.55 6.84 21.74 9 22C11.16 21.74 21 17.55 21 13V7L12 2Z" fill="currentColor" />
      ) : (
        <Path d="M12 2L3 7V13C3 17.55 6.84 21.74 9 22C11.16 21.74 21 17.55 21 13V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
    </BaseIcon>
  );
};

ShieldIcon.displayName = "ShieldIcon"; 
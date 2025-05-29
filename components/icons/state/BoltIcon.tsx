import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const BoltIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
      ) : (
        <Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
    </BaseIcon>
  );
};

BoltIcon.displayName = "BoltIcon"; 
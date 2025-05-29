import React from 'react';
import { Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const CircleIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    </BaseIcon>
  );
};

CircleIcon.displayName = "CircleIcon"; 
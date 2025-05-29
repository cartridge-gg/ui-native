import React from 'react';
import { Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const SilverIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Circle cx="12" cy="12" r="10" fill="#C0C0C0" />
    </BaseIcon>
  );
};

SilverIcon.displayName = "SilverIcon"; 
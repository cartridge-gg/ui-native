import React from 'react';
import { Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const GoldIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Circle cx="12" cy="12" r="10" fill="#FFD700" />
    </BaseIcon>
  );
};

GoldIcon.displayName = "GoldIcon"; 
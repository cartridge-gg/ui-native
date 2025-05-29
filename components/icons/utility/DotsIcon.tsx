import React from 'react';
import { Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const DotsIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Circle cx="12" cy="12" r="1" fill="currentColor" />
      <Circle cx="19" cy="12" r="1" fill="currentColor" />
      <Circle cx="5" cy="12" r="1" fill="currentColor" />
    </BaseIcon>
  );
};

DotsIcon.displayName = "DotsIcon"; 
import React from 'react';
import { Rect } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const BronzeTagIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Rect x="2" y="8" width="20" height="8" rx="4" fill="#CD7F32" />
    </BaseIcon>
  );
};

BronzeTagIcon.displayName = "BronzeTagIcon"; 
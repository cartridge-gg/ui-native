import React from 'react';
import { Rect } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const CartridgeIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Rect x="4" y="6" width="16" height="12" rx="2" fill="currentColor" />
    </BaseIcon>
  );
};

CartridgeIcon.displayName = "CartridgeIcon"; 
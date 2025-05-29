import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const EthereumColorIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M12 2L5 12.5L12 16L19 12.5L12 2Z" fill="#627EEA" />
      <Path d="M12 17L5 13.5L12 22L19 13.5L12 17Z" fill="#627EEA" />
    </BaseIcon>
  );
};

EthereumColorIcon.displayName = "EthereumColorIcon"; 
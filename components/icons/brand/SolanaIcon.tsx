import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const SolanaIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M4 7.5C4 6.67157 4.67157 6 5.5 6H20.5C21.3284 6 22 6.67157 22 7.5C22 8.32843 21.3284 9 20.5 9H5.5C4.67157 9 4 8.32843 4 7.5Z" fill="#9945FF" />
      <Path d="M4 16.5C4 15.6716 4.67157 15 5.5 15H20.5C21.3284 15 22 15.6716 22 16.5C22 17.3284 21.3284 18 20.5 18H5.5C4.67157 18 4 17.3284 4 16.5Z" fill="#14F195" />
      <Path d="M4 12C4 11.1716 4.67157 10.5 5.5 10.5H20.5C21.3284 10.5 22 11.1716 22 12C22 12.8284 21.3284 13.5 20.5 13.5H5.5C4.67157 13.5 4 12.8284 4 12Z" fill="#9945FF" />
    </BaseIcon>
  );
};

SolanaIcon.displayName = "SolanaIcon"; 
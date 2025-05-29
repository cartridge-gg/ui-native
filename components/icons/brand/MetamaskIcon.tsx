import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const MetamaskIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M20.5 2.5L13.5 7.5L15 4.5L20.5 2.5Z" fill="#E17726" />
      <Path d="M3.5 2.5L10.4 7.6L9 4.5L3.5 2.5Z" fill="#E27625" />
      <Path d="M17.5 16.5L15.5 19.5L20 20.5L21 16.6L17.5 16.5Z" fill="#E27625" />
      <Path d="M3 16.6L4 20.5L8.5 19.5L6.5 16.5L3 16.6Z" fill="#E27625" />
      <Path d="M8.2 10.5L7 12.5L11.4 12.7L11.2 7.8L8.2 10.5Z" fill="#E27625" />
      <Path d="M15.8 10.5L12.7 7.7L12.6 12.7L17 12.5L15.8 10.5Z" fill="#E27625" />
      <Path d="M8.5 19.5L11.2 18.2L8.8 16.6L8.5 19.5Z" fill="#E27625" />
      <Path d="M12.8 18.2L15.5 19.5L15.2 16.6L12.8 18.2Z" fill="#E27625" />
    </BaseIcon>
  );
};

MetamaskIcon.displayName = "MetamaskIcon"; 
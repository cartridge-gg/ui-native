import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const WalletConnectIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M5.5 9C8.5 6 15.5 6 18.5 9L19.5 10C19.8 10.3 19.8 10.8 19.5 11.1L18.3 12.3C18.1 12.5 17.8 12.5 17.6 12.3L16.9 11.6C15.1 9.8 12.3 9.8 10.5 11.6L9.7 12.4C9.5 12.6 9.2 12.6 9 12.4L7.8 11.2C7.5 10.9 7.5 10.4 7.8 10.1L5.5 9Z" fill="#3B99FC" />
      <Path d="M21.2 13.8L22.2 14.8C22.5 15.1 22.5 15.6 22.2 15.9L16.9 21.2C16.6 21.5 16.1 21.5 15.8 21.2L12 17.4L8.2 21.2C7.9 21.5 7.4 21.5 7.1 21.2L1.8 15.9C1.5 15.6 1.5 15.1 1.8 14.8L2.8 13.8C3.1 13.5 3.6 13.5 3.9 13.8L12 21.9L20.1 13.8C20.4 13.5 20.9 13.5 21.2 13.8Z" fill="#3B99FC" />
    </BaseIcon>
  );
};

WalletConnectIcon.displayName = "WalletConnectIcon"; 
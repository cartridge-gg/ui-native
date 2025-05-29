import React from 'react';
import { Path, Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const TelegramIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Circle cx="12" cy="12" r="10" fill="#0088CC" />
      <Path d="M16.5 7.5L5.5 12L8.5 13L15 9L10 14L14 16.5L16.5 7.5Z" fill="white" />
    </BaseIcon>
  );
};

TelegramIcon.displayName = "TelegramIcon"; 
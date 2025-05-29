import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const MinusIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M20 13.712v-3.391H4v3.391h16Z" />
    </BaseIcon>
  );
};

MinusIcon.displayName = "MinusIcon"; 
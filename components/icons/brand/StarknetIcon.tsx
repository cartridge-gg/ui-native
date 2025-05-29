import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const StarknetIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M12 2L22 8V16L12 22L2 16V8L12 2Z" fill="#0C0C4F" />
      <Path d="M12 6L18 9.5V14.5L12 18L6 14.5V9.5L12 6Z" fill="#28286E" />
      <Path d="M12 10L15 11.5V13.5L12 15L9 13.5V11.5L12 10Z" fill="#EC796B" />
    </BaseIcon>
  );
};

StarknetIcon.displayName = "StarknetIcon"; 
import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const SlashIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} viewBox="0 0 15 15">
      <Path
        d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </BaseIcon>
  );
};

SlashIcon.displayName = "SlashIcon"; 
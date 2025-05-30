import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const PlusIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path
        d="M13 11V4H11V11H4V13H11V20H13V13H20V11H13Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
};

PlusIcon.displayName = "PlusIcon"; 
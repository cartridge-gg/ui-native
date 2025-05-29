import React from 'react';
import { Path, Rect } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const DeployerIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <Path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
  );
};

DeployerIcon.displayName = "DeployerIcon"; 
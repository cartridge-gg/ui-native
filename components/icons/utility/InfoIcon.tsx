import React from 'react';
import { Circle, Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const InfoIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Circle cx="12" cy="12" r="10" fill="currentColor" />
      <Path d="M12 16V12M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
  );
};

InfoIcon.displayName = "InfoIcon"; 
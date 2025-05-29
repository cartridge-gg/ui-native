import React from 'react';
import { Path, Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const SliderIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M3 7H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Path d="M15 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Path d="M3 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Path d="M15 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <Circle cx="12" cy="17" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
    </BaseIcon>
  );
};

SliderIcon.displayName = "SliderIcon"; 
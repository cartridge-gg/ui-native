import React from 'react';
import { Path, Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const TouchIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M9 3V12L6.5 9.5C6.1 9.1 5.5 9.1 5.1 9.5C4.7 9.9 4.7 10.5 5.1 10.9L9 14.8V21H15V14L18.9 10.1C19.3 9.7 19.3 9.1 18.9 8.7C18.5 8.3 17.9 8.3 17.5 8.7L15 11.2V3C15 2.4 14.6 2 14 2H10C9.4 2 9 2.4 9 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Circle cx="12" cy="6" r="1" fill="currentColor" />
    </BaseIcon>
  );
};

TouchIcon.displayName = "TouchIcon"; 
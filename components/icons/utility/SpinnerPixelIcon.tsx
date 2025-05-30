import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const SpinnerPixelIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path 
        d="M13 5h2v2h-2z" 
        fill="currentColor" 
        opacity="0.75" 
      />
      <Path
        d="M9 5h2v2H9V5ZM11 5h2v2h-2V5ZM7 7h2v2H7V7ZM5 9h2v2H5V9ZM5 11h2v2H5v-2ZM5 13h2v2H5v-2ZM7 15h2v2H7v-2Z"
        fill="currentColor"
      />
      <Path 
        d="M9 17h2v2H9z" 
        fill="currentColor" 
        opacity="0.5" 
      />
    </BaseIcon>
  );
};

SpinnerPixelIcon.displayName = "SpinnerPixelIcon"; 
import React from 'react';
import { Circle, Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const EyeIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" fill="currentColor" />
          <Circle cx="12" cy="12" r="3" fill="white" />
        </>
      ) : (
        <>
          <Path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
      )}
    </BaseIcon>
  );
};

EyeIcon.displayName = "EyeIcon"; 
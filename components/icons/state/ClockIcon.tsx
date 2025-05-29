import React from 'react';
import { Circle, Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const ClockIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Circle cx="12" cy="12" r="10" fill="currentColor" />
          <Path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <Circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <Path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </BaseIcon>
  );
};

ClockIcon.displayName = "ClockIcon"; 
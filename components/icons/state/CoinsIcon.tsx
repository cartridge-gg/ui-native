import React from 'react';
import { Circle, Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const CoinsIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Circle cx="8" cy="8" r="6" fill="currentColor" />
          <Circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.8" />
        </>
      ) : (
        <>
          <Circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
          <Circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
      )}
    </BaseIcon>
  );
};

CoinsIcon.displayName = "CoinsIcon"; 
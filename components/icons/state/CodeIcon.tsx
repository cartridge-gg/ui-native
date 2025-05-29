import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const CodeIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <Path d="M16 18L22 12L16 6M8 6L2 12L8 18" fill="currentColor" />
      ) : (
        <Path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
    </BaseIcon>
  );
};

CodeIcon.displayName = "CodeIcon"; 
import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const FilterIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <Path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" fill="currentColor" />
      ) : (
        <Path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
    </BaseIcon>
  );
};

FilterIcon.displayName = "FilterIcon"; 
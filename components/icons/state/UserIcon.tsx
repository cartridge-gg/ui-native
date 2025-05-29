import React from 'react';
import { Path, Circle } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const UserIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Circle cx="12" cy="8" r="5" fill="currentColor" />
          <Path d="M20 21C20 16.0294 16.4183 12 12 12C7.58172 12 4 16.0294 4 21" fill="currentColor" />
        </>
      ) : (
        <>
          <Circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
          <Path d="M20 21C20 16.0294 16.4183 12 12 12C7.58172 12 4 16.0294 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      )}
    </BaseIcon>
  );
};

UserIcon.displayName = "UserIcon"; 
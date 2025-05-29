import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const WarningIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <Path d="M10.29 3.86L1.82 18A2 2 0 003.64 21H20.36A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86ZM12 9V13M12 17H12.01" fill="currentColor" />
      ) : (
        <>
          <Path d="M10.29 3.86L1.82 18A2 2 0 003.64 21H20.36A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Path d="M12 9V13M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </BaseIcon>
  );
};

WarningIcon.displayName = "WarningIcon"; 
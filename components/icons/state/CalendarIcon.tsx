import React from 'react';
import { Path, Rect } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const CalendarIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="currentColor" />
          <Path d="M16 2V6M8 2V6M3 10H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <Path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </BaseIcon>
  );
};

CalendarIcon.displayName = "CalendarIcon"; 
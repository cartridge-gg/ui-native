import React from 'react';
import { Rect } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { StateIconProps } from '../types';

export const GridIcon: React.FC<StateIconProps> = ({ variant = 'solid', ...props }) => {
  return (
    <BaseIcon {...props}>
      {variant === 'solid' ? (
        <>
          <Rect x="3" y="3" width="7" height="7" fill="currentColor" />
          <Rect x="14" y="3" width="7" height="7" fill="currentColor" />
          <Rect x="3" y="14" width="7" height="7" fill="currentColor" />
          <Rect x="14" y="14" width="7" height="7" fill="currentColor" />
        </>
      ) : (
        <>
          <Rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none" />
          <Rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none" />
          <Rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none" />
          <Rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
      )}
    </BaseIcon>
  );
};

GridIcon.displayName = "GridIcon"; 
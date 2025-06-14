import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const TimesIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Path d="M18.656 17.212c.41.41.41 1.073 0 1.481a1.052 1.052 0 0 1-1.485 0L12 13.5l-5.207 5.193a1.052 1.052 0 0 1-1.485 0 1.045 1.045 0 0 1 0-1.481l5.208-5.191-5.21-5.232a1.045 1.045 0 0 1 0-1.481 1.052 1.052 0 0 1 1.485 0l5.209 5.233 5.207-5.192a1.052 1.052 0 0 1 1.485 0c.41.408.41 1.072 0 1.48l-5.209 5.192 5.172 5.192Z" />
    </BaseIcon>
  );
};

TimesIcon.displayName = "TimesIcon"; 
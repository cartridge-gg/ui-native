import React from 'react';
import { Circle, Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { IconProps } from '../types';

export const CreditsIcon: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props}>
      <Circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <Path d="M9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 12.1193 9.5 13.5C9.5 14.8807 10.6193 16 12 16C13.3807 16 14.5 14.8807 14.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M12 4V6M12 18V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
  );
};

CreditsIcon.displayName = "CreditsIcon"; 
import React from 'react';
import { CheckboxCheckedIcon } from '../utility/CheckboxCheckedIcon';
import { CheckboxUncheckedIcon } from '../utility/CheckboxUncheckedIcon';
import { IconProps } from '../types';

export interface CheckboxIconProps extends IconProps {
  variant?: 'solid' | 'line' | 'unchecked-solid' | 'unchecked-line';
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({ 
  variant = 'solid', 
  ...props 
}) => {
  switch (variant) {
    case 'solid':
    case 'line':
      return <CheckboxCheckedIcon {...props} />;
    case 'unchecked-solid':
    case 'unchecked-line':
      return <CheckboxUncheckedIcon {...props} />;
    default:
      return <CheckboxCheckedIcon {...props} />;
  }
};

CheckboxIcon.displayName = "CheckboxIcon";
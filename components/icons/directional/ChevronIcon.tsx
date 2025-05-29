import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { DirectionalIconProps } from '../types';

export const ChevronIcon: React.FC<DirectionalIconProps> = ({ variant, ...props }) => {
  const getPath = () => {
    switch (variant) {
      case "up":
        return "m8 13.6 4-4 4 4v.8H8v-.8Z";
      case "right":
        return "m10.4 8 4 4-4 4h-.8V8h.8Z";
      case "down":
        return "m16 10.4-4 4-4-4v-.8h8v.8Z";
      case "left":
        return "m13.6 16-4-4 4-4h.8v8h-.8Z";
      default:
        return "m16 10.4-4 4-4-4v-.8h8v.8Z";
    }
  };

  return (
    <BaseIcon {...props}>
      <Path d={getPath()} />
    </BaseIcon>
  );
};

ChevronIcon.displayName = "ChevronIcon"; 
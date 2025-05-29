import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { DirectionalIconProps } from '../types';

export const ArrowIcon: React.FC<DirectionalIconProps> = ({ variant, ...props }) => {
  const getPath = () => {
    switch (variant) {
      case "up":
        return "M12 4L8 8H11V16H13V8H16L12 4Z";
      case "right":
        return "M20 12L16 8V11H8V13H16V16L20 12Z";
      case "down":
        return "M12 20L16 16H13V8H11V16H8L12 20Z";
      case "left":
        return "M4 12L8 16V13H16V11H8V8L4 12Z";
      default:
        return "M12 20L16 16H13V8H11V16H8L12 20Z";
    }
  };

  return (
    <BaseIcon {...props}>
      <Path d={getPath()} fill="currentColor" />
    </BaseIcon>
  );
};

ArrowIcon.displayName = "ArrowIcon"; 
import React from 'react';
import { Path } from 'react-native-svg';
import { BaseIcon } from '../BaseIcon';
import { DirectionalIconProps } from '../types';

export const CaratIcon: React.FC<DirectionalIconProps> = ({ variant, ...props }) => {
  const renderPath = () => {
    switch (variant) {
      case "up":
        return <Path d="m8 13.6 4-4 4 4v.8H8v-.8Z" fill="currentColor" />;
      case "right":
        return <Path d="m10.4 8 4 4-4 4h-.8V8h.8Z" fill="currentColor" />;
      case "down":
        return <Path d="m16 10.4-4 4-4-4v-.8h8v.8Z" fill="currentColor" />;
      case "left":
        return <Path d="m13.6 16-4-4 4-4h.8v8h-.8Z" fill="currentColor" />;
      default:
        return <Path d="m8 13.6 4-4 4 4v.8H8v-.8Z" fill="currentColor" />;
    }
  };

  return (
    <BaseIcon {...props}>
      {renderPath()}
    </BaseIcon>
  );
};

CaratIcon.displayName = "CaratIcon"; 
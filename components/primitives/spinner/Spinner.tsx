import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SpinnerIcon } from '../../icons/utility/SpinnerIcon';
import { IconProps } from '../../icons/types';

export interface SpinnerProps extends IconProps {
  duration?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'default', 
  color, 
  style,
  duration = 1000,
  ...props 
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue, duration]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[{ transform: [{ rotate }] }, style]}>
      <SpinnerIcon size={size} color={color} {...props} />
    </Animated.View>
  );
};

Spinner.displayName = 'Spinner'; 
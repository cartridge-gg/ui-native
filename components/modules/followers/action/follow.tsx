import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Button } from '../../../primitives/button/Button';

export interface FollowerFollowProps {
  loading?: boolean;
  disabled?: boolean;
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
  style?: ViewStyle;
  onPress?: () => void;
}

export const FollowerFollow: React.FC<FollowerFollowProps> = ({
  variant = 'default',
  loading = false,
  disabled = false,
  style,
  onPress,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: colors.background[300],
        };
      default:
        return {
          backgroundColor: colors.background[300],
        };
    }
  };

  const styles = StyleSheet.create({
    button: {
      width: 88, // w-[88px]
      height: 32, // h-8
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: 4, // rounded
      ...getVariantStyles(),
    },
  });

  return (
    <Button
      isLoading={loading}
      disabled={disabled}
      variant="secondary"
      style={[styles.button, style]}
      onPress={onPress}
    >
      Follow
    </Button>
  );
};

export default FollowerFollow;
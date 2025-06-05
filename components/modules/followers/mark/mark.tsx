import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { UserIcon } from '../../../icons/state/UserIcon'; // Using as UserCheckIcon fallback

export interface FollowerMarkProps {
  active?: boolean;
  variant?: 'default';
  style?: ViewStyle;
}

export const FollowerMark: React.FC<FollowerMarkProps> = ({
  active = false,
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      default:
        return {
          backgroundColor: 'transparent',
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      height: 24, // h-6
      width: 28, // w-7
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4, // rounded
      display: active ? 'flex' : 'none', // hidden data-[active=true]:flex
      ...getVariantStyles(),
    },
  });

  const getIconColor = () => {
    if (active) {
      return colors.foreground[100];
    }
    return colors.background[400];
  };

  return (
    <View style={[styles.container, style]}>
      <UserIcon 
        variant="solid" 
        size="sm" 
        color={getIconColor()}
      />
    </View>
  );
};

export default FollowerMark;
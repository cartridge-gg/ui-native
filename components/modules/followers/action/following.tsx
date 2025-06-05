import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';

export interface FollowerFollowingProps {
  variant?: 'darkest' | 'darker' | 'dark' | 'default' | 'light' | 'lighter' | 'lightest' | 'ghost';
  style?: ViewStyle;
}

export const FollowerFollowing: React.FC<FollowerFollowingProps> = ({
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          borderColor: colors.background[300],
          backgroundColor: colors.background[200],
        };
      default:
        return {
          borderColor: colors.background[300],
          backgroundColor: colors.background[200],
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: 88, // w-[88px]
      height: 32, // h-8
      borderWidth: 1,
      borderRadius: 4, // rounded
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...getVariantStyles(),
    },
    text: {
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      color: colors.foreground[300],
    } as TextStyle,
  });

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>Following</Text>
    </View>
  );
};

export default FollowerFollowing;
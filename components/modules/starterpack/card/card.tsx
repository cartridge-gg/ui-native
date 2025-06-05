import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { GiftIcon } from '../../../icons/utility/GiftIcon';
import { CheckIcon } from '../../../icons/state/CheckIcon';

export interface StarterpackCardProps {
  item: string;
  isClaimed?: boolean;
  style?: ViewStyle;
}

export const StarterpackCard: React.FC<StarterpackCardProps> = ({
  item,
  isClaimed = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8, // py-2
      paddingHorizontal: 12, // px-3
      backgroundColor: colors.background[200],
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12, // gap-3
    },
    iconContainer: {
      backgroundColor: colors.background[300],
      borderRadius: 12, // rounded-full
      padding: 2, // p-0.5
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemText: {
      fontWeight: '500', // font-medium
      fontSize: 14, // text-sm
      color: isClaimed ? colors.foreground[400] : colors.foreground[100],
    } as TextStyle,
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {isClaimed ? (
            <CheckIcon 
              size="sm" 
              variant="solid"
              color={colors.foreground[400]}
            />
          ) : (
            <GiftIcon 
              size="sm" 
              color={colors.foreground[100]}
            />
          )}
        </View>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    </View>
  );
};

export default StarterpackCard;
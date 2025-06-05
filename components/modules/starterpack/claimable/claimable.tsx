import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { Card } from '../../../primitives/card/Card';
import { StarterpackCard } from '../card/card';

export interface StarterpackClaimableProps {
  items: Array<string>;
  isClaimed?: boolean;
  style?: ViewStyle;
}

export const StarterpackClaimable: React.FC<StarterpackClaimableProps> = ({
  items,
  isClaimed = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    cardContainer: {
      overflow: 'hidden',
    },
    header: {
      paddingVertical: 10, // py-2.5
      paddingHorizontal: 12, // px-3
      backgroundColor: colors.background[100],
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    titleText: {
      textTransform: 'none', // normal-case
      fontWeight: '600', // font-semibold
      fontSize: 12, // text-xs
      color: colors.foreground[100],
    } as TextStyle,
    countBadge: {
      backgroundColor: colors.background[300],
      paddingVertical: 2, // py-0.5
      paddingHorizontal: 6, // px-1.5
      borderRadius: 12, // rounded-full
    },
    countText: {
      fontSize: 12, // text-xs
      color: colors.foreground[300],
    } as TextStyle,
    content: {
      flexDirection: 'column',
    },
  });

  return (
    <Card style={[styles.cardContainer, style]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.titleText}>
            {isClaimed ? "Claimed" : "Claimable"}
          </Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {items.length} total
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {items.map((item, i) => (
          <StarterpackCard 
            key={i} 
            item={item} 
            isClaimed={isClaimed} 
          />
        ))}
      </View>
    </Card>
  );
};

export default StarterpackClaimable;
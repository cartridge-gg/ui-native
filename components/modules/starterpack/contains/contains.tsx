import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Image } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { Card } from '../../../primitives/card/Card';

export interface StarterItemData {
  title: string;
  description: string;
  image: string;
}

export interface StarterpackContainsProps {
  title?: string;
  items: StarterItemData[];
  style?: ViewStyle;
}

export const StarterpackContains: React.FC<StarterpackContainsProps> = ({
  title,
  items,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    cardContainer: {
      overflow: 'hidden',
    },
    header: {
      paddingVertical: 12, // Standard card header padding
      paddingHorizontal: 16,
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
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12, // p-3
      backgroundColor: colors.background[200],
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12, // gap-3
    },
    itemImage: {
      width: 32, // size-8
      height: 32, // size-8
      borderRadius: 4,
    },
    itemTextContainer: {
      flexDirection: 'column',
      gap: 2, // gap-0.5
    },
    itemTitle: {
      color: colors.foreground[100],
      fontWeight: '500', // font-medium
      fontSize: 14, // text-sm
    } as TextStyle,
    itemDescription: {
      color: colors.foreground[300],
      fontWeight: '400', // font-normal
      fontSize: 12, // text-xs
    } as TextStyle,
  });

  return (
    <Card style={[styles.cardContainer, style]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.titleText}>
            {title ?? "Contains"}
          </Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {items.length} total
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>
                  {item.title}
                </Text>
                <Text style={styles.itemDescription}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};

export default StarterpackContains;
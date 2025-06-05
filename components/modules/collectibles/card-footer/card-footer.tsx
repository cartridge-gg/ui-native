import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';

export interface CollectibleCardFooterProps {
  price?: string;
  lastSale?: string;
  variant?: 'default' | 'faded';
  style?: ViewStyle;
}

export const CollectibleCardFooter: React.FC<CollectibleCardFooterProps> = ({
  price,
  lastSale,
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const isHidden = !price && !lastSale;

  const getVariantStyles = () => {
    switch (variant) {
      case 'faded':
        return {
          backgroundColor: colors.background[100],
          // group-hover:bg-background-200 would need hover state management
        };
      default:
        return {
          backgroundColor: colors.background[200],
          // group-hover:bg-background-300 would need hover state management
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 12, // px-3
      paddingVertical: 8, // py-2
      flexDirection: 'column',
      gap: 2, // gap-0.5
      display: isHidden ? 'none' : 'flex',
      ...getVariantStyles(),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 10,
      lineHeight: 12, // text-[10px]/3
      color: colors.foreground[400],
    },
    valuesRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    valueText: {
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      color: colors.foreground[400],
    },
    priceText: {
      fontSize: 14,
      fontWeight: '500',
      color: price ? colors.foreground[100] : colors.foreground[400],
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Last Sale</Text>
      </View>
      <View style={styles.valuesRow}>
        <Text style={styles.priceText}>
          {price ? price : "--"}
        </Text>
        <Text style={styles.valueText}>
          {lastSale ? lastSale : "--"}
        </Text>
      </View>
    </View>
  );
};

export default CollectibleCardFooter;
import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { CollectibleCardFooter } from '../card-footer/card-footer';
import { CollectiblePreview } from '../preview/preview';
import { CollectibleHeader } from '../header/header';

export interface CollectibleCardProps {
  title: string;
  image: string;
  icon?: string;
  totalCount?: number;
  listingCount?: number;
  price?: string;
  lastSale?: string;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  variant?: 'default' | 'faded';
  style?: ViewStyle;
}

export const CollectibleCard: React.FC<CollectibleCardProps> = ({
  title,
  image,
  icon,
  totalCount,
  listingCount,
  price,
  lastSale,
  selectable = true,
  selected = false,
  onSelect,
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1, // grow
      borderRadius: 8, // rounded
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: selected ? colors.foreground[100] : 'transparent',
      // group styles would need hover state management
    },
  });

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onSelect}
    >
      <CollectibleHeader
        title={title}
        icon={icon}
        selectable={!selected && selectable}
        selected={selected}
        onSelect={onSelect}
        variant={variant}
      />
      <CollectiblePreview
        image={image}
        size="sm"
        totalCount={totalCount}
        listingCount={listingCount}
      />
      <CollectibleCardFooter
        price={price}
        lastSale={lastSale}
        variant={variant}
      />
    </Pressable>
  );
};

export default CollectibleCard;
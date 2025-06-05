import React, { useCallback } from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { Text } from '../../../typography/Text';
import { CheckboxIcon } from '../../../icons/state/CheckboxIcon';
import { Thumbnail } from '../../../modules/thumbnails/thumbnail/Thumbnail';

export interface CollectibleHeaderProps {
  title: string;
  icon?: string | null;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  variant?: 'default' | 'faded';
  style?: ViewStyle;
}

export const CollectibleHeader: React.FC<CollectibleHeaderProps> = ({
  title,
  icon,
  selectable = false,
  selected = false,
  onSelect,
  variant = 'default',
  style,
}) => {
  const { colors } = useTheme();

  const handlePress = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      onSelect?.();
    },
    [onSelect],
  );

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
      height: 36, // h-9 = 36px
      position: 'relative',
      flexDirection: 'row',
      gap: 8, // gap-2 = 8px
      paddingHorizontal: 6, // px-1.5 = 6px
      paddingVertical: 6, // py-1.5 = 6px
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      ...getVariantStyles(),
      // icon === undefined padding handling
      paddingLeft: icon === undefined ? 10 : 6, // pl-2.5 when no icon
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6, // gap-1.5 = 6px
      flex: 1,
      overflow: 'hidden',
    },
    title: {
      color: colors.foreground[100],
      fontSize: 14,
      fontWeight: '500',
      paddingRight: (selected || selectable) ? 24 : 0, // pr-6 = 24px
      paddingLeft: icon === undefined ? 10 : 0, // pl-2.5 when no icon
    },
    thumbnail: {
      display: icon === undefined ? 'none' : 'flex',
    },
    checkboxContainer: {
      position: 'absolute',
      right: 9, // right-[9px]
      top: '50%',
      transform: [{ translateY: -12 }], // -translate-y-1/2 (approximate)
    },
    selectedCheckbox: {
      // text-foreground-100 is already handled by color prop
    },
    selectableCheckbox: {
      // text-background-500 hover:text-foreground-200 would need hover state
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.contentRow}>
        <Thumbnail
          variant="light"
          size="sm"
          icon={icon === null ? undefined : icon}
          style={styles.thumbnail}
        />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {selected && (
        <Pressable
          style={styles.checkboxContainer}
          onPress={handlePress}
        >
          <CheckboxIcon 
            variant="line" 
            size="sm" 
            color={colors.foreground[100]}
          />
        </Pressable>
      )}
      {selectable && !selected && (
        <Pressable
          style={styles.checkboxContainer}
          onPress={handlePress}
        >
          <CheckboxIcon 
            variant="unchecked-line" 
            size="sm" 
            color={colors.background[500]}
          />
        </Pressable>
      )}
    </View>
  );
};

export default CollectibleHeader;
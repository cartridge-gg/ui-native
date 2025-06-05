import React, { useMemo } from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageBackground } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { CollectibleTag } from '../tag/tag';
import { GemIcon } from '../../../icons/state/GemIcon'; // Using GemIcon as substitute for StackDiamondIcon
import { TagIcon } from '../../../icons/state/TagIcon';

// Placeholder image - you might want to replace with actual asset
const PLACEHOLDER = 'https://via.placeholder.com/128x128/666666/ffffff?text=No+Image';

export interface CollectiblePreviewProps {
  image: string;
  totalCount?: number;
  listingCount?: number;
  variant?: 'default';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const CollectiblePreview: React.FC<CollectiblePreviewProps> = ({
  image,
  totalCount,
  listingCount,
  variant = 'default',
  size = 'md',
  style,
}) => {
  const { colors } = useTheme();

  const uri = useMemo(() => {
    if (!image) return PLACEHOLDER;
    return image;
  }, [image]);

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: 8, height: 128 }; // p-2 h-[128px]
      case 'lg':
        return { padding: 8, height: 200, borderRadius: 8 }; // p-2 h-[200px] rounded-lg
      default:
        return { padding: 8, height: 128 }; // p-2 h-[128px]
    }
  };

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      flexShrink: 0, // shrink-0
      ...getSizeStyles(),
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.75,
      // group-hover:opacity-100 would need hover state management
    },
    backgroundBlur: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.64)',
    },
    mainImage: {
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'relative',
      // group-hover:scale-[1.02] would need hover state management
    },
    tagsContainer: {
      position: 'absolute',
      bottom: 6, // bottom-1.5
      left: 6, // left-1.5
      flexDirection: 'row',
      gap: 4, // gap-1
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
  });

  return (
    <View style={[styles.container, style]}>
      {/* Background blurred image */}
      <Image
        source={{ uri }}
        style={styles.backgroundImage}
        blurRadius={8} // blur-[8px]
        resizeMode="cover"
      />
      <View style={styles.backgroundBlur} />

      {/* Main image */}
      <Image
        source={{ uri: image || PLACEHOLDER }}
        style={styles.mainImage}
        onError={() => {
          // Handle error - React Native doesn't allow dynamic source changes in onError
          console.warn('Failed to load collectible image:', image);
        }}
        resizeMode="contain"
      />

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {!!totalCount && (
          <CollectibleTag label={`${totalCount}`}>
            <GemIcon variant="solid" size="sm" />
          </CollectibleTag>
        )}
        {!!listingCount && (
          <CollectibleTag label={`${listingCount}`}>
            <TagIcon variant="solid" size="sm" />
          </CollectibleTag>
        )}
      </View>
    </View>
  );
};

export default CollectiblePreview;
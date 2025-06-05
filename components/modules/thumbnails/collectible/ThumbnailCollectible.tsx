import React from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';
import { Thumbnail, ThumbnailVariant, ThumbnailSize } from '../thumbnail/Thumbnail';
import { useTheme } from '../../../theme/ThemeProvider';

// Placeholder image - you might want to replace with actual asset
const PLACEHOLDER = 'https://via.placeholder.com/400x400/666666/ffffff?text=No+Image';

export interface ThumbnailCollectibleProps {
  image: string;
  subIcon?: React.ReactNode;
  error?: boolean;
  loading?: boolean;
  variant?: ThumbnailVariant;
  size?: ThumbnailSize;
  style?: any;
}

export const ThumbnailCollectible: React.FC<ThumbnailCollectibleProps> = ({
  image,
  subIcon,
  error = false,
  loading = false,
  variant = 'default',
  size = 'md',
  style,
}) => {
  const { colors } = useTheme();

  const getBorderStyles = () => {
    const borderStyles = { borderWidth: 2, borderColor: 'transparent' };
    
    switch (size) {
      case 'xs':
      case 'sm':
        return { ...borderStyles, borderWidth: 2, padding: 1 };
      case 'md':
        return { ...borderStyles, borderWidth: 2, padding: 2 };
      case 'lg':
      case 'xl':
        return { ...borderStyles, borderWidth: 3, padding: 2 };
      default:
        return { ...borderStyles, borderWidth: 2, padding: 2 };
    }
  };

  const borderStyles = getBorderStyles();

  // If error or loading, use the base Thumbnail without special styling
  if (error || loading) {
    return (
      <Thumbnail
        icon={image}
        subIcon={subIcon}
        error={error}
        loading={loading}
        variant={variant}
        size={size}
        style={[{ borderWidth: 0 }, style]}
      />
    );
  }

  const createCollectibleIcon = () => (
    <View style={styles.iconWrapper}>
      {/* Blurred background */}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={{ uri: image || PLACEHOLDER }}
          style={styles.blurredBackground}
          imageStyle={{ borderRadius: 4 }}
          onError={() => {
            // Fallback to placeholder on error
          }}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>
      
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
    </View>
  );

  return (
    <Thumbnail
      icon={createCollectibleIcon()}
      subIcon={subIcon}
      error={false}
      loading={false}
      variant={variant}
      size={size}
      style={[borderStyles, style]}
    />
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 4,
  },
  blurredBackground: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.64)', // Linear gradient overlay effect
    borderRadius: 4,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    zIndex: 10,
    borderRadius: 4,
  },
});

export default ThumbnailCollectible;
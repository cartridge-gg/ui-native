import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Image } from 'react-native';
import { AspectRatio } from './aspect-ratio';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';

const meta: Meta<typeof AspectRatio> = {
  title: 'Primitives/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Placeholder component for demonstration
const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => {
  const { colors } = useTheme();
  
  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor: colors.background[200],
        borderWidth: 2,
        borderColor: colors.border[200],
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <Text variant="sans-semibold-14" style={{ textAlign: 'center', color: colors.foreground[400] }}>
        {label}
      </Text>
    </View>
  );
};

export const Default: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <AspectRatio ratio={16/9}>
        <PlaceholderContent label="16:9 Aspect Ratio" />
      </AspectRatio>
    </View>
  ),
};

export const Square: Story = {
  render: () => (
    <View style={{ width: 200 }}>
      <AspectRatio ratio={1}>
        <PlaceholderContent label="1:1 Square" />
      </AspectRatio>
    </View>
  ),
};

export const Portrait: Story = {
  render: () => (
    <View style={{ width: 150 }}>
      <AspectRatio ratio={9/16}>
        <PlaceholderContent label="9:16 Portrait" />
      </AspectRatio>
    </View>
  ),
};

export const WithImage: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <AspectRatio ratio={16/9}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/800x450' }}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
          resizeMode="cover"
        />
      </AspectRatio>
    </View>
  ),
};

export const MultipleRatios: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <AspectRatio ratio={21/9}>
        <PlaceholderContent label="21:9 Ultra Wide" />
      </AspectRatio>
      
      <AspectRatio ratio={16/9}>
        <PlaceholderContent label="16:9 Widescreen" />
      </AspectRatio>
      
      <AspectRatio ratio={4/3}>
        <PlaceholderContent label="4:3 Standard" />
      </AspectRatio>
      
      <AspectRatio ratio={1}>
        <PlaceholderContent label="1:1 Square" />
      </AspectRatio>
      
      <AspectRatio ratio={3/4}>
        <PlaceholderContent label="3:4 Portrait" />
      </AspectRatio>
    </View>
  ),
};

export const VideoPlayer: Story = {
  render: () => {
    const { colors } = useTheme();
    
    return (
      <View style={{ width: 350 }}>
        <AspectRatio ratio={16/9}>
          <View 
            style={{ 
              flex: 1, 
              backgroundColor: colors.background[500],
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View 
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.background[100],
                opacity: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 20,
                  borderTopWidth: 15,
                  borderBottomWidth: 15,
                  borderLeftColor: colors.foreground[400],
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  marginLeft: 5,
                }}
              />
            </View>
            <Text 
              variant="caption" 
              style={{ 
                color: colors.foreground[400], 
                marginTop: 12,
                opacity: 0.8,
              }}
            >
              Video Player (16:9)
            </Text>
          </View>
        </AspectRatio>
      </View>
    );
  },
}; 
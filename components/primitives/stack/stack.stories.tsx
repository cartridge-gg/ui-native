import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Stack, VStack, HStack } from './stack';
import { Text } from '../../typography/Text';
import { Button } from '../button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../card/Card';
import { useTheme } from '../../theme/ThemeProvider';

const meta: Meta<typeof Stack> = {
  title: 'Primitives/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ label }: { label: string }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: colors.background[200],
        borderRadius: 4,
        alignItems: 'center',
      }}
    >
      <Text variant="body">{label}</Text>
    </View>
  );
};

export const Default: Story = {
  render: () => (
    <Stack>
      <Box label="Item 1" />
      <Box label="Item 2" />
      <Box label="Item 3" />
    </Stack>
  ),
};

export const Spacing: Story = {
  render: () => {
    const { colors } = useTheme();
    return (
      <Stack spacing="lg">
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Extra Small (xs)</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack spacing="xs">
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Stack>
          </View>
        </View>
        
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Small (sm)</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack spacing="sm">
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Stack>
          </View>
        </View>
        
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Medium (md) - default</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack spacing="md">
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Stack>
          </View>
        </View>
        
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Large (lg)</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack spacing="lg">
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Stack>
          </View>
        </View>
        
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Extra Large (xl)</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack spacing="xl">
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Stack>
          </View>
        </View>
      </Stack>
    );
  },
};

export const Direction: Story = {
  render: () => {
    const { colors } = useTheme();
    return (
      <Stack spacing="lg">
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Vertical Stack (default)</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack direction="vertical" spacing="sm">
              <Box label="Item 1" />
              <Box label="Item 2" />
              <Box label="Item 3" />
            </Stack>
          </View>
        </View>
        
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Horizontal Stack</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack direction="horizontal" spacing="sm">
              <Box label="1" />
              <Box label="2" />
              <Box label="3" />
            </Stack>
          </View>
        </View>
      </Stack>
    );
  },
};

export const ConvenienceComponents: Story = {
  render: () => {
    const { colors } = useTheme();
    return (
      <Stack spacing="lg">
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>VStack Component</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <VStack spacing="sm">
              <Box label="Vertical 1" />
              <Box label="Vertical 2" />
              <Box label="Vertical 3" />
            </VStack>
          </View>
        </View>
        
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>HStack Component</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <HStack spacing="sm">
              <Box label="H1" />
              <Box label="H2" />
              <Box label="H3" />
            </HStack>
          </View>
        </View>
      </Stack>
    );
  },
};

export const Alignment: Story = {
  render: () => {
    const { colors } = useTheme();
    return (
      <Stack spacing="lg">
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Align Start</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack align="start" spacing="sm">
              <Box label="Short" />
              <Box label="Medium length item" />
              <Box label="This is a very long item" />
            </Stack>
          </View>
        </View>
        
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Align Center</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack align="center" spacing="sm">
              <Box label="Short" />
              <Box label="Medium length item" />
              <Box label="This is a very long item" />
            </Stack>
          </View>
        </View>
        
        <View>
          <Text variant="label" style={{ marginBottom: 8 }}>Align End</Text>
          <View style={{ backgroundColor: colors.background[100], padding: 8, borderRadius: 4 }}>
            <Stack align="end" spacing="sm">
              <Box label="Short" />
              <Box label="Medium length item" />
              <Box label="This is a very long item" />
            </Stack>
          </View>
        </View>
      </Stack>
    );
  },
};

export const RealWorldExample: Story = {
  render: () => (
    <Stack spacing="lg">
      <Card>
        <CardHeader>
          <CardTitle>Form Example</CardTitle>
        </CardHeader>
        <CardContent>
          <VStack spacing="md">
            <View>
              <Text variant="label" style={{ marginBottom: 4 }}>Name</Text>
              <View style={{ height: 40, backgroundColor: '#1a1a1a', borderRadius: 4 }} />
            </View>
            <View>
              <Text variant="label" style={{ marginBottom: 4 }}>Email</Text>
              <View style={{ height: 40, backgroundColor: '#1a1a1a', borderRadius: 4 }} />
            </View>
            <View>
              <Text variant="label" style={{ marginBottom: 4 }}>Message</Text>
              <View style={{ height: 80, backgroundColor: '#1a1a1a', borderRadius: 4 }} />
            </View>
            <HStack spacing="sm" align="center" style={{ justifyContent: 'flex-end' }}>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Submit</Button>
            </HStack>
          </VStack>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <HStack spacing="md" align="center">
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#6de27c' }} />
            <VStack spacing="xs" style={{ flex: 1 }}>
              <Text variant="sans-semibold-14">User Profile</Text>
              <Text variant="caption" style={{ color: '#9c9c9c' }}>
                This example shows nested stacks
              </Text>
            </VStack>
            <Button variant="tertiary">View</Button>
          </HStack>
        </CardContent>
      </Card>
    </Stack>
  ),
}; 
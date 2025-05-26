import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardListContent,
  CardListItem,
  CardHeaderRight
} from './Card';
import { Text } from '../../typography/Text';
import { Button } from '../button/Button';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description that explains what this card is about.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This is the main content of the card. It can contain any React Native components.</Text>
      </CardContent>
    </Card>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Card style={{ width: 300 }}>
      <CardHeader icon="🎮">
        <CardTitle>Game Card</CardTitle>
        <CardDescription>A card with an icon in the header</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This card demonstrates how icons work in the header.</Text>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderRight: Story = {
  render: () => (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your preferences</CardDescription>
        <CardHeaderRight>
          <Button title="Edit" variant="secondary" />
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <Text>Card content with action button in header.</Text>
      </CardContent>
    </Card>
  ),
};

export const ListCard: Story = {
  render: () => (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <CardTitle>Menu Items</CardTitle>
      </CardHeader>
      <CardListContent>
        <CardListItem icon="🏠">
          <Text>Home</Text>
          <Text color="tertiary">Navigate to home</Text>
        </CardListItem>
        <CardListItem icon="⚙️">
          <Text>Settings</Text>
          <Text color="tertiary">App preferences</Text>
        </CardListItem>
        <CardListItem icon="👤">
          <Text>Profile</Text>
          <Text color="tertiary">User information</Text>
        </CardListItem>
      </CardListContent>
    </Card>
  ),
};

export const ComplexCard: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card style={{ width: 300 }}>
        <CardHeader icon="🎯">
          <CardTitle>Achievement</CardTitle>
          <CardDescription>Complete daily challenges</CardDescription>
          <CardHeaderRight>
            <Text color="constructive">✓</Text>
          </CardHeaderRight>
        </CardHeader>
        <CardContent>
          <Text variant="heading-lg">Daily Streak: 7 days</Text>
          <Text color="tertiary" style={{ marginTop: 8 }}>
            Keep up the great work! You're on a roll.
          </Text>
        </CardContent>
      </Card>
    </View>
  ),
}; 
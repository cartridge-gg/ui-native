import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { 
  Card as UICard, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardListContent,
  CardListItem,
  CardIcon
} from './Card';
import { Text } from '../../typography/Text';

// Placeholder for EthereumIcon since it doesn't exist in UI-native yet
const EthereumIcon = () => (
  <View style={{ width: 16, height: 16, backgroundColor: '#627EEA', borderRadius: 8 }} />
);

// Placeholder asset (base64 SVG converted to a simple placeholder)
const PLACEHOLDER = "https://via.placeholder.com/24x24/cccccc/666666?text=P";

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Card Title",
    description: "Card Description",
  },
};

export const OnlyTitle: Story = {
  args: {
    title: "Card Title",
  },
};

export const IconHeader: Story = {
  args: {
    title: "Card Title",
    icon: <CardIcon />,
  },
};

export const CardList: Story = {
  args: {
    variant: "list",
    title: "Card List Content",
  },
};

function Card({
  variant = "content",
  title,
  description,
  icon,
}: {
  variant?: "content" | "list";
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  switch (variant) {
    case "content": {
      return (
        <UICard>
          <CardHeader icon={icon}>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <Text>Card Content</Text>
          </CardContent>
        </UICard>
      );
    }
    case "list": {
      return (
        <UICard>
          <CardHeader icon={icon}>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>

          <CardListContent>
            <CardListItem>
              <Text>No icon item</Text>
            </CardListItem>

            <CardListItem icon={PLACEHOLDER}>
              <Text>placeholder</Text>
            </CardListItem>

            <CardListItem icon={<EthereumIcon />}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text>0.01</Text>
                <Text color="tertiary">ETH</Text>
              </View>
              <Text color="tertiary">$3500.00</Text>
            </CardListItem>

            <CardListItem icon="https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/1b126320-367c-48ed-cf5a-ba7580e49600/logo">
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text>100</Text>
                <Text color="tertiary">STRK</Text>
              </View>
              <Text color="tertiary">$50.00</Text>
            </CardListItem>
          </CardListContent>
        </UICard>
      );
    }
  }
} 
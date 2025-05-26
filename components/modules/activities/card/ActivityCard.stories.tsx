import type { Meta, StoryObj } from '@storybook/react';
import { View, Image } from 'react-native';
import { ActivityCard } from './ActivityCard';
import { Text } from '../../../typography/Text';

const meta: Meta<typeof ActivityCard> = {
  title: 'Modules/Activities/Card',
  component: ActivityCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock logo component
const MockLogo = ({ size = 48 }: { size?: number }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#fbcb4a',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🎮</Text>
  </View>
);

const MockTokenLogo = () => (
  <Image
    source={{ uri: 'https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/a3bfe959-50c4-4f89-0aef-b19207d82a00/logo' }}
    style={{ width: 48, height: 48, borderRadius: 24 }}
  />
);

export const Game: Story = {
  args: {
    Logo: <MockLogo />,
    title: 'Attack',
    subTitle: 'lootsurvivor.io',
  },
};

export const Token: Story = {
  args: {
    Logo: <MockTokenLogo />,
    title: 'Received',
    subTitle: 'From 0x041a...123b',
    topic: '100 LORDS',
    subTopic: '$6.04',
  },
};

export const Achievement: Story = {
  args: {
    Logo: <MockLogo />,
    title: 'Achievement',
    subTitle: 'lootsurvivor.io',
    topic: 'Squire',
    subTopic: '⭐ 20',
  },
};

export const Loading: Story = {
  args: {
    Logo: <MockLogo />,
    title: 'Sending',
    subTitle: 'To 0x041a...123b',
    topic: '100 LORDS',
    subTopic: '$6.04',
    loading: true,
  },
};

export const Error: Story = {
  args: {
    Logo: <MockLogo />,
    title: 'Failed',
    subTitle: 'Transaction failed',
    topic: '100 LORDS',
    subTopic: '$6.04',
    error: true,
  },
};

export const Interactive: Story = {
  args: {
    Logo: <MockLogo />,
    title: 'Attack',
    subTitle: 'lootsurvivor.io',
    onPress: () => console.log('Activity card pressed'),
  },
};

export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <ActivityCard
        Logo={<MockLogo />}
        title="Game Action"
        subTitle="lootsurvivor.io"
      />
      <ActivityCard
        Logo={<MockTokenLogo />}
        title="Token Transfer"
        subTitle="From 0x041a...123b"
        topic="100 LORDS"
        subTopic="$6.04"
      />
      <ActivityCard
        Logo={<MockLogo />}
        title="Loading"
        subTitle="Processing..."
        loading
      />
      <ActivityCard
        Logo={<MockLogo />}
        title="Error"
        subTitle="Transaction failed"
        error
      />
    </View>
  ),
}; 
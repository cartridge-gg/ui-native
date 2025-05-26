import type { Meta, StoryObj } from '@storybook/react';
import { CollectibleAssetCard } from './AssetCard';

const meta: Meta<typeof CollectibleAssetCard> = {
  title: 'Modules/Collectibles/Asset Card',
  component: CollectibleAssetCard,
  parameters: {
    layout: 'padded',
  },
  args: {
    image: 'https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/cover.png',
    title: 'Adventurer #8',
    description: 'Adventurers',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    onPress: () => console.log('Asset card pressed'),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Very Long Adventurer Name That Might Wrap',
    description: 'Long collection name that tests text wrapping',
  },
}; 
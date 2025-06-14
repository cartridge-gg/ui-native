import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomTab } from './bottom-tab';
import { ChestIcon } from '../../icons/state/ChestIcon';

const meta: Meta<typeof BottomTab> = {
  title: 'Primitives/BottomTab',
  component: BottomTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: undefined,
  },
} satisfies Meta<typeof BottomTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chest: Story = {
  args: {
    children: <ChestIcon variant="solid" size="lg" />,
  },
};

export const ChestActive: Story = {
  args: {
    status: 'active',
    children: <ChestIcon variant="solid" size="lg" />,
  },
}; 
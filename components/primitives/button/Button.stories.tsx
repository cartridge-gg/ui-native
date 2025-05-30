import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import React from 'react';
import { ArrowToLineIcon } from '../../icons/directional/ArrowToLineIcon';
import { CoinsIcon } from '../../icons/state/CoinsIcon';
import { GiftIcon } from '../../icons/utility/GiftIcon';
import { ExternalIcon } from '../../icons/utility/ExternalIcon';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'label',
    },
    disabled: {
      control: 'boolean',
      description: 'Gray out a button when disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading indicator.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'sign up',
  },
};

export const DefaultLoading: Story = {
  args: {
    children: 'sign up',
    isLoading: true,
  },
};

export const DefaultDisabled: Story = {
  args: {
    children: 'sign up',
    disabled: true,
  },
};

export const DefaultWithIcon: Story = {
  args: {
    children: (
      <>
        <CoinsIcon variant="solid" size="sm" /> sign up
      </>
    ),
  },
};

export const DefaultWithIconDisabled: Story = {
  args: {
    children: (
      <>
        <CoinsIcon variant="solid" size="sm" /> sign up
      </>
    ),
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'skip',
    variant: 'secondary',
  },
};

export const SecondaryLoading: Story = {
  args: {
    children: 'skip',
    variant: 'secondary',
    isLoading: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    children: 'skip',
    disabled: true,
    variant: 'secondary',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    children: (
      <>
        <CoinsIcon variant="solid" size="sm" /> skip
      </>
    ),
    variant: 'secondary',
  },
};

export const SecondaryWithIconDisabled: Story = {
  args: {
    children: (
      <>
        <CoinsIcon variant="solid" size="sm" /> skip
      </>
    ),
    disabled: true,
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: '$1',
    variant: 'tertiary',
  },
};

export const TertiaryLoading: Story = {
  args: {
    children: '$1',
    variant: 'tertiary',
    isLoading: true,
  },
};

export const TertiaryActive: Story = {
  args: {
    children: '$1',
    variant: 'tertiary',
    isActive: true,
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Icon: Story = {
  args: {
    children: <ExternalIcon size="default" />,
    variant: 'icon',
    size: 'icon',
  },
};

export const IconDeposit: Story = {
  args: {
    children: <ArrowToLineIcon variant="down" />,
    size: 'icon',
    variant: 'icon',
  },
};

export const IconToggle: Story = {
  args: {
    children: <GiftIcon size="default" />,
    size: 'icon',
    variant: 'icon',
  },
};

export const ThumbnailDeposit: Story = {
  args: {
    children: <ArrowToLineIcon variant="down" />,
    size: 'thumbnail',
    variant: 'icon',
  },
};

export const ThumbnailToggle: Story = {
  args: {
    children: <GiftIcon size="default" />,
    size: 'thumbnail',
    variant: 'icon',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'View on Starkscan',
    variant: 'link',
  },
};

// Additional stories to match UI exactly
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <CoinsIcon variant="solid" size="sm" /> Button
      </>
    ),
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'default',
  },
}; 
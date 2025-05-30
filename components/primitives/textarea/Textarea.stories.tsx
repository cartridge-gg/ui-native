import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { Textarea } from './Textarea';
import { Label } from '../label/Label';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
    value: "",
  },
};

export const WithLabel: Story = {
  render: () => (
    <View style={{ gap: 8, minWidth: 300 }}>
      <Label>Message</Label>
      <Textarea
        placeholder="Enter your message..."
        value=""
      />
    </View>
  ),
};

export const WithValue: Story = {
  args: {
    value: 'This is a sample message that demonstrates how the textarea looks with content.',
    placeholder: "Enter your message...",
  },
};

export const WithError: Story = {
  render: () => (
    <View style={{ gap: 8, minWidth: 300 }}>
      <Label required>Message</Label>
      <Textarea
        value="Invalid content"
        placeholder="Enter your message..."
        error={{ message: 'Message must be at least 10 characters long' }}
      />
    </View>
  ),
};

export const Disabled: Story = {
  args: {
    value: "This textarea is disabled",
    placeholder: "Enter your message...",
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    placeholder: "Enter your message...",
    size: "lg" as const,
    value: "",
  },
};

export const UsernameVariant: Story = {
  render: () => (
    <View style={{ gap: 8, minWidth: 300 }}>
      <Label>Bio</Label>
      <Textarea
        placeholder="Tell us about yourself..."
        variant="username"
        value=""
      />
    </View>
  ),
}; 
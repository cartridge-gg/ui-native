import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'username'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'lg'],
    },
    isLoading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
    size: 'default',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    variant: 'default',
  },
};

export const Large: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    size: 'lg',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: { message: 'Password must be at least 8 characters' },
    value: '123',
  },
};

export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState('Some text to clear');
    
    return (
      <View style={{ width: 300 }}>
        <Input
          label="Search"
          placeholder="Type to search..."
          value={value}
          onChangeText={setValue}
          onClear={() => setValue('')}
        />
      </View>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('Loading state');
    
    return (
      <View style={{ width: 300 }}>
        <Input
          label="Processing"
          placeholder="Please wait..."
          value={value}
          onChangeText={setValue}
          onClear={() => setValue('')}
          isLoading={true}
        />
      </View>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 20, width: 300 }}>
      <Input
        label="Default Input"
        placeholder="Default variant"
        variant="default"
      />
      <Input
        label="Username Input"
        placeholder="Username variant"
        variant="username"
      />
      <Input
        label="Large Input"
        placeholder="Large size"
        size="lg"
      />
      <Input
        label="With Error"
        placeholder="Error state"
        error={{ message: 'This field is required' }}
      />
    </View>
  ),
}; 
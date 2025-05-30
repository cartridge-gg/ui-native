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
  tags: ['autodocs'],
  args: {
    value: '',
    variant: 'default',
    size: 'default',
    placeholder: 'Label',
    onClear: () => {},
    onChangeText: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Value: Story = {
  args: {
    value: 'Value',
  },
};

export const Error: Story = {
  args: {
    value: 'Value*',
    error: { message: 'Error' },
  },
};

export const AutoFocus: Story = {
  args: {
    value: 'Value',
    autoFocus: true,
  },
};

export const LongValue: Story = {
  args: {
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};

export const BigDefault: Story = {
  args: {
    size: 'lg',
  },
};

export const BigValue: Story = {
  args: {
    size: 'lg',
    value: 'Value',
  },
};

export const BigError: Story = {
  args: {
    size: 'lg',
    value: 'Value*',
    error: { message: 'Error' },
  },
};

export const UsernameDefault: Story = {
  args: {
    variant: 'username',
    size: 'lg',
  },
};

export const UsernameValue: Story = {
  args: {
    variant: 'username',
    size: 'lg',
    value: 'Value',
  },
};

export const UsernameError: Story = {
  args: {
    variant: 'username',
    size: 'lg',
    value: 'Value*',
    error: { message: '' },
  },
};

export const Clear: Story = {
  render: () => {
    const [value, setValue] = useState('Some text to clear');
    
    return (
      <View style={{ width: 300 }}>
        <Input
          placeholder="Type to search..."
          value={value}
          onChangeText={setValue}
          onClear={() => setValue('')}
        />
      </View>
    );
  },
};

// Keep existing stories for UI-native specific examples
export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    variant: 'default',
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
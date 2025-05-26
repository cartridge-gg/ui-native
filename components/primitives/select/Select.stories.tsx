import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Select } from './Select';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const sampleOptionsWithDisabled = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <View style={{ width: 200 }}>
        <Select
          options={sampleOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Choose a fruit..."
        />
      </View>
    );
  },
};

export const Simplified: Story = {
  render: () => {
    const [value, setValue] = useState('apple');
    
    return (
      <View style={{ width: 200 }}>
        <Select
          options={sampleOptions}
          value={value}
          onValueChange={setValue}
          simplified
        />
      </View>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <View style={{ width: 200 }}>
        <Select
          options={sampleOptionsWithDisabled}
          value={value}
          onValueChange={setValue}
          placeholder="Select an option..."
        />
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <View style={{ width: 200 }}>
      <Select
        options={sampleOptions}
        value="apple"
        disabled
      />
    </View>
  ),
};

export const LongList: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    const longOptions = Array.from({ length: 20 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    }));
    
    return (
      <View style={{ width: 200 }}>
        <Select
          options={longOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Choose from many options..."
        />
      </View>
    );
  },
}; 
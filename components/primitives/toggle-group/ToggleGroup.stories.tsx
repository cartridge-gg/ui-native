import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { Text } from '../../typography/Text';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Primitives/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SingleSelection: Story = {
  render: () => {
    const [value, setValue] = useState('center');
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Text Alignment: {value || 'None'}</Text>
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </View>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [values, setValues] = useState(['bold']);
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">
          Text Style: {Array.isArray(values) ? values.join(', ') || 'None' : 'None'}
        </Text>
        <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      </View>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text variant="label">Default Variant</Text>
        <ToggleGroup type="single" variant="default">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </View>
      
      <View style={{ gap: 8 }}>
        <Text variant="label">Outline Variant</Text>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text variant="label">Small Size</Text>
        <ToggleGroup type="single" size="sm">
          <ToggleGroupItem value="xs">XS</ToggleGroupItem>
          <ToggleGroupItem value="sm">SM</ToggleGroupItem>
          <ToggleGroupItem value="md">MD</ToggleGroupItem>
        </ToggleGroup>
      </View>
      
      <View style={{ gap: 8 }}>
        <Text variant="label">Default Size</Text>
        <ToggleGroup type="single" size="default">
          <ToggleGroupItem value="xs">XS</ToggleGroupItem>
          <ToggleGroupItem value="sm">SM</ToggleGroupItem>
          <ToggleGroupItem value="md">MD</ToggleGroupItem>
        </ToggleGroup>
      </View>
      
      <View style={{ gap: 8 }}>
        <Text variant="label">Large Size</Text>
        <ToggleGroup type="single" size="lg">
          <ToggleGroupItem value="xs">XS</ToggleGroupItem>
          <ToggleGroupItem value="sm">SM</ToggleGroupItem>
          <ToggleGroupItem value="md">MD</ToggleGroupItem>
        </ToggleGroup>
      </View>
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text variant="label">Entire Group Disabled</Text>
        <ToggleGroup type="single" disabled>
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </View>
      
      <View style={{ gap: 8 }}>
        <Text variant="label">Individual Items Disabled</Text>
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="option2" disabled>Option 2 (Disabled)</ToggleGroupItem>
          <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </View>
    </View>
  ),
};

export const TextEditor: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left');
    const [formatting, setFormatting] = useState(['bold']);
    
    return (
      <View style={{ gap: 24 }}>
        <View style={{ gap: 12 }}>
          <Text variant="heading-lg">Text Editor Controls</Text>
          
          <View style={{ gap: 8 }}>
            <Text variant="label">Text Alignment</Text>
            <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
              <ToggleGroupItem value="left">←</ToggleGroupItem>
              <ToggleGroupItem value="center">↔</ToggleGroupItem>
              <ToggleGroupItem value="right">→</ToggleGroupItem>
              <ToggleGroupItem value="justify">⟷</ToggleGroupItem>
            </ToggleGroup>
          </View>
          
          <View style={{ gap: 8 }}>
            <Text variant="label">Text Formatting</Text>
            <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
              <ToggleGroupItem value="bold">B</ToggleGroupItem>
              <ToggleGroupItem value="italic">I</ToggleGroupItem>
              <ToggleGroupItem value="underline">U</ToggleGroupItem>
              <ToggleGroupItem value="strikethrough">S</ToggleGroupItem>
            </ToggleGroup>
          </View>
          
          <View style={{ gap: 4 }}>
            <Text variant="caption" color="muted">
              Alignment: {alignment || 'None'}
            </Text>
            <Text variant="caption" color="muted">
              Formatting: {Array.isArray(formatting) ? formatting.join(', ') || 'None' : 'None'}
            </Text>
          </View>
        </View>
      </View>
    );
  },
};

export const ViewModes: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState('grid');
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">View Mode: {viewMode}</Text>
        <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode} variant="outline">
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="card">Card</ToggleGroupItem>
        </ToggleGroup>
      </View>
    );
  },
};

export const FilterOptions: Story = {
  render: () => {
    const [filters, setFilters] = useState(['active']);
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">
          Active Filters: {Array.isArray(filters) ? filters.join(', ') || 'None' : 'None'}
        </Text>
        <ToggleGroup type="multiple" value={filters} onValueChange={setFilters} size="sm">
          <ToggleGroupItem value="active">Active</ToggleGroupItem>
          <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
          <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
          <ToggleGroupItem value="archived">Archived</ToggleGroupItem>
        </ToggleGroup>
      </View>
    );
  },
};

export const MixedVariants: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <Text variant="label">Group with Mixed Item Variants</Text>
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1" variant="default">Default</ToggleGroupItem>
          <ToggleGroupItem value="option2" variant="outline">Outline</ToggleGroupItem>
          <ToggleGroupItem value="option3" variant="default">Default</ToggleGroupItem>
        </ToggleGroup>
      </View>
      
      <View style={{ gap: 8 }}>
        <Text variant="label">Group with Mixed Item Sizes</Text>
        <ToggleGroup type="single">
          <ToggleGroupItem value="option1" size="sm">Small</ToggleGroupItem>
          <ToggleGroupItem value="option2" size="default">Default</ToggleGroupItem>
          <ToggleGroupItem value="option3" size="lg">Large</ToggleGroupItem>
        </ToggleGroup>
      </View>
    </View>
  ),
}; 
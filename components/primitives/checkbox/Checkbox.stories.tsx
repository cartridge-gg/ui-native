import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState('indeterminate');
    
    return (
      <View style={{ flexDirection: 'column', gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Checkbox variant="line" checked={checked1} onCheckedChange={setChecked1} />
          <Checkbox variant="solid" checked={checked2} onCheckedChange={setChecked2} />
          <Checkbox checked={checked3} onCheckedChange={() => setChecked3(!checked3)} />
        </View>
      </View>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    
    return (
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <Checkbox size="xs" checked={checked} onCheckedChange={setChecked} />
        <Checkbox size="sm" checked={checked} onCheckedChange={setChecked} />
        <Checkbox size="default" checked={checked} onCheckedChange={setChecked} />
        <Checkbox size="lg" checked={checked} onCheckedChange={setChecked} />
        <Checkbox size="xl" checked={checked} onCheckedChange={setChecked} />
      </View>
    );
  },
};

export const States: Story = {
  render: () => (
    <View style={{ flexDirection: 'column', gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <Checkbox checked={false} />
        <Checkbox checked={true} />
        <Checkbox checked="indeterminate" />
      </View>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <Checkbox checked={false} disabled />
        <Checkbox checked={true} disabled />
        <Checkbox checked="indeterminate" disabled />
      </View>
    </View>
  ),
}; 
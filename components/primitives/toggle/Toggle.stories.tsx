import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Toggle } from './Toggle';
import { Switch } from './Switch';
import { useState } from 'react';

const ToggleMeta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Toggle',
  },
};

export default ToggleMeta;
type ToggleStory = StoryObj<typeof ToggleMeta>;

export const Default: ToggleStory = {
  render: (args) => {
    const [pressed, setPressed] = useState(false);
    return (
      <Toggle
        {...args}
        pressed={pressed}
        onPressedChange={setPressed}
      />
    );
  },
};

export const Outline: ToggleStory = {
  render: (args) => {
    const [pressed, setPressed] = useState(false);
    return (
      <Toggle
        {...args}
        variant="outline"
        pressed={pressed}
        onPressedChange={setPressed}
      />
    );
  },
};

export const Sizes: ToggleStory = {
  render: () => {
    const [pressed1, setPressed1] = useState(false);
    const [pressed2, setPressed2] = useState(false);
    const [pressed3, setPressed3] = useState(false);
    
    return (
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Toggle size="sm" pressed={pressed1} onPressedChange={setPressed1}>
          Small
        </Toggle>
        <Toggle size="default" pressed={pressed2} onPressedChange={setPressed2}>
          Default
        </Toggle>
        <Toggle size="lg" pressed={pressed3} onPressedChange={setPressed3}>
          Large
        </Toggle>
      </View>
    );
  },
};

// Switch Stories
const SwitchMeta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
  },
};

export const SwitchDefault: StoryObj<typeof SwitchMeta> = {
  render: () => {
    const [value, setValue] = useState(false);
    return (
      <Switch
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const SwitchDisabled: StoryObj<typeof SwitchMeta> = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <Switch value={false} disabled />
      <Switch value={true} disabled />
    </View>
  ),
}; 
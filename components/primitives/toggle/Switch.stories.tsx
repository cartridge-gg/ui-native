import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Switch } from './Switch';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Switch checked={checked} onCheckedChange={setChecked} />
        <Text>Switch is {checked ? 'on' : 'off'}</Text>
      </View>
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    
    return (
      <Switch checked={checked} onCheckedChange={setChecked} />
    );
  },
};

export const Unchecked: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Switch checked={checked} onCheckedChange={setChecked} />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <View style={{ gap: 16, flexDirection: 'row' }}>
      <Switch checked={false} disabled />
      <Switch checked={true} disabled />
    </View>
  ),
};

export const WithLabels: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [analytics, setAnalytics] = useState(true);
    
    return (
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minWidth: 200 }}>
          <Text>Notifications</Text>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minWidth: 200 }}>
          <Text>Marketing emails</Text>
          <Switch checked={marketing} onCheckedChange={setMarketing} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minWidth: 200 }}>
          <Text>Analytics</Text>
          <Switch checked={analytics} onCheckedChange={setAnalytics} />
        </View>
      </View>
    );
  },
}; 
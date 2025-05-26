import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Tabs, TabsContent, TabsRoot } from './Tabs';
import { Text } from '../../typography/Text';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  { value: 'tab1', label: 'Tab 1' },
  { value: 'tab2', label: 'Tab 2' },
  { value: 'tab3', label: 'Tab 3' },
];

const sampleTabsWithDisabled = [
  { value: 'tab1', label: 'Active' },
  { value: 'tab2', label: 'Disabled', disabled: true },
  { value: 'tab3', label: 'Active' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    
    return (
      <View style={{ width: 300 }}>
        <Tabs
          items={sampleTabs}
          value={value}
          onValueChange={setValue}
        />
      </View>
    );
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    
    return (
      <View style={{ width: 300 }}>
        <Tabs
          items={sampleTabsWithDisabled}
          value={value}
          onValueChange={setValue}
        />
      </View>
    );
  },
};

export const WithContent: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    
    return (
      <View style={{ width: 300, gap: 16 }}>
        <Tabs
          items={sampleTabs}
          value={value}
          onValueChange={setValue}
        />
        
        {value === 'tab1' && (
          <TabsContent value="tab1">
            <View style={{ padding: 16, backgroundColor: '#1e221f', borderRadius: 8 }}>
              <Text>Content for Tab 1</Text>
              <Text style={{ marginTop: 8, fontSize: 12, color: '#808080' }}>
                This is the content area for the first tab.
              </Text>
            </View>
          </TabsContent>
        )}
        
        {value === 'tab2' && (
          <TabsContent value="tab2">
            <View style={{ padding: 16, backgroundColor: '#1e221f', borderRadius: 8 }}>
              <Text>Content for Tab 2</Text>
              <Text style={{ marginTop: 8, fontSize: 12, color: '#808080' }}>
                This is the content area for the second tab.
              </Text>
            </View>
          </TabsContent>
        )}
        
        {value === 'tab3' && (
          <TabsContent value="tab3">
            <View style={{ padding: 16, backgroundColor: '#1e221f', borderRadius: 8 }}>
              <Text>Content for Tab 3</Text>
              <Text style={{ marginTop: 8, fontSize: 12, color: '#808080' }}>
                This is the content area for the third tab.
              </Text>
            </View>
          </TabsContent>
        )}
      </View>
    );
  },
};

export const CompoundComponent: Story = {
  render: () => (
    <TabsRoot defaultValue="overview" style={{ width: 300, gap: 16 }}>
      <Tabs
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'analytics', label: 'Analytics' },
          { value: 'reports', label: 'Reports' },
        ]}
      />
      
      <TabsContent value="overview">
        <View style={{ padding: 16, backgroundColor: '#1e221f', borderRadius: 8 }}>
          <Text>Overview Dashboard</Text>
        </View>
      </TabsContent>
      
      <TabsContent value="analytics">
        <View style={{ padding: 16, backgroundColor: '#1e221f', borderRadius: 8 }}>
          <Text>Analytics Data</Text>
        </View>
      </TabsContent>
      
      <TabsContent value="reports">
        <View style={{ padding: 16, backgroundColor: '#1e221f', borderRadius: 8 }}>
          <Text>Reports Section</Text>
        </View>
      </TabsContent>
    </TabsRoot>
  ),
};

export const ManyTabs: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    
    const manyTabs = Array.from({ length: 6 }, (_, i) => ({
      value: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
    }));
    
    return (
      <View style={{ width: 400 }}>
        <Tabs
          items={manyTabs}
          value={value}
          onValueChange={setValue}
        />
      </View>
    );
  },
}; 
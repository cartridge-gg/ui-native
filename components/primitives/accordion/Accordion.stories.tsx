import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text variant="body" color="secondary">
            Approve <Text variant="body" color="primary">2 methods</Text>
          </Text>
        </AccordionTrigger>
        <AccordionContent>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text variant="caption" color="muted">●</Text>
              <Text variant="body">Method 1</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text variant="caption" color="muted">●</Text>
              <Text variant="body">Method 2</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text variant="caption" color="muted">●</Text>
              <Text variant="body">Method 3</Text>
            </View>
          </View>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text variant="body">Section 1</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This is the content for section 1. You can expand multiple sections at once.
          </Text>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Text variant="body">Section 2</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This is the content for section 2. Both sections can be open simultaneously.
          </Text>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Text variant="body">Section 3</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This is the content for section 3. All sections are independent.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('item-1');
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Currently open: {value || 'None'}</Text>
        <Accordion type="single" value={value} onValueChange={setValue} collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text variant="body">Controlled Section 1</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text variant="body" color="secondary">
                This accordion is controlled by external state.
              </Text>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Text variant="body">Controlled Section 2</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text variant="body" color="secondary">
                The state is managed externally and displayed above.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Accordion type="single" disabled>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text variant="body" color="muted">Disabled Section 1</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This content won't be accessible because the accordion is disabled.
          </Text>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Text variant="body" color="muted">Disabled Section 2</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            All items are disabled when the accordion is disabled.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const IndividualDisabled: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text variant="body">Active Section</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This section is active and can be toggled.
          </Text>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>
          <Text variant="body" color="muted">Disabled Section</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This section is individually disabled.
          </Text>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Text variant="body">Another Active Section</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This section is also active and can be toggled.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger hideIcon>
          <Text variant="body">Section without icon</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This accordion item doesn't show the expand/collapse icon.
          </Text>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Text variant="body">Section with icon</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This section shows the default icon.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="faq-1">
        <AccordionTrigger>
          <Text variant="body">What is this component?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            This is an accordion component that allows you to show and hide content sections. 
            It's perfect for FAQs, settings panels, and organizing information.
          </Text>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-2">
        <AccordionTrigger>
          <Text variant="body">How do I use it?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <View style={{ gap: 8 }}>
            <Text variant="body" color="secondary">
              You can use it in several ways:
            </Text>
            <Text variant="body" color="secondary">
              • Single mode: Only one section open at a time
            </Text>
            <Text variant="body" color="secondary">
              • Multiple mode: Multiple sections can be open
            </Text>
            <Text variant="body" color="secondary">
              • Controlled: Manage state externally
            </Text>
            <Text variant="body" color="secondary">
              • Collapsible: Allow closing the active section
            </Text>
          </View>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-3">
        <AccordionTrigger>
          <Text variant="body">Is it accessible?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text variant="body" color="secondary">
            Yes! The component includes proper accessibility attributes like 
            accessibilityRole and accessibilityState to work well with screen readers.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const TriggerColor: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text variant="body" style={{ color: '#ef4444' }}>
            Approve <Text variant="body" color="primary">2 methods</Text>
          </Text>
        </AccordionTrigger>
        <AccordionContent>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text variant="caption" color="muted">●</Text>
              <Text variant="body">Method 1</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text variant="caption" color="muted">●</Text>
              <Text variant="body">Method 2</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text variant="caption" color="muted">●</Text>
              <Text variant="body">Method 3</Text>
            </View>
          </View>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}; 
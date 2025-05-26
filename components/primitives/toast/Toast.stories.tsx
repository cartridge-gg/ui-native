import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Toast, ToastProvider, useToast } from './Toast';
import { Button } from '../button/Button';
import { useState } from 'react';

const meta: Meta<typeof Toast> = {
  title: 'Primitives/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <View style={{ padding: 20 }}>
        <Button title="Show Toast" onPress={() => setVisible(true)} />
        <Toast
          title="Default Toast"
          description="This is a default toast message."
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [visibleDefault, setVisibleDefault] = useState(false);
    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    const [visibleWarning, setVisibleWarning] = useState(false);
    
    return (
      <View style={{ padding: 20, gap: 12 }}>
        <Button title="Default Toast" onPress={() => setVisibleDefault(true)} />
        <Button title="Success Toast" onPress={() => setVisibleSuccess(true)} />
        <Button title="Error Toast" onPress={() => setVisibleError(true)} />
        <Button title="Warning Toast" onPress={() => setVisibleWarning(true)} />
        
        <Toast
          title="Default"
          description="This is a default toast."
          visible={visibleDefault}
          onClose={() => setVisibleDefault(false)}
        />
        
        <Toast
          title="Success"
          description="Operation completed successfully!"
          variant="success"
          visible={visibleSuccess}
          onClose={() => setVisibleSuccess(false)}
        />
        
        <Toast
          title="Error"
          description="Something went wrong. Please try again."
          variant="error"
          visible={visibleError}
          onClose={() => setVisibleError(false)}
        />
        
        <Toast
          title="Warning"
          description="Please check your input and try again."
          variant="warning"
          visible={visibleWarning}
          onClose={() => setVisibleWarning(false)}
        />
      </View>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <View style={{ padding: 20 }}>
        <Button title="Show Toast" onPress={() => setVisible(true)} />
        <Toast
          description="This toast only has a description."
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    );
  },
};

export const AutoDismiss: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <View style={{ padding: 20 }}>
        <Button title="Auto Dismiss (2s)" onPress={() => setVisible(true)} />
        <Toast
          title="Auto Dismiss"
          description="This toast will disappear in 2 seconds."
          visible={visible}
          duration={2000}
          onClose={() => setVisible(false)}
        />
      </View>
    );
  },
};

// Toast Provider Example
const ToastExample = () => {
  const { showToast } = useToast();
  
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Button 
        title="Show Success Toast" 
        onPress={() => showToast({
          title: 'Success!',
          description: 'Your action was completed successfully.',
          variant: 'success',
        })}
      />
      <Button 
        title="Show Error Toast" 
        onPress={() => showToast({
          title: 'Error!',
          description: 'Something went wrong.',
          variant: 'error',
        })}
      />
      <Button 
        title="Show Warning Toast" 
        onPress={() => showToast({
          title: 'Warning!',
          description: 'Please be careful.',
          variant: 'warning',
        })}
      />
    </View>
  );
};

export const WithProvider: Story = {
  render: () => (
    <ToastProvider>
      <ToastExample />
    </ToastProvider>
  ),
}; 
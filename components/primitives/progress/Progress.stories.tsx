import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Progress } from './Progress';
import { useEffect, useState } from 'react';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const CustomColor: Story = {
  args: {
    value: 75,
    completed: true,
    color: '#6de27c',
  },
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 10;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <View style={{ gap: 16 }}>
        <Progress value={progress} />
      </View>
    );
  },
};

export const MultipleStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Progress value={0} />
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
      <Progress value={100} completed color="#6de27c" />
    </View>
  ),
}; 
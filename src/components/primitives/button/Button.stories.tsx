import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Text } from "react-native";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "label",
    },
    disabled: {
      control: "boolean",
      description: "Gray out a button when disabled",
    },
    isLoading: {
      control: "boolean",
      description: "Show loading indicator.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "sign up",
  },
};

export const DefaultLoading: Story = {
  args: {
    children: "sign up",
    isLoading: true,
  },
};

export const DefaultDisabled: Story = {
  args: {
    children: "sign up",
    disabled: true,
  },
};

export const DefaultWithIcon: Story = {
  args: {
    children: (
      <>
        <Text className="text-inherit">💰</Text>
        <Text className="text-inherit">sign up</Text>
      </>
    ),
  },
};

export const DefaultWithIconDisabled: Story = {
  args: {
    children: (
      <>
        <Text className="text-inherit">💰</Text>
        <Text className="text-inherit">sign up</Text>
      </>
    ),
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    children: "skip",
    variant: "secondary",
  },
};

export const SecondaryLoading: Story = {
  args: {
    children: "skip",
    variant: "secondary",
    isLoading: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    children: "skip",
    disabled: true,
    variant: "secondary",
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    children: (
      <>
        <Text className="text-inherit">💰</Text>
        <Text className="text-inherit">skip</Text>
      </>
    ),
    variant: "secondary",
  },
};

export const SecondaryWithIconDisabled: Story = {
  args: {
    children: (
      <>
        <Text className="text-inherit">💰</Text>
        <Text className="text-inherit">skip</Text>
      </>
    ),
    disabled: true,
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "$1",
    variant: "tertiary",
  },
};

export const TertiaryLoading: Story = {
  args: {
    children: "$1",
    variant: "tertiary",
    isLoading: true,
  },
};

export const TertiaryActive: Story = {
  args: {
    children: "$1",
    variant: "tertiary",
    isActive: true,
  },
};

export const Icon: Story = {
  args: {
    children: <Text className="text-inherit">↓</Text>,
    size: "icon",
    variant: "icon",
  },
};

export const IconDeposit: Story = {
  args: {
    children: <Text className="text-inherit">↓</Text>,
    size: "icon",
    variant: "icon",
  },
};

export const IconToggle: Story = {
  args: {
    children: <Text className="text-inherit">🎁</Text>,
    size: "icon",
    variant: "icon",
  },
};

export const ThumnailDeposit: Story = {
  args: {
    children: <Text className="text-inherit">↓</Text>,
    size: "thumbnail",
    variant: "icon",
  },
};

export const ThumnailToggle: Story = {
  args: {
    children: <Text className="text-inherit">🎁</Text>,
    size: "thumbnail",
    variant: "icon",
  },
};

export const ExternalLink: Story = {
  args: {
    children: "View on Starkscan",
    variant: "link",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    isLoading: true,
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "thumbnail",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Text className="text-inherit">⭐</Text>
        <Text className="text-inherit">With Icon</Text>
      </>
    ),
  },
}; 

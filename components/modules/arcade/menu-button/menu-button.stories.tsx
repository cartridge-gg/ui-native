import type { Meta, StoryObj } from "@storybook/react";
import { ArcadeMenuButton } from "./menu-button";

const meta: Meta<typeof ArcadeMenuButton> = {
  title: "Modules/Arcade/Menu Button",
  component: ArcadeMenuButton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ArcadeMenuButton>;

export const Default: Story = {
  args: {
    onPress: () => console.log('Menu button pressed'),
  },
};

export const Active: Story = {
  args: {
    active: true,
    onPress: () => console.log('Active menu button pressed'),
  },
};
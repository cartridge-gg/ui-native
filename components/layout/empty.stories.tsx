import type { Meta, StoryObj } from "@storybook/react";
import { Empty } from "./empty";

const meta: Meta<typeof Empty> = {
  title: "Layout/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Empty />,
};

export const Discover: Story = {
  render: () => (
    <Empty
      title="It's empty here"
      icon="discover"
    />
  ),
};

export const Activity: Story = {
  render: () => (
    <Empty
      title="It's empty here"
      icon="activity"
    />
  ),
};

export const Achievements: Story = {
  render: () => (
    <Empty
      title="No achievements available"
      icon="achievement"
    />
  ),
};

export const Guild: Story = {
  render: () => (
    <Empty
      title="Coming soon"
      icon="guild"
    />
  ),
};

export const Inventory: Story = {
  render: () => (
    <Empty
      title="No items available"
      icon="inventory"
    />
  ),
};
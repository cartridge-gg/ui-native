import type { Meta, StoryObj } from "@storybook/react";
import { FollowerMark } from "./mark";

const meta: Meta<typeof FollowerMark> = {
  title: "Modules/Followers/Mark",
  component: FollowerMark,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof FollowerMark>;

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    active: false,
  },
};
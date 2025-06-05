import type { Meta, StoryObj } from "@storybook/react";
import { FollowerAction } from "./action";

const meta: Meta<typeof FollowerAction> = {
  title: "Modules/Followers/Action",
  component: FollowerAction,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof FollowerAction>;

export const Follow: Story = {
  args: {
    following: false,
    unfollowable: false,
    loading: false,
    disabled: false,
    onPress: () => console.log('Follow clicked'),
  },
};

export const Following: Story = {
  args: {
    following: true,
    unfollowable: false,
  },
};

export const Unfollow: Story = {
  args: {
    following: true,
    unfollowable: true,
    loading: false,
    disabled: false,
    onPress: () => console.log('Unfollow clicked'),
  },
};

export const FollowLoading: Story = {
  args: {
    following: false,
    unfollowable: false,
    loading: true,
    disabled: false,
    onPress: () => console.log('Follow loading...'),
  },
};

export const UnfollowLoading: Story = {
  args: {
    following: true,
    unfollowable: true,
    loading: true,
    disabled: false,
    onPress: () => console.log('Unfollow loading...'),
  },
};

export const FollowDisabled: Story = {
  args: {
    following: false,
    unfollowable: false,
    loading: false,
    disabled: true,
    onPress: () => console.log('Follow disabled'),
  },
};
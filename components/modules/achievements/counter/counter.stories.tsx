import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { AchievementCounter } from "./counter";

const meta: Meta<typeof AchievementCounter> = {
  title: "Modules/Achievements/Counter",
  component: AchievementCounter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    count: 4,
    total: 10,
  },
};

export default meta;
type Story = StoryObj<typeof AchievementCounter>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Collection: Story = {
  render: () => (
    <View style={{ gap: 16, padding: 16 }}>
      <AchievementCounter count={0} total={5} />
      <AchievementCounter count={3} total={5} />
      <AchievementCounter count={5} total={5} />
      <AchievementCounter count={5} total={5} active />
    </View>
  ),
}; 
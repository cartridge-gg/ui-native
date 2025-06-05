import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { AchievementIcon } from "./icon";

const meta: Meta<typeof AchievementIcon> = {
  title: "Modules/Achievements/Icon",
  component: AchievementIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AchievementIcon />
  ),
};

export const Completed: Story = {
  render: () => (
    <AchievementIcon completed />
  ),
};

export const Crest: Story = {
  render: () => (
    <AchievementIcon icon="crest" />
  ),
};

export const CompletedCrest: Story = {
  render: () => (
    <AchievementIcon icon="crest" completed />
  ),
};

export const Collection: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, padding: 16 }}>
      <AchievementIcon />
      <AchievementIcon completed />
      <AchievementIcon icon="crest" />
      <AchievementIcon icon="crest" completed />
    </View>
  ),
};
import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { AchievementLabel } from "./label";

const meta: Meta<typeof AchievementLabel> = {
  title: "Modules/Achievements/Label",
  component: AchievementLabel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    title: "Adventurer", 
    points: 100,
    difficulty: 80,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <AchievementLabel {...args} />
  ),
};

export const Completed: Story = {
  render: (args) => (
    <AchievementLabel {...args} completed />
  ),
};

export const WithTimestamp: Story = {
  render: (args) => (
    <AchievementLabel 
      {...args} 
      completed
      timestamp={Math.floor(Date.now() / 1000) - 86400} // Yesterday
    />
  ),
};

export const Collection: Story = {
  render: (args) => (
    <View style={{ gap: 16, padding: 16 }}>
      <AchievementLabel 
        title="Novice Explorer" 
        points={50}
        difficulty={90}
      />
      <AchievementLabel 
        title="Apprentice Warrior" 
        points={150}
        difficulty={65}
        completed
      />
      <AchievementLabel 
        title="Master Champion" 
        points={500}
        difficulty={15}
        completed
        timestamp={Math.floor(Date.now() / 1000) - 86400}
      />
      <AchievementLabel 
        title="Legendary Hero" 
        points={1000}
        difficulty={5}
        icon="crest"
      />
    </View>
  ),
};
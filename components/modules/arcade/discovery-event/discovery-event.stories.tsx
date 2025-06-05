import type { Meta, StoryObj } from "@storybook/react";
import { ArcadeDiscoveryEvent } from "./discovery-event";
import { JoystickIcon } from "../../../icons/state/JoystickIcon";

const meta: Meta<typeof ArcadeDiscoveryEvent> = {
  title: "Modules/Arcade/Discovery Event",
  component: ArcadeDiscoveryEvent,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ArcadeDiscoveryEvent>;

export const Default: Story = {
  args: {
    name: "Player completed quest",
    timestamp: Date.now() / 1000 - 3600, // 1 hour ago
  },
};

export const Loading: Story = {
  args: {
    name: "Player completed quest",
    timestamp: Date.now() / 1000 - 3600,
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    name: "Player joined game",
    timestamp: Date.now() / 1000 - 1800, // 30 minutes ago
    Icon: <JoystickIcon size="sm" variant="solid" />,
  },
};

export const WithAchievement: Story = {
  args: {
    name: "Player unlocked achievement",
    timestamp: Date.now() / 1000 - 900, // 15 minutes ago
    achievement: {
      title: "First Victory",
      icon: "fa-trophy",
    },
    color: "#10b981",
  },
};

export const RecentEvent: Story = {
  args: {
    name: "Player started mission",
    timestamp: Date.now() / 1000 - 30, // 30 seconds ago
    Icon: <JoystickIcon size="sm" variant="solid" />,
  },
};
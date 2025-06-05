import type { Meta, StoryObj } from "@storybook/react";
import { ArcadeGameHeader } from "./game-header";

const meta: Meta<typeof ArcadeGameHeader> = {
  title: "Modules/Arcade/Game Header",
  component: ArcadeGameHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ArcadeGameHeader>;

export const Default: Story = {
  args: {
    metadata: {
      name: "Loot Survivor",
      logo: "https://ui.cartridge.gg/placeholder-game-logo.png",
    },
    socials: {
      website: "https://lootsurvivor.io",
      github: "https://github.com/cartridge-gg/loot-survivor",
    },
  },
};

export const Empty: Story = {
  args: {
    metadata: {
      name: "Basic Game",
    },
  },
};

export const Faded: Story = {
  args: {
    metadata: {
      name: "Inactive Game",
      logo: "https://ui.cartridge.gg/placeholder-game-logo.png",
    },
    variant: "dark",
    socials: {
      website: "https://example.com",
    },
  },
};

export const LootSurvivor: Story = {
  args: {
    metadata: {
      name: "Loot Survivor",
      logo: "https://ui.cartridge.gg/loot-survivor-logo.png",
      cover: "https://ui.cartridge.gg/loot-survivor-cover.png",
    },
    achievements: [
      {
        id: "1",
        content: { title: "Survivor", icon: "fa-shield", description: "Survive 10 rounds", points: 100, difficulty: 1, hidden: false },
        pin: { pinned: true },
      },
      {
        id: "2", 
        content: { title: "Explorer", icon: "fa-map", description: "Explore all areas", points: 200, difficulty: 2, hidden: false },
        pin: { pinned: true },
      },
    ],
    socials: {
      website: "https://lootsurvivor.io",
      github: "https://github.com/cartridge-gg/loot-survivor",
    },
    active: true,
  },
};

export const LootSurvivorTheme: Story = {
  args: {
    metadata: {
      name: "Loot Survivor",
      logo: "https://ui.cartridge.gg/loot-survivor-logo.png",
      cover: "https://ui.cartridge.gg/loot-survivor-cover.png",
    },
    variant: "light",
    color: "#10b981",
    active: true,
    socials: {
      website: "https://lootsurvivor.io",
      github: "https://github.com/cartridge-gg/loot-survivor",
    },
  },
};

export const Theme: Story = {
  args: {
    metadata: {
      name: "Themed Game",
      logo: "https://ui.cartridge.gg/placeholder-game-logo.png",
    },
    variant: "lighter",
    color: "#3b82f6",
    active: true,
    socials: {
      website: "https://example.com",
    },
  },
};
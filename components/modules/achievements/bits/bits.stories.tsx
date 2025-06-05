import type { Meta, StoryObj } from "@storybook/react";
import { AchievementBits } from "./bits";
import { AchievementBit } from "../bit";

const meta: Meta<typeof AchievementBits> = {
  title: "Modules/Achievements/Bits",
  component: AchievementBits,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof AchievementBits>;

export const Default: Story = {
  render: () => (
    <AchievementBits>
      <AchievementBit completed onClick={() => console.log('Bit 1 clicked')} />
      <AchievementBit completed onClick={() => console.log('Bit 2 clicked')} />
      <AchievementBit completed active onClick={() => console.log('Bit 3 clicked')} />
    </AchievementBits>
  ),
};

export const Mixed: Story = {
  render: () => (
    <AchievementBits>
      <AchievementBit completed onClick={() => console.log('Bit 1 clicked')} />
      <AchievementBit active onClick={() => console.log('Bit 2 clicked')} />
      <AchievementBit onClick={() => console.log('Bit 3 clicked')} />
    </AchievementBits>
  ),
};
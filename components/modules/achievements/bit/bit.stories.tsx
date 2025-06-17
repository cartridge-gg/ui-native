import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { AchievementBit } from "./bit";

const meta: Meta<typeof AchievementBit> = {
	title: "Modules/Achievements/Bit",
	component: AchievementBit,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	args: {
		completed: false,
		active: false,
		onClick: () => console.log("Bit clicked"),
	},
};

export default meta;
type Story = StoryObj<typeof AchievementBit>;

export const Default: Story = {};

export const Completed: Story = {
	args: {
		completed: true,
	},
};

export const Active: Story = {
	args: {
		active: true,
	},
};

export const ActiveCompleted: Story = {
	args: {
		completed: true,
		active: true,
	},
};

export const Collection: Story = {
	render: () => (
		<View className="flex-row gap-2 p-4">
			<AchievementBit />
			<AchievementBit active />
			<AchievementBit completed />
			<AchievementBit completed active />
		</View>
	),
};

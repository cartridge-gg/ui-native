import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { AchievementPoints } from "./points";

const meta: Meta<typeof AchievementPoints> = {
	title: "Modules/Achievements/Points",
	component: AchievementPoints,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	args: {
		points: 20,
	},
};

export default meta;
type Story = StoryObj<typeof AchievementPoints>;

export const Default: Story = {};

export const Timestamp: Story = {
	args: {
		timestamp: 1728717697,
	},
};

export const Collection: Story = {
	render: () => (
		<View className="gap-4 p-4">
			<AchievementPoints points={10} />
			<AchievementPoints points={50} />
			<AchievementPoints points={100} />
			<AchievementPoints points={250} timestamp={1728717697} />
		</View>
	),
};

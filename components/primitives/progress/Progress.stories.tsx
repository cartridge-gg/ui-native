import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
	title: "Primitives/Progress",
	component: Progress,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 50,
	},
};

export const Empty: Story = {
	args: {
		value: 0,
	},
};

export const Complete: Story = {
	args: {
		value: 100,
	},
};

export const CustomColor: Story = {
	args: {
		value: 75,
		completed: true,
		color: "#6de27c",
	},
};

export const Animated: Story = {
	render: () => {
		const [progress, setProgress] = useState(0);

		useEffect(() => {
			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) return 0;
					return prev + 10;
				});
			}, 500);

			return () => clearInterval(interval);
		}, []);

		return (
			<View className="gap-4">
				<Progress value={progress} />
				<Text>Progress: {progress}%</Text>
				<Button onPress={() => setProgress((prev) => Math.min(100, prev + 10))}>
					Increase
				</Button>
				<Button onPress={() => setProgress((prev) => Math.max(0, prev - 10))}>
					Decrease
				</Button>
			</View>
		);
	},
};

export const DifferentStates: Story = {
	render: () => (
		<View className="gap-4">
			<Progress value={0} />
			<Text>Empty (0%)</Text>

			<Progress value={50} />
			<Text>Half (50%)</Text>

			<Progress value={100} />
			<Text>Complete (100%)</Text>
		</View>
	),
};

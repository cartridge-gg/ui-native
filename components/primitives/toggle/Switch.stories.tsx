import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
	title: "Primitives/Switch",
	component: Switch,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <Switch />,
};

export const Checked: Story = {
	render: () => {
		const [checked, setChecked] = useState(true);

		return <Switch checked={checked} onCheckedChange={setChecked} />;
	},
};

export const Unchecked: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);

		return <Switch checked={checked} onCheckedChange={setChecked} />;
	},
};

export const Disabled: Story = {
	render: () => (
		<View className="gap-4 flex-row">
			<Switch checked={false} disabled />
			<Switch checked={true} disabled />
		</View>
	),
};

export const WithLabels: Story = {
	render: () => {
		const [notifications, setNotifications] = useState(true);
		const [marketing, setMarketing] = useState(false);
		const [analytics, setAnalytics] = useState(true);

		return (
			<View className="gap-4">
				<View className="flex-row items-center gap-2">
					<Switch checked={notifications} onCheckedChange={setNotifications} />
					<Text variant="label">Notifications</Text>
				</View>
				<View className="flex-row items-center gap-2">
					<Switch checked={marketing} onCheckedChange={setMarketing} />
					<Text variant="label">Marketing emails</Text>
				</View>
				<View className="flex-row items-center gap-2">
					<Switch checked={analytics} onCheckedChange={setAnalytics} />
					<Text variant="label">Analytics</Text>
				</View>
			</View>
		);
	},
};

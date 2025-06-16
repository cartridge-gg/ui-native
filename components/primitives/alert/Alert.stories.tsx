import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../../typography/Text";
import { AlertDescription, AlertTitle, Alert as UIAlert } from "./";

// Placeholder icons since they don't exist in UI-native yet
const TerminalIcon = () => <Text>🖥️</Text>;
const AlertIcon = () => <Text>⚠️</Text>;

const meta: Meta<typeof Alert> = {
	title: "Primitives/Alert",
	component: Alert,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

function Alert() {
	return (
		<UIAlert>
			<TerminalIcon />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
				You can add components and dependencies to your app using the cli.
			</AlertDescription>
		</UIAlert>
	);
}

export const AlertDestructive: Story = {
	render: () => (
		<UIAlert variant="destructive">
			<AlertIcon />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Your session has expired. Please log in again.
			</AlertDescription>
		</UIAlert>
	),
};

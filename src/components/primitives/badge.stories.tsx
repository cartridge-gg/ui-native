import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { Text } from "./text";

const meta: Meta<typeof Badge> = {
	title: "Primitives/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	render: () => (
		<Badge>
			<Text>approved</Text>
		</Badge>
	),
};

export const Primary: Story = {
	render: () => (
		<Badge variant="primary">
			<Text>approved</Text>
		</Badge>
	),
};

export const Muted: Story = {
	render: () => (
		<Badge variant="muted">
			<Text>approved</Text>
		</Badge>
	),
};

export const Tab: Story = {
	render: () => (
		<Badge variant="primary" className="rounded-full">
			<Text>100</Text>
		</Badge>
	),
};

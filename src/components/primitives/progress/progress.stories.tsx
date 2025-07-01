import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "#components";

const meta: Meta<typeof Progress> = {
	title: "Primitives/Progress",
	component: Progress,
	tags: ["autodocs"],
	args: {
		value: 33,
	},
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
	title: "Primitives/Badge",
	component: Badge,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	args: {
		children: "approved",
	},
};

export const Primary: Story = {
	args: {
		children: "approved",
		variant: "primary",
	},
};

export const Muted: Story = {
	args: {
		children: "approved",
		variant: "muted",
	},
};

export const Tab: Story = {
	args: {
		children: "100",
		variant: "primary",
		style: { borderRadius: 999 }, // rounded-full equivalent
	},
};

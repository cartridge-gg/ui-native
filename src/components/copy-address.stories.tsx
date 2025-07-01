import type { Meta, StoryObj } from "@storybook/react";
import { CopyAddress, SonnerToaster } from "#components";

const meta = {
	title: "CopyAddress",
	component: CopyAddress,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<>
				<Story />
				<SonnerToaster />
			</>
		),
	],
} satisfies Meta<typeof CopyAddress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		address:
			"0x0000000000000000000000000000000000000000000000000000000000000000",
	},
};

export const Small: Story = {
	args: {
		address:
			"0x0000000000000000000000000000000000000000000000000000000000000000",
		size: "sm",
	},
};

export const Large: Story = {
	args: {
		address:
			"0x0000000000000000000000000000000000000000000000000000000000000000",
		size: "lg",
	},
};

export const ExplicitLength: Story = {
	args: {
		address:
			"0x0000000000000000000000000000000000000000000000000000000000000000",
		first: 10,
		last: 15,
	},
};

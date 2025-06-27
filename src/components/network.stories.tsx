import type { Meta, StoryObj } from "@storybook/react";

import { Network } from "./network";

const meta = {
	title: "Network",
	component: Network,
	tags: ["autodocs"],
} satisfies Meta<typeof Network>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mainnet: Story = {
	args: {
		chainId: "0x534e5f4d41494e", // SN_MAIN
	},
};

export const Sepolia: Story = {
	args: {
		chainId: "0x534e5f5345504f4c4941", // SN_SEPOLIA
	},
};

export const Slot: Story = {
	args: {
		chainId: "0x57505f52594f", // toHex("WP_RYO")
	},
};

export const Unknown: Story = {
	args: {
		chainId: "0x554e4b4e4f574e5f434841494e", // toHex("UNKNOWN_CHAIN")
	},
};

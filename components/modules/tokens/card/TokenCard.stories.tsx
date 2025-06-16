import type { Meta, StoryObj } from "@storybook/react";
import { TokenCard } from "./TokenCard";

const meta: Meta<typeof TokenCard> = {
	title: "Modules/Tokens/Card",
	component: TokenCard,
	parameters: {
		layout: "padded",
	},
	args: {
		title: "Ether",
		amount: "0.01 ETH",
		image:
			"https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
	args: {
		value: "$31.40",
	},
};

export const Increasing: Story = {
	args: {
		value: "$31.40",
		change: "+$1.78",
	},
};

export const Decreasing: Story = {
	args: {
		value: "$31.40",
		change: "-$1.78",
	},
};

export const Interactive: Story = {
	args: {
		value: "$31.40",
		change: "+$1.78",
		onPress: () => console.log("Token card pressed"),
	},
};

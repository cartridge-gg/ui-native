import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "#components/primitives/separator";

const meta: Meta<typeof Separator> = {
	title: "Primitives/Separator",
	component: Separator,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {};

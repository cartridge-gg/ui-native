import type { Meta, StoryObj } from "@storybook/react";
import {
	PopoverContent,
	PopoverTrigger,
	Text,
	Popover as UIPopover,
} from "#components";

const meta: Meta<typeof Popover> = {
	title: "Primitives/Popover",
	component: Popover,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {};

function Popover() {
	return (
		<UIPopover>
			<PopoverTrigger>
				<Text>Open</Text>
			</PopoverTrigger>
			<PopoverContent>
				<Text>Place content for the popover here.</Text>
			</PopoverContent>
		</UIPopover>
	);
}

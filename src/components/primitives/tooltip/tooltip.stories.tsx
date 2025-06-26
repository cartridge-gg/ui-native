import { PortalHost } from "@rn-primitives/portal";
import type { Meta, StoryObj } from "@storybook/react";
import {
	Text,
	TooltipContent,
	TooltipTrigger,
	Tooltip as UITooltip,
} from "#components";

const meta: Meta<typeof Tooltip> = {
	title: "Primitives/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<>
				<Story />
				<PortalHost name="tooltip" />
			</>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

function Tooltip() {
	return (
		<UITooltip className="w-[60px] items-center">
			<TooltipTrigger asChild>
				<Text>Hover</Text>
			</TooltipTrigger>
			<TooltipContent>
				<Text>Add to library</Text>
			</TooltipContent>
		</UITooltip>
	);
}

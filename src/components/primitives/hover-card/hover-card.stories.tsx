import type { Meta, StoryObj } from "@storybook/react";
import {
	HoverCardContent,
	HoverCardTrigger,
	Text,
	HoverCard as UIHoverCard,
} from "#components";

const meta: Meta<typeof HoverCard> = {
	title: "Primitives/Hover Card",
	component: HoverCard,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {};

function HoverCard() {
	return (
		<UIHoverCard>
			<HoverCardTrigger>
				<Text>Hover</Text>
			</HoverCardTrigger>
			<HoverCardContent>
				<Text>Some insightful information about the hover trigger</Text>
			</HoverCardContent>
		</UIHoverCard>
	);
}

import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "#components/primitives/text";
import {
	HoverCardContent,
	HoverCardTrigger,
	HoverCard as UIHoverCard,
} from "./index";

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

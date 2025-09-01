import type { Meta, StoryObj } from "@storybook/react";
import {
	ChestIcon,
	ClockIcon,
	PulseIcon,
	SwordsIcon,
	TrophyIcon,
	UsersIcon,
} from "#components/icons";
import { BottomTab, BottomTabs, bottomTabsVariants } from "./bottom-tabs";

const meta = {
	title: "Layout/BottomTabs",
	component: BottomTabs,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof BottomTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<BottomTabs className={bottomTabsVariants()}>
			<BottomTab>
				<PulseIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab status="active">
				<ChestIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab>
				<TrophyIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab>
				<SwordsIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab>
				<UsersIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab>
				<ClockIcon variant="solid" size="lg" />
			</BottomTab>
		</BottomTabs>
	),
};

import type { Meta, StoryObj } from "@storybook/react";
import { ChestIcon, PulseIcon, TrophyIcon } from "#components/icons";
import {
	BottomTab,
	LayoutBottomTabs,
	layoutBottomTabsVariants,
} from "./bottom-tabs";

const meta = {
	title: "Primitives/BottomTab",
	component: BottomTab,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof BottomTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChestActive: Story = {
	render: () => (
		<LayoutBottomTabs className={layoutBottomTabsVariants()}>
			<BottomTab>
				<PulseIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab status="active">
				<ChestIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab>
				<TrophyIcon variant="solid" size="lg" />
			</BottomTab>
		</LayoutBottomTabs>
	),
};

export const Chest: Story = {
	render: () => (
		<LayoutBottomTabs className={layoutBottomTabsVariants()}>
			<BottomTab>
				<PulseIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab>
				<ChestIcon variant="solid" size="lg" />
			</BottomTab>
			<BottomTab>
				<TrophyIcon variant="solid" size="lg" />
			</BottomTab>
		</LayoutBottomTabs>
	),
};

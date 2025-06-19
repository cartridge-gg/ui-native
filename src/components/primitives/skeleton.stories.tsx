import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Skeleton as UISkeleton } from "#components/primitives/skeleton";

const meta: Meta<typeof Skeleton> = {
	title: "Primitives/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

function Skeleton() {
	return (
		<View className="flex-row items-center gap-4">
			<UISkeleton className="size-12 rounded-full" />
			<View className="gap-2">
				<UISkeleton className="h-4 w-[250px]" />
				<UISkeleton className="h-4 w-[200px]" />
			</View>
		</View>
	);
}

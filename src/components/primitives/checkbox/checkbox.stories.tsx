import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Pressable, View } from "react-native";
import { Text } from "#components";
import { Checkbox as UICheckbox } from "./";

const meta: Meta<typeof Checkbox> = {
	title: "Primitives/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

function Checkbox() {
	const [checked, setChecked] = React.useState(false);

	return (
		<View className="flex-row items-center space-x-2">
			<UICheckbox
				checked={checked}
				onCheckedChange={setChecked}
				nativeID="terms"
			/>
			<Pressable onPress={() => setChecked(!checked)}>
				<Text className="text-sm font-medium leading-none text-foreground peer-disabled:opacity-70">
					Accept terms and conditions
				</Text>
			</Pressable>
		</View>
	);
}

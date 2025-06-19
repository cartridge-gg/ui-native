import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { type TextInput, View } from "react-native";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
	title: "Primitives/Label",
	component: Label,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
	render: () => {
		const ref = useRef<TextInput>(null);
		const onPress = () => {
			ref.current?.focus();
		};

		return (
			<View className="grid w-full max-w-sm items-center gap-1.5">
				<Label onPress={onPress}>Email</Label>
				<Input placeholder="Email" ref={ref} />
			</View>
		);
	},
};

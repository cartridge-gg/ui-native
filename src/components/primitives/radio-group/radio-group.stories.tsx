import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pressable } from "react-native";
import { Label, RadioGroup, RadioGroupItem } from "#components";

const meta: Meta<typeof RadioGroup> = {
	title: "Primitives/Radio Group",
	component: RadioGroup,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState("option-one");

		return (
			<RadioGroup value={value} onValueChange={setValue}>
				<Pressable
					className="flex flex-row items-center space-x-2"
					onPress={() => setValue("option-one")}
				>
					<RadioGroupItem value="option-one" />
					<Label>Option One</Label>
				</Pressable>
				<Pressable
					className="flex flex-row items-center space-x-2"
					onPress={() => setValue("option-two")}
				>
					<RadioGroupItem value="option-two" />
					<Label>Option Two</Label>
				</Pressable>
			</RadioGroup>
		);
	},
};

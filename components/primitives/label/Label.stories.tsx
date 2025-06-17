import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Input } from "../input/Input";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
	title: "Primitives/Label",
	component: Label,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Match the web version exactly - Label with Input
export const Default: Story = {
	render: () => (
		<View>
			<Label>Email</Label>
			<View className="w-96 mt-2">
				<Input
					placeholder="Email"
					className="h-10 px-3 py-2 text-sm bg-theme-background border border-theme-border rounded-md"
				/>
			</View>
		</View>
	),
};

export const Required: Story = {
	args: {
		children: "Password",
		required: true,
	},
};

export const Disabled: Story = {
	args: {
		children: "Disabled field",
		disabled: true,
	},
};

export const FormExample: Story = {
	render: () => {
		const [emailValue, setEmailValue] = useState("");
		const [passwordValue, setPasswordValue] = useState("");

		return (
			<View className="gap-4 p-4">
				<View className="gap-1">
					<Label required>Email address</Label>
					<View className="h-10 px-3 py-2 bg-theme-background border border-theme-border rounded-md justify-center">
						<Input
							placeholder="Enter your email"
							value={emailValue}
							onChangeText={setEmailValue}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
					</View>
				</View>

				<View className="gap-1">
					<Label>Password</Label>
					<View className="h-10 px-3 py-2 bg-theme-background border border-theme-border rounded-md justify-center">
						<Input
							placeholder="Enter your password"
							value={passwordValue}
							onChangeText={setPasswordValue}
							secureTextEntry
						/>
					</View>
				</View>

				<View className="gap-1">
					<Label disabled>Disabled field</Label>
					<View className="h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md justify-center opacity-50">
						<Input placeholder="This field is disabled" editable={false} />
					</View>
				</View>
			</View>
		);
	},
};

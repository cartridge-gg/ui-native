import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
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
	render: () => {
		const { colors } = useTheme();

		return (
			<View
				style={{
					width: 384, // max-w-sm equivalent
					gap: 6, // gap-1.5 equivalent
					alignItems: "stretch",
				}}
			>
				<Label>Email</Label>
				<TextInput
					placeholder="Email"
					style={{
						height: 40,
						borderWidth: 1,
						borderColor: colors.background[300],
						borderRadius: 6,
						backgroundColor: colors.background[200],
						paddingHorizontal: 16,
						color: colors.foreground[100],
						fontSize: 14,
					}}
					placeholderTextColor={colors.foreground[400]}
				/>
			</View>
		);
	},
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

export const WithForm: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View style={{ gap: 16, padding: 16 }}>
				<View style={{ gap: 4 }}>
					<Label required>Email address</Label>
					<View
						style={{
							height: 40,
							borderWidth: 1,
							borderColor: "#2a2f2a",
							borderRadius: 6,
							backgroundColor: "#1e221f",
							paddingHorizontal: 12,
							justifyContent: "center",
						}}
					>
						{/* Placeholder for input */}
					</View>
				</View>

				<View style={{ gap: 4 }}>
					<Label>Password</Label>
					<View
						style={{
							height: 40,
							borderWidth: 1,
							borderColor: "#2a2f2a",
							borderRadius: 6,
							backgroundColor: "#1e221f",
							paddingHorizontal: 12,
							justifyContent: "center",
						}}
					>
						{/* Placeholder for input */}
					</View>
				</View>

				<View style={{ gap: 4 }}>
					<Label disabled>Disabled field</Label>
					<View
						style={{
							height: 40,
							borderWidth: 1,
							borderColor: "#2a2f2a",
							borderRadius: 6,
							backgroundColor: "#1e221f",
							paddingHorizontal: 12,
							justifyContent: "center",
							opacity: 0.5,
						}}
					>
						{/* Placeholder for disabled input */}
					</View>
				</View>
			</View>
		);
	},
};

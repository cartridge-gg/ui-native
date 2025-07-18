import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
	title: "Primitives/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		value: "",
		variant: "default",
		size: "default",
		placeholder: "Label",
		onClear: fn(),
		onChangeText: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Value: Story = {
	args: {
		value: "Value",
	},
};

// Using a different pattern to avoid linting error with global Error
// biome-ignore lint/suspicious/noShadowRestrictedNames: Story name needs to match UI version
export const Error: Story = {
	args: {
		value: "Value*",
		error: { name: "error", message: "Error" },
	},
};

export const AutoFocus: Story = {
	args: {
		value: "Value",
		autoFocus: true,
	},
};

export const LongValue: Story = {
	args: {
		value:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
};

export const BigDefault: Story = {
	args: {
		size: "lg",
	},
};

export const BigValue: Story = {
	args: {
		size: "lg",
		value: "Value",
	},
};

export const BigError: Story = {
	args: {
		size: "lg",
		value: "Value*",
		error: { name: "error", message: "Error" },
	},
};

export const UsernameDefault: Story = {
	args: {
		variant: "username",
		size: "lg",
	},
};

export const UsernameValue: Story = {
	args: {
		variant: "username",
		size: "lg",
		value: "Value",
	},
};

export const UsernameError: Story = {
	args: {
		variant: "username",
		size: "lg",
		value: "Value*",
		error: { name: "error", message: "" },
	},
};

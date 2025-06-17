import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
	title: "Typography/Text",
	component: Text,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: { type: "select" },
			options: [
				"sans-regular-10",
				"sans-regular-12",
				"sans-regular-14",
				"sans-regular-16",
				"sans-medium-12",
				"sans-medium-14",
				"sans-semibold-12",
				"sans-semibold-14",
				"sans-semibold-18",
				"sans-bold-14",
				"sans-bold-18",
				"mono-regular-14",
				"mono-regular-16",
				"mono-medium-16",
				"mono-semibold-16",
				"heading-lg",
				"heading-xl",
				"body",
				"caption",
				"label",
			],
		},
		color: {
			control: { type: "select" },
			options: [
				"primary",
				"secondary",
				"tertiary",
				"muted",
				"destructive",
				"constructive",
			],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "The quick brown fox jumps over the lazy dog.",
		variant: "body",
		color: "primary",
	},
};

export const AllSansVariants: Story = {
	render: () => (
		<View className="gap-4 p-5">
			<Text variant="sans-regular-10">
				Sans Regular 10px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-regular-12">
				Sans Regular 12px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-regular-14">
				Sans Regular 14px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-regular-16">
				Sans Regular 16px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-medium-12">
				Sans Medium 12px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-medium-14">
				Sans Medium 14px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-semibold-12">
				Sans Semibold 12px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-semibold-14">
				Sans Semibold 14px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-semibold-18">
				Sans Semibold 18px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-bold-14">
				Sans Bold 14px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="sans-bold-18">
				Sans Bold 18px - The quick brown fox jumps over the lazy dog.
			</Text>
		</View>
	),
};

export const AllMonoVariants: Story = {
	render: () => (
		<View className="gap-4 p-5">
			<Text variant="mono-regular-14">
				Mono Regular 14px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="mono-regular-16">
				Mono Regular 16px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="mono-medium-16">
				Mono Medium 16px - The quick brown fox jumps over the lazy dog.
			</Text>
			<Text variant="mono-semibold-16">
				Mono Semibold 16px - The quick brown fox jumps over the lazy dog.
			</Text>
		</View>
	),
};

export const CommonPatterns: Story = {
	render: () => (
		<View className="gap-4 p-5">
			<Text variant="heading-xl">Heading XL - Main Page Title</Text>
			<Text variant="heading-lg">Heading LG - Section Title</Text>
			<Text variant="body">
				Body - This is the default body text used throughout the application.
			</Text>
			<Text variant="caption" color="tertiary">
				Caption - Additional information or metadata
			</Text>
			<Text variant="label" color="muted">
				LABEL - Form field labels
			</Text>
		</View>
	),
};

export const ColorVariants: Story = {
	render: () => (
		<View className="gap-4 p-5">
			<Text color="primary">Primary color - Main text content</Text>
			<Text color="secondary">Secondary color - Less important text</Text>
			<Text color="tertiary">Tertiary color - Supporting text</Text>
			<Text color="muted">Muted color - Placeholder or disabled text</Text>
			<Text color="destructive">Destructive color - Error messages</Text>
			<Text color="constructive">Constructive color - Success messages</Text>
		</View>
	),
};

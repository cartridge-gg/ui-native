import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../card/Card";
import { HStack, Stack, VStack } from "./stack";

const meta: Meta<typeof Stack> = {
	title: "Primitives/Stack",
	component: Stack,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const StackBox = ({ label }: { label: string }) => (
	<View className="bg-theme-primary rounded justify-center items-center p-3">
		<Text variant="body" className="text-theme-background">
			{label}
		</Text>
	</View>
);

export const Default: Story = {
	render: () => (
		<Stack>
			<StackBox label="Item 1" />
			<StackBox label="Item 2" />
			<StackBox label="Item 3" />
		</Stack>
	),
};

export const BasicSpacing: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View>
				<View>
					<Text variant="label" className="mb-2">
						Extra Small (4px)
					</Text>
					<VStack className="bg-theme-background-subtle p-2 rounded">
						spacing="xs"
						<StackBox label="Item 1" />
						<StackBox label="Item 2" />
						<StackBox label="Item 3" />
					</VStack>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Small (8px)
					</Text>
					<VStack className="bg-theme-background-subtle p-2 rounded">
						spacing="sm"
						<StackBox label="Item 1" />
						<StackBox label="Item 2" />
						<StackBox label="Item 3" />
					</VStack>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Medium (16px)
					</Text>
					<VStack className="bg-theme-background-subtle p-2 rounded">
						spacing="md"
						<StackBox label="Item 1" />
						<StackBox label="Item 2" />
						<StackBox label="Item 3" />
					</VStack>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Large (24px)
					</Text>
					<VStack className="bg-theme-background-subtle p-2 rounded">
						spacing="lg"
						<StackBox label="Item 1" />
						<StackBox label="Item 2" />
						<StackBox label="Item 3" />
					</VStack>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Extra Large (32px)
					</Text>
					<VStack className="bg-theme-background-subtle p-2 rounded">
						spacing="xl"
						<StackBox label="Item 1" />
						<StackBox label="Item 2" />
						<StackBox label="Item 3" />
					</VStack>
				</View>
			</View>
		);
	},
};

export const HorizontalStack: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View>
				<View>
					<Text variant="label" className="mb-2">
						Small Horizontal Spacing
					</Text>
					<HStack className="bg-theme-background-subtle p-2 rounded">
						spacing="sm"
						<StackBox label="1" />
						<StackBox label="2" />
						<StackBox label="3" />
					</HStack>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Large Horizontal Spacing
					</Text>
					<HStack className="bg-theme-background-subtle p-2 rounded">
						spacing="lg"
						<StackBox label="1" />
						<StackBox label="2" />
						<StackBox label="3" />
					</HStack>
				</View>
			</View>
		);
	},
};

export const Direction: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Stack spacing="lg">
				<View>
					<Text variant="label" className="mb-2">
						Vertical Stack (default)
					</Text>
					<View className="bg-theme-background-subtle p-2 rounded">
						<Stack direction="vertical" spacing="sm">
							<StackBox label="Item 1" />
							<StackBox label="Item 2" />
							<StackBox label="Item 3" />
						</Stack>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Horizontal Stack
					</Text>
					<View className="bg-theme-background-subtle p-2 rounded">
						<Stack direction="horizontal" spacing="sm">
							<StackBox label="1" />
							<StackBox label="2" />
							<StackBox label="3" />
						</Stack>
					</View>
				</View>
			</Stack>
		);
	},
};

export const ConvenienceComponents: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Stack spacing="lg">
				<View>
					<Text variant="label" className="mb-2">
						VStack Component
					</Text>
					<View className="bg-theme-background-subtle p-2 rounded">
						<VStack spacing="sm">
							<StackBox label="Vertical 1" />
							<StackBox label="Vertical 2" />
							<StackBox label="Vertical 3" />
						</VStack>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						HStack Component
					</Text>
					<View className="bg-theme-background-subtle p-2 rounded">
						<HStack spacing="sm">
							<StackBox label="H1" />
							<StackBox label="H2" />
							<StackBox label="H3" />
						</HStack>
					</View>
				</View>
			</Stack>
		);
	},
};

export const Alignment: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View className="gap-6">
				<View>
					<Text variant="label" className="mb-2">
						Vertical Stack (default)
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<VStack spacing="md">
							<StackBox label="Item 1" />
							<StackBox label="Item 2" />
							<StackBox label="Item 3" />
						</VStack>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Horizontal Stack
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<HStack spacing="md">
							<StackBox label="Item 1" />
							<StackBox label="Item 2" />
							<StackBox label="Item 3" />
						</HStack>
					</View>
				</View>
			</View>
		);
	},
};

export const Components: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View className="gap-6">
				<View>
					<Text variant="label" className="mb-2">
						VStack Component
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<VStack spacing="md">
							<StackBox label="Vertical 1" />
							<StackBox label="Vertical 2" />
							<StackBox label="Vertical 3" />
						</VStack>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						HStack Component
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<HStack spacing="md">
							<StackBox label="Horizontal 1" />
							<StackBox label="Horizontal 2" />
							<StackBox label="Horizontal 3" />
						</HStack>
					</View>
				</View>
			</View>
		);
	},
};

export const AlignmentOptions: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View className="gap-6">
				<View>
					<Text variant="label" className="mb-2">
						Align Start
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg h-32">
						<VStack align="start" spacing="sm">
							<StackBox label="Start 1" />
							<StackBox label="Start 2" />
						</VStack>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Align Center
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg h-32">
						<VStack align="center" spacing="sm">
							<StackBox label="Center 1" />
							<StackBox label="Center 2" />
						</VStack>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Align End
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg h-32">
						<VStack align="end" spacing="sm">
							<StackBox label="End 1" />
							<StackBox label="End 2" />
						</VStack>
					</View>
				</View>
			</View>
		);
	},
};

export const FormExample: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View className="bg-white p-6 rounded-lg border border-gray-200">
				<Text variant="heading-lg" className="mb-6">
					Contact Form
				</Text>

				<VStack spacing="lg">
					<VStack spacing="xs">
						<View>
							<Text variant="label" className="mb-1">
								Name
							</Text>
							<View className="h-10 bg-gray-100 rounded border border-gray-300 px-3 justify-center">
								<Text variant="body" className="text-gray-500">
									Enter your name
								</Text>
							</View>
						</View>
						<View>
							<Text variant="label" className="mb-1">
								Email
							</Text>
							<View className="h-10 bg-gray-100 rounded border border-gray-300 px-3 justify-center">
								<Text variant="body" className="text-gray-500">
									Enter your email
								</Text>
							</View>
						</View>
						<View>
							<Text variant="label" className="mb-1">
								Message
							</Text>
							<View className="h-20 bg-gray-100 rounded border border-gray-300 p-3">
								<Text variant="body" className="text-gray-500">
									Enter your message
								</Text>
							</View>
						</View>
					</VStack>

					<HStack spacing="md" align="center" className="justify-end">
						<Text variant="body" className="text-gray-500">
							Cancel
						</Text>
						<Text variant="body" className="text-blue-600">
							Submit
						</Text>
					</HStack>
				</VStack>
			</View>
		);
	},
};

export const UserProfile: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View className="bg-white p-4 rounded-lg border border-gray-200">
				<HStack spacing="md" align="start">
					<View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center">
						<Text variant="body" className="text-white font-bold">
							JD
						</Text>
					</View>
					<VStack spacing="xs" className="flex-1">
						<Text variant="sans-semibold-14">User Profile</Text>
						<Text variant="caption" className="text-gray-500">
							This example shows nested stacks
						</Text>
					</VStack>
				</HStack>
			</View>
		);
	},
};

export const RealWorldExample: Story = {
	render: () => (
		<Stack spacing="lg">
			<Card>
				<CardHeader>
					<CardTitle>Form Example</CardTitle>
				</CardHeader>
				<CardContent>
					<VStack spacing="md">
						<View>
							<Text variant="label" className="mb-1">
								Name
							</Text>
							<View className="h-10 bg-gray-800 rounded" />
						</View>
						<View>
							<Text variant="label" className="mb-1">
								Email
							</Text>
							<View className="h-10 bg-gray-800 rounded" />
						</View>
						<View>
							<Text variant="label" className="mb-1">
								Message
							</Text>
							<View className="h-20 bg-gray-800 rounded" />
						</View>
						<HStack spacing="sm" align="center" className="justify-end">
							<Button variant="secondary">Cancel</Button>
							<Button variant="primary">Submit</Button>
						</HStack>
					</VStack>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<HStack spacing="md" align="center">
						<View className="w-12 h-12 rounded-full bg-green-400" />
						<VStack spacing="xs" className="flex-1">
							<Text variant="sans-semibold-14">User Profile</Text>
							<Text variant="caption" className="text-gray-400">
								This example shows nested stacks
							</Text>
						</VStack>
						<Button variant="tertiary">View</Button>
					</HStack>
				</CardContent>
			</Card>
		</Stack>
	),
};

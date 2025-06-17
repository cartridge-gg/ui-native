import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";
import { Flex } from "./flex";

const meta: Meta<typeof Flex> = {
	title: "Primitives/Flex",
	component: Flex,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const FlexBox = ({
	label,
	height = 60,
}: { label: string; height?: number }) => (
	<View
		className="bg-theme-primary rounded justify-center items-center"
		style={{ height }}
	>
		<Text variant="caption" className="text-theme-background">
			{label}
		</Text>
	</View>
);

export const Default: Story = {
	render: () => (
		<Flex gap={8}>
			<FlexBox label="1" />
			<FlexBox label="2" />
			<FlexBox label="3" />
		</Flex>
	),
};

export const FlexDirection: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View>
				<View>
					<Text variant="label" className="mb-2">
						Row (default)
					</Text>
					<Flex direction="row" gap={8}>
						<FlexBox label="1" />
						<FlexBox label="2" />
						<FlexBox label="3" />
					</Flex>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Column
					</Text>
					<Flex direction="column" gap={8}>
						<FlexBox label="1" />
						<FlexBox label="2" />
						<FlexBox label="3" />
					</Flex>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Row Reverse
					</Text>
					<Flex direction="row-reverse" gap={8}>
						<FlexBox label="1" />
						<FlexBox label="2" />
						<FlexBox label="3" />
					</Flex>
				</View>
			</View>
		);
	},
};

export const Alignment: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View>
				<View>
					<Text variant="label" className="mb-2">
						Align Start
					</Text>
					<View className="bg-theme-background-subtle p-2 rounded">
						<Flex align="start" className="h-full">
							<FlexBox label="Item" height={40} />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Align Center
					</Text>
					<View className="bg-theme-background-subtle p-2 rounded">
						<Flex align="center" className="h-full">
							<FlexBox label="Item" height={40} />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Align End
					</Text>
					<View className="bg-theme-background-subtle p-2 rounded">
						<Flex align="end" className="h-full">
							<FlexBox label="Item" height={40} />
						</Flex>
					</View>
				</View>
			</View>
		);
	},
};

export const Justification: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View>
				<View>
					<Text variant="label" className="mb-2">
						Justify Start
					</Text>
					<View className="bg-theme-background-subtle p-2">
						<Flex justify="start" gap={8}>
							<FlexBox label="1" />
							<FlexBox label="2" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Justify Center
					</Text>
					<View className="bg-theme-background-subtle p-2">
						<Flex justify="center" gap={8}>
							<FlexBox label="1" />
							<FlexBox label="2" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Justify End
					</Text>
					<View className="bg-theme-background-subtle p-2">
						<Flex justify="end" gap={8}>
							<FlexBox label="1" />
							<FlexBox label="2" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Justify Between
					</Text>
					<View className="bg-theme-background-subtle p-2">
						<Flex justify="between" gap={8}>
							<FlexBox label="1" />
							<FlexBox label="2" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Justify Around
					</Text>
					<View className="bg-theme-background-subtle p-2">
						<Flex justify="around" gap={8}>
							<FlexBox label="1" />
							<FlexBox label="2" />
						</Flex>
					</View>
				</View>
			</View>
		);
	},
};

export const Wrapping: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View>
				<View>
					<Text variant="label" className="mb-2">
						Wrap (default - container width: 200px)
					</Text>
					<View className="bg-theme-background-subtle p-2 w-48">
						<Flex wrap="wrap" gap={8}>
							<FlexBox label="Item 1" />
							<FlexBox label="Item 2" />
							<FlexBox label="Item 3" />
							<FlexBox label="Item 4" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						No Wrap (container width: 200px)
					</Text>
					<View className="bg-theme-background-subtle p-2 w-48">
						<Flex wrap="nowrap" gap={8}>
							<FlexBox label="Item 1" />
							<FlexBox label="Item 2" />
							<FlexBox label="Item 3" />
							<FlexBox label="Item 4" />
						</Flex>
					</View>
				</View>
			</View>
		);
	},
};

export const VariousSizes: Story = {
	render: () => (
		<View>
			<Flex direction="column" gap={16}>
				<Flex justify="between" align="center" className="p-4">
					<Text variant="body" className="text-theme-foreground-muted">
						Left Content
					</Text>
					<View>
						<Text variant="body" className="text-theme-primary">
							Action
						</Text>
					</View>
				</Flex>

				<Flex direction="row" gap={8} className="p-4">
					<Text variant="body" className="text-theme-foreground-muted">
						Label:
					</Text>
					<Text variant="body" className="text-theme-foreground-muted">
						Value
					</Text>
					<Text variant="body" className="text-theme-primary">
						Link
					</Text>
				</Flex>
			</Flex>
		</View>
	),
};

export const ResponsiveLayout: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Flex direction="column" gap={16}>
				<View className="bg-theme-background-subtle p-4 rounded-lg">
					<Flex justify="between" align="center">
						<Flex gap={8} align="center">
							<View className="w-10 h-10 rounded-full bg-theme-primary" />
							<View>
								<Text variant="sans-semibold-14">John Doe</Text>
								<Text variant="caption" className="text-theme-foreground-muted">
									2 hours ago
								</Text>
							</View>
						</Flex>
						<Text variant="body" className="text-theme-primary">
							Follow
						</Text>
					</Flex>
				</View>

				<View className="bg-theme-background-subtle p-4 rounded-lg">
					<Flex direction="column" gap={12}>
						<Text variant="sans-semibold-14">Card Title</Text>
						<Text variant="body" className="text-theme-foreground-muted">
							This is a card using Flex for its layout structure.
						</Text>
						<Flex justify="end" gap={8}>
							<Text variant="body" className="text-theme-foreground-muted">
								Cancel
							</Text>
							<Text variant="body" className="text-theme-primary">
								Confirm
							</Text>
						</Flex>
					</Flex>
				</View>
			</Flex>
		);
	},
};

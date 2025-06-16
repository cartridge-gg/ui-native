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

const Box = ({ label, size = 50 }: { label: string; size?: number }) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				width: size,
				height: size,
				backgroundColor: colors.primary[100],
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 4,
			}}
		>
			<Text variant="caption" style={{ color: colors.background[100] }}>
				{label}
			</Text>
		</View>
	);
};

export const Default: Story = {
	render: () => (
		<Flex gap={8}>
			<Box label="1" />
			<Box label="2" />
			<Box label="3" />
		</Flex>
	),
};

export const Direction: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Flex direction="column" gap={16}>
				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Row (default)
					</Text>
					<Flex direction="row" gap={8}>
						<Box label="1" />
						<Box label="2" />
						<Box label="3" />
					</Flex>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Column
					</Text>
					<Flex direction="column" gap={8}>
						<Box label="1" />
						<Box label="2" />
						<Box label="3" />
					</Flex>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Row Reverse
					</Text>
					<Flex direction="row-reverse" gap={8}>
						<Box label="1" />
						<Box label="2" />
						<Box label="3" />
					</Flex>
				</View>
			</Flex>
		);
	},
};

export const Alignment: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Flex direction="column" gap={16}>
				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Align Start
					</Text>
					<View
						style={{
							height: 100,
							backgroundColor: colors.background[200],
							padding: 8,
						}}
					>
						<Flex align="start" style={{ height: "100%" }}>
							<Box label="1" size={40} />
							<Box label="2" size={60} />
							<Box label="3" size={50} />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Align Center
					</Text>
					<View
						style={{
							height: 100,
							backgroundColor: colors.background[200],
							padding: 8,
						}}
					>
						<Flex align="center" style={{ height: "100%" }}>
							<Box label="1" size={40} />
							<Box label="2" size={60} />
							<Box label="3" size={50} />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Align End
					</Text>
					<View
						style={{
							height: 100,
							backgroundColor: colors.background[200],
							padding: 8,
						}}
					>
						<Flex align="end" style={{ height: "100%" }}>
							<Box label="1" size={40} />
							<Box label="2" size={60} />
							<Box label="3" size={50} />
						</Flex>
					</View>
				</View>
			</Flex>
		);
	},
};

export const Justification: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Flex direction="column" gap={16}>
				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Justify Start
					</Text>
					<View style={{ backgroundColor: colors.background[200], padding: 8 }}>
						<Flex justify="start">
							<Box label="1" />
							<Box label="2" />
							<Box label="3" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Justify Center
					</Text>
					<View style={{ backgroundColor: colors.background[200], padding: 8 }}>
						<Flex justify="center">
							<Box label="1" />
							<Box label="2" />
							<Box label="3" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Justify End
					</Text>
					<View style={{ backgroundColor: colors.background[200], padding: 8 }}>
						<Flex justify="end">
							<Box label="1" />
							<Box label="2" />
							<Box label="3" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Justify Between
					</Text>
					<View style={{ backgroundColor: colors.background[200], padding: 8 }}>
						<Flex justify="between">
							<Box label="1" />
							<Box label="2" />
							<Box label="3" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Justify Around
					</Text>
					<View style={{ backgroundColor: colors.background[200], padding: 8 }}>
						<Flex justify="around">
							<Box label="1" />
							<Box label="2" />
							<Box label="3" />
						</Flex>
					</View>
				</View>
			</Flex>
		);
	},
};

export const Wrap: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Flex direction="column" gap={16}>
				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						No Wrap (default)
					</Text>
					<View
						style={{
							width: 200,
							backgroundColor: colors.background[200],
							padding: 8,
						}}
					>
						<Flex wrap="nowrap" gap={8}>
							<Box label="1" />
							<Box label="2" />
							<Box label="3" />
							<Box label="4" />
							<Box label="5" />
						</Flex>
					</View>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Wrap
					</Text>
					<View
						style={{
							width: 200,
							backgroundColor: colors.background[200],
							padding: 8,
						}}
					>
						<Flex wrap="wrap" gap={8}>
							<Box label="1" />
							<Box label="2" />
							<Box label="3" />
							<Box label="4" />
							<Box label="5" />
						</Flex>
					</View>
				</View>
			</Flex>
		);
	},
};

export const ResponsiveLayout: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Flex direction="column" gap={16}>
				<View
					style={{
						backgroundColor: colors.background[200],
						padding: 16,
						borderRadius: 8,
					}}
				>
					<Flex justify="between" align="center">
						<Flex gap={8} align="center">
							<View
								style={{
									width: 40,
									height: 40,
									borderRadius: 20,
									backgroundColor: colors.primary[100],
								}}
							/>
							<View>
								<Text variant="sans-semibold-14">John Doe</Text>
								<Text
									variant="caption"
									style={{ color: colors.foreground[400] }}
								>
									2 hours ago
								</Text>
							</View>
						</Flex>
						<Text variant="body" style={{ color: colors.primary[100] }}>
							Follow
						</Text>
					</Flex>
				</View>

				<View
					style={{
						backgroundColor: colors.background[200],
						padding: 16,
						borderRadius: 8,
					}}
				>
					<Flex direction="column" gap={12}>
						<Text variant="sans-semibold-14">Card Title</Text>
						<Text variant="body" style={{ color: colors.foreground[400] }}>
							This is a card using Flex for its layout structure.
						</Text>
						<Flex justify="end" gap={8}>
							<Text variant="body" style={{ color: colors.foreground[400] }}>
								Cancel
							</Text>
							<Text variant="body" style={{ color: colors.primary[100] }}>
								Confirm
							</Text>
						</Flex>
					</Flex>
				</View>
			</Flex>
		);
	},
};

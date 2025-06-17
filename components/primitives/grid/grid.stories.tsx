import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";
import { Card, CardContent } from "../card/Card";
import { Grid, GridItem } from "./grid";

const meta: Meta<typeof Grid> = {
	title: "Primitives/Grid",
	component: Grid,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const GridBox = ({
	label,
	height = 60,
}: { label: string; height?: number }) => {
	const { colors } = useTheme();
	return (
		<View
			className="bg-theme-primary rounded justify-center items-center"
			style={{
				height,
			}}
		>
			<Text variant="body" className="text-theme-background">
				{label}
			</Text>
		</View>
	);
};

export const Default: Story = {
	render: () => (
		<Grid columns={3} spacing={8}>
			<GridBox label="1" />
			<GridBox label="2" />
			<GridBox label="3" />
			<GridBox label="4" />
			<GridBox label="5" />
			<GridBox label="6" />
		</Grid>
	),
};

export const Columns: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<View className="gap-6">
				<View>
					<Text variant="label" className="mb-2">
						2 Columns
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<Grid columns={2} spacing={8}>
							<GridBox label="1" />
							<GridBox label="2" />
							<GridBox label="3" />
							<GridBox label="4" />
						</Grid>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						3 Columns
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<Grid columns={3} spacing={8}>
							<GridBox label="1" />
							<GridBox label="2" />
							<GridBox label="3" />
							<GridBox label="4" />
							<GridBox label="5" />
							<GridBox label="6" />
						</Grid>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						4 Columns
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<Grid columns={4} spacing={8}>
							<GridBox label="1" />
							<GridBox label="2" />
							<GridBox label="3" />
							<GridBox label="4" />
							<GridBox label="5" />
							<GridBox label="6" />
							<GridBox label="7" />
							<GridBox label="8" />
						</Grid>
					</View>
				</View>
			</View>
		);
	},
};

export const Spacing: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<View className="gap-6">
				<View>
					<Text variant="label" className="mb-2">
						Small Spacing (4px)
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<Grid columns={3} spacing={4}>
							<GridBox label="1" />
							<GridBox label="2" />
							<GridBox label="3" />
							<GridBox label="4" />
							<GridBox label="5" />
							<GridBox label="6" />
						</Grid>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Default Spacing (8px)
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<Grid columns={3} spacing={8}>
							<GridBox label="1" />
							<GridBox label="2" />
							<GridBox label="3" />
							<GridBox label="4" />
							<GridBox label="5" />
							<GridBox label="6" />
						</Grid>
					</View>
				</View>

				<View>
					<Text variant="label" className="mb-2">
						Large Spacing (16px)
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<Grid columns={3} spacing={16}>
							<GridBox label="1" />
							<GridBox label="2" />
							<GridBox label="3" />
							<GridBox label="4" />
							<GridBox label="5" />
							<GridBox label="6" />
						</Grid>
					</View>
				</View>
			</View>
		);
	},
};

export const AsymmetricSpacing: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<View className="gap-6">
				<View>
					<Text variant="label" className="mb-2">
						Column Spacing: 8px, Row Spacing: 16px
					</Text>
					<View className="bg-theme-background-subtle p-4 rounded-lg">
						<Grid columns={3} columnSpacing={8} rowSpacing={16}>
							<GridBox label="1" />
							<GridBox label="2" />
							<GridBox label="3" />
							<GridBox label="4" />
							<GridBox label="5" />
							<GridBox label="6" />
						</Grid>
					</View>
				</View>
			</View>
		);
	},
};

export const AutoColumns: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<View>
				<Text variant="label" className="mb-2">
					Auto Columns (minChildWidth: 100px)
				</Text>
				<View className="bg-theme-background-subtle p-4 rounded-lg">
					<Grid columns="auto" minChildWidth={100} spacing={8}>
						<GridBox label="1" />
						<GridBox label="2" />
						<GridBox label="3" />
						<GridBox label="4" />
						<GridBox label="5" />
						<GridBox label="6" />
						<GridBox label="7" />
						<GridBox label="8" />
					</Grid>
				</View>
			</View>
		);
	},
};

export const CardGrid: Story = {
	render: () => (
		<Grid columns={2} spacing={12}>
			<Card>
				<CardContent>
					<Text variant="sans-semibold-14" className="mb-1">
						Card 1
					</Text>
					<Text variant="caption" className="text-gray-500">
						Grid layout for cards
					</Text>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Text variant="sans-semibold-14" className="mb-1">
						Card 2
					</Text>
					<Text variant="caption" className="text-gray-500">
						Responsive and flexible
					</Text>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Text variant="sans-semibold-14" className="mb-1">
						Card 3
					</Text>
					<Text variant="caption" className="text-gray-500">
						Easy to implement
					</Text>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Text variant="sans-semibold-14" className="mb-1">
						Card 4
					</Text>
					<Text variant="caption" className="text-gray-500">
						Consistent spacing
					</Text>
				</CardContent>
			</Card>
		</Grid>
	),
};

export const ImageGallery: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Grid columns={3} spacing={4}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
					<View
						key={i}
						className="aspect-square bg-theme-background-subtle rounded items-center justify-center"
					>
						<Text variant="caption" className="text-theme-foreground-muted">
							Image {i}
						</Text>
					</View>
				))}
			</Grid>
		);
	},
};

export const MixedContent: Story = {
	render: () => {
		const { colors } = useTheme();
		return (
			<Grid columns={3} spacing={8}>
				<GridBox label="1" height={80} />
				<GridBox label="2" height={60} />
				<GridBox label="3" height={100} />
				<GridBox label="4" height={70} />
				<GridBox label="5" height={90} />
				<GridBox label="6" height={65} />
				<View className="p-2">
					<Text
						variant="caption"
						className="text-theme-foreground-muted text-center"
					>
						Text content
					</Text>
				</View>
				<GridBox label="8" height={75} />
				<GridBox label="9" height={85} />
			</Grid>
		);
	},
};

export const ContentGrid: Story = {
	render: () => (
		<View>
			<Text variant="label" className="mb-1">
				Mixed Content Grid
			</Text>
			<Grid columns={2} spacing={8}>
				<View className="bg-theme-background p-4 rounded-md">
					<Text variant="sans-semibold-14" className="mb-1">
						Item 1
					</Text>
					<Text variant="caption" className="text-gray-500">
						Description text
					</Text>
				</View>
				<View className="bg-theme-background p-4 rounded-md">
					<Text variant="sans-semibold-14" className="mb-1">
						Item 2
					</Text>
					<Text variant="caption" className="text-gray-500">
						Description text
					</Text>
				</View>
				<View className="bg-theme-background p-4 rounded-md">
					<Text variant="sans-semibold-14" className="mb-1">
						Item 3
					</Text>
					<Text variant="caption" className="text-gray-500">
						Description text
					</Text>
				</View>
				<View className="bg-theme-background p-4 rounded-md">
					<Text variant="sans-semibold-14" className="mb-1">
						Item 4
					</Text>
					<Text variant="caption" className="text-gray-500">
						Description text
					</Text>
				</View>
			</Grid>
		</View>
	),
};

export const ResponsiveGrid: Story = {
	render: () => (
		<View>
			<Text variant="label" className="mb-2">
				Responsive Grid (3 columns)
			</Text>
			<View className="bg-theme-background-subtle p-4 rounded-lg">
				<Grid columns={3} spacing={8}>
					<GridBox label="1" />
					<GridBox label="2" />
					<GridBox label="3" />
					<GridBox label="4" />
					<GridBox label="5" />
					<GridBox label="6" />
					<GridBox label="7" />
					<GridBox label="8" />
				</Grid>
			</View>
		</View>
	),
};

export const NestedGrid: Story = {
	render: () => (
		<View className="p-2">
			<Text
				variant="caption"
				className="text-theme-foreground-muted text-center"
			>
				Nested grids and complex layouts
			</Text>
		</View>
	),
};

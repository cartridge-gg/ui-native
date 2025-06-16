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
			style={{
				height,
				backgroundColor: colors.primary[100],
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 4,
			}}
		>
			<Text variant="body" style={{ color: colors.background[100] }}>
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
			<View style={{ gap: 24 }}>
				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						2 Columns
					</Text>
					<View
						style={{
							backgroundColor: colors.background[200],
							padding: 8,
							borderRadius: 4,
						}}
					>
						<Grid columns={2} spacing={8}>
							<GridBox label="1" />
							<GridBox label="2" />
							<GridBox label="3" />
							<GridBox label="4" />
						</Grid>
					</View>
				</View>

				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						3 Columns
					</Text>
					<View
						style={{
							backgroundColor: colors.background[200],
							padding: 8,
							borderRadius: 4,
						}}
					>
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
					<Text variant="label" style={{ marginBottom: 8 }}>
						4 Columns
					</Text>
					<View
						style={{
							backgroundColor: colors.background[200],
							padding: 8,
							borderRadius: 4,
						}}
					>
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
			<View style={{ gap: 24 }}>
				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Small Spacing (4px)
					</Text>
					<View
						style={{
							backgroundColor: colors.background[200],
							padding: 8,
							borderRadius: 4,
						}}
					>
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
					<Text variant="label" style={{ marginBottom: 8 }}>
						Default Spacing (8px)
					</Text>
					<View
						style={{
							backgroundColor: colors.background[200],
							padding: 8,
							borderRadius: 4,
						}}
					>
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
					<Text variant="label" style={{ marginBottom: 8 }}>
						Large Spacing (16px)
					</Text>
					<View
						style={{
							backgroundColor: colors.background[200],
							padding: 8,
							borderRadius: 4,
						}}
					>
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
			<View style={{ gap: 24 }}>
				<View>
					<Text variant="label" style={{ marginBottom: 8 }}>
						Column Spacing: 8px, Row Spacing: 16px
					</Text>
					<View
						style={{
							backgroundColor: colors.background[200],
							padding: 8,
							borderRadius: 4,
						}}
					>
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
				<Text variant="label" style={{ marginBottom: 8 }}>
					Auto Columns (minChildWidth: 100px)
				</Text>
				<View
					style={{
						backgroundColor: colors.background[200],
						padding: 8,
						borderRadius: 4,
					}}
				>
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
					<Text variant="sans-semibold-14" style={{ marginBottom: 4 }}>
						Card 1
					</Text>
					<Text variant="caption" style={{ color: "#9c9c9c" }}>
						Grid layout for cards
					</Text>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Text variant="sans-semibold-14" style={{ marginBottom: 4 }}>
						Card 2
					</Text>
					<Text variant="caption" style={{ color: "#9c9c9c" }}>
						Responsive and flexible
					</Text>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Text variant="sans-semibold-14" style={{ marginBottom: 4 }}>
						Card 3
					</Text>
					<Text variant="caption" style={{ color: "#9c9c9c" }}>
						Easy to implement
					</Text>
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Text variant="sans-semibold-14" style={{ marginBottom: 4 }}>
						Card 4
					</Text>
					<Text variant="caption" style={{ color: "#9c9c9c" }}>
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
						style={{
							aspectRatio: 1,
							backgroundColor: colors.background[300],
							borderRadius: 4,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text variant="caption" style={{ color: colors.foreground[400] }}>
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
				<View style={{ padding: 8 }}>
					<Text
						variant="caption"
						style={{ color: colors.foreground[400], textAlign: "center" }}
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

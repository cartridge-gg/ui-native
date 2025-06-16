import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
	title: "Primitives/Separator",
	component: Separator,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			<Text variant="body">Content above separator</Text>
			<Separator />
			<Text variant="body">Content below separator</Text>
		</View>
	),
};

export const Horizontal: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			<Text variant="heading-lg">Section 1</Text>
			<Text variant="body" color="secondary">
				This is the first section with some content.
			</Text>
			<Separator orientation="horizontal" />
			<Text variant="heading-lg">Section 2</Text>
			<Text variant="body" color="secondary">
				This is the second section with different content.
			</Text>
			<Separator orientation="horizontal" />
			<Text variant="heading-lg">Section 3</Text>
			<Text variant="body" color="secondary">
				This is the third section to demonstrate multiple separators.
			</Text>
		</View>
	),
};

export const Vertical: Story = {
	render: () => (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				gap: 16,
				height: 100,
			}}
		>
			<View style={{ flex: 1 }}>
				<Text variant="body">Left Content</Text>
				<Text variant="caption" color="secondary">
					Some description
				</Text>
			</View>
			<Separator orientation="vertical" />
			<View style={{ flex: 1 }}>
				<Text variant="body">Right Content</Text>
				<Text variant="caption" color="secondary">
					Another description
				</Text>
			</View>
		</View>
	),
};

export const InList: Story = {
	render: () => (
		<View style={{ gap: 0 }}>
			<View style={{ padding: 16 }}>
				<Text variant="body">List Item 1</Text>
				<Text variant="caption" color="secondary">
					Description for item 1
				</Text>
			</View>
			<Separator />
			<View style={{ padding: 16 }}>
				<Text variant="body">List Item 2</Text>
				<Text variant="caption" color="secondary">
					Description for item 2
				</Text>
			</View>
			<Separator />
			<View style={{ padding: 16 }}>
				<Text variant="body">List Item 3</Text>
				<Text variant="caption" color="secondary">
					Description for item 3
				</Text>
			</View>
			<Separator />
			<View style={{ padding: 16 }}>
				<Text variant="body">List Item 4</Text>
				<Text variant="caption" color="secondary">
					Description for item 4
				</Text>
			</View>
		</View>
	),
};

export const CustomStyling: Story = {
	render: () => (
		<View style={{ gap: 24 }}>
			<View style={{ gap: 8 }}>
				<Text variant="label">Default Separator</Text>
				<Separator />
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Thick Separator</Text>
				<Separator style={{ height: 3 }} />
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Colored Separator</Text>
				<Separator style={{ backgroundColor: "#fbcb4a" }} />
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Dashed Effect (using opacity)</Text>
				<Separator style={{ opacity: 0.5, height: 2 }} />
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Short Separator</Text>
				<View style={{ alignItems: "center" }}>
					<Separator style={{ width: "50%" }} />
				</View>
			</View>
		</View>
	),
};

export const InCard: Story = {
	render: () => (
		<View
			style={{
				backgroundColor: "#1e221f",
				borderRadius: 8,
				padding: 16,
				gap: 0,
			}}
		>
			<View style={{ paddingVertical: 12 }}>
				<Text variant="body">Card Header</Text>
				<Text variant="caption" color="secondary">
					Header description
				</Text>
			</View>
			<Separator />
			<View style={{ paddingVertical: 12 }}>
				<Text variant="body">Card Content</Text>
				<Text variant="caption" color="secondary">
					Main content area
				</Text>
			</View>
			<Separator />
			<View style={{ paddingVertical: 12 }}>
				<Text variant="body">Card Footer</Text>
				<Text variant="caption" color="secondary">
					Footer information
				</Text>
			</View>
		</View>
	),
};

export const Navigation: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			{/* Horizontal navigation */}
			<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
				<Text variant="body">Home</Text>
				<Separator orientation="vertical" style={{ height: 20 }} />
				<Text variant="body">Products</Text>
				<Separator orientation="vertical" style={{ height: 20 }} />
				<Text variant="body">About</Text>
				<Separator orientation="vertical" style={{ height: 20 }} />
				<Text variant="body">Contact</Text>
			</View>

			<Separator />

			{/* Vertical navigation */}
			<View style={{ gap: 0 }}>
				<View style={{ padding: 12 }}>
					<Text variant="body">Dashboard</Text>
				</View>
				<Separator />
				<View style={{ padding: 12 }}>
					<Text variant="body">Settings</Text>
				</View>
				<Separator />
				<View style={{ padding: 12 }}>
					<Text variant="body">Profile</Text>
				</View>
				<Separator />
				<View style={{ padding: 12 }}>
					<Text variant="body">Logout</Text>
				</View>
			</View>
		</View>
	),
};

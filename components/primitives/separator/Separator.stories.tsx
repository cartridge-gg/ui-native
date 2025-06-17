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
		<View className="gap-4">
			<Text variant="body">Content above separator</Text>
			<Separator />
			<Text variant="body">Content below separator</Text>
		</View>
	),
};

export const Horizontal: Story = {
	render: () => (
		<View className="gap-4">
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
		<View className="flex-row items-center h-20 px-4">
			<View className="flex-1">
				<Text variant="body">Left Content</Text>
				<Text variant="caption" color="secondary">
					Some description
				</Text>
			</View>
			<Separator orientation="vertical" />
			<View className="flex-1">
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
		<View className="gap-0">
			<View className="p-4">
				<Text variant="body">List Item 1</Text>
				<Text variant="caption" color="secondary">
					Description for item 1
				</Text>
			</View>
			<Separator />
			<View className="p-4">
				<Text variant="body">List Item 2</Text>
				<Text variant="caption" color="secondary">
					Description for item 2
				</Text>
			</View>
			<Separator />
			<View className="p-4">
				<Text variant="body">List Item 3</Text>
				<Text variant="caption" color="secondary">
					Description for item 3
				</Text>
			</View>
			<Separator />
			<View className="p-4">
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
		<View className="gap-6">
			<View>
				<Text variant="label">Thick Separator</Text>
				<Separator className="h-1" />
			</View>

			<View>
				<Text variant="label">Colored Separator</Text>
				<Separator className="bg-yellow-400" />
			</View>

			<View>
				<Text variant="label">Dashed Effect (using opacity)</Text>
				<Separator className="opacity-50 h-0.5" />
			</View>

			<View>
				<Text variant="label">Centered Separator</Text>
				<View className="flex items-center">
					<Separator className="w-1/2" />
				</View>
			</View>
		</View>
	),
};

export const InCard: Story = {
	render: () => (
		<View className="bg-gray-800 rounded-lg p-16 gap-0">
			<View className="p-4">
				<Text variant="body">Card Header</Text>
				<Text variant="caption" color="secondary">
					Header description
				</Text>
			</View>
			<Separator />
			<View className="p-4">
				<Text variant="body">Card Content</Text>
				<Text variant="caption" color="secondary">
					Main content area
				</Text>
			</View>
			<Separator />
			<View className="p-4">
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
		<View className="gap-16">
			{/* Horizontal navigation */}
			<View className="flex-row items-center gap-16">
				<Text variant="body">Home</Text>
				<Separator orientation="vertical" className="h-5" />
				<Text variant="body">Products</Text>
				<Separator orientation="vertical" className="h-5" />
				<Text variant="body">About</Text>
				<Separator orientation="vertical" className="h-5" />
				<Text variant="body">Contact</Text>
			</View>

			<Separator />

			{/* Vertical navigation */}
			<View className="gap-0">
				<View className="p-12">
					<Text variant="body">Dashboard</Text>
				</View>
				<Separator />
				<View className="p-12">
					<Text variant="body">Settings</Text>
				</View>
				<Separator />
				<View className="p-12">
					<Text variant="body">Profile</Text>
				</View>
				<Separator />
				<View className="p-12">
					<Text variant="body">Logout</Text>
				</View>
			</View>
		</View>
	),
};

export const InlineNavigation: Story = {
	render: () => (
		<View className="flex-row items-center gap-4">
			<Text variant="body">Home</Text>
			<Separator orientation="vertical" className="h-5" />
			<Text variant="body">Products</Text>
			<Separator orientation="vertical" className="h-5" />
			<Text variant="body">About</Text>
			<Separator orientation="vertical" className="h-5" />
			<Text variant="body">Contact</Text>
		</View>
	),
};

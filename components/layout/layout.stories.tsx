import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Button } from "../primitives/button/Button";
import { Text } from "../typography/Text";
import { LayoutContainer } from "./container";
import { LayoutContent } from "./content";
import { LayoutFooter } from "./footer";
import { LayoutHeader } from "./header";

const meta: Meta<typeof LayoutContainer> = {
	title: "Layout/Layout System",
	component: LayoutContainer,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<View className="h-100 w-75">
			<LayoutContainer>
				<LayoutHeader
					title="Welcome to Keychain"
					description="Secure your digital assets"
				/>

				<LayoutContent>
					<Text variant="body" className="text-center p-5">
						Layout Content
					</Text>
				</LayoutContent>

				<LayoutFooter>
					<Text variant="body" className="text-center">
						Layout Footer
					</Text>
				</LayoutFooter>
			</LayoutContainer>
		</View>
	),
};

export const WithScrollContent: Story = {
	render: () => (
		<View className="h-100 w-75">
			<LayoutContainer>
				<LayoutHeader
					title="Scrollable Content"
					description="Content that scrolls"
				/>

				<LayoutContent>
					<Text variant="body" className="text-center mb-5">
						Scrollable Content
					</Text>
					{Array.from({ length: 5 }, (_, i) => (
						<View
							key={i}
							className="p-4 mb-2 bg-theme-background-subtle rounded"
						>
							<Text variant="body">Item {i + 1}</Text>
						</View>
					))}
				</LayoutContent>

				<LayoutFooter>
					<Button variant="primary">Action</Button>
				</LayoutFooter>
			</LayoutContainer>
		</View>
	),
};

export const ExpandedHeader: Story = {
	render: () => (
		<View className="h-100 w-75">
			<LayoutContainer>
				<LayoutHeader
					variant="expanded"
					title="Expanded Header"
					description="This is an expanded header"
				/>

				<LayoutContent>
					<Text variant="body" className="text-center p-5">
						Content with expanded header
					</Text>
				</LayoutContent>

				<LayoutFooter>
					<Button variant="secondary">Action</Button>
				</LayoutFooter>
			</LayoutContainer>
		</View>
	),
};

export const CompressedHeader: Story = {
	render: () => (
		<View className="h-100 w-75">
			<LayoutContainer>
				<LayoutHeader
					variant="compressed"
					title="Compressed Header"
					description="This is a compressed header"
				/>

				<LayoutContent>
					<Text variant="body" className="text-center p-5">
						Content with compressed header
					</Text>
				</LayoutContent>

				<LayoutFooter>
					<Button variant="tertiary">Action</Button>
				</LayoutFooter>
			</LayoutContainer>
		</View>
	),
};

export const ContentStates: Story = {
	render: () => (
		<View className="gap-5">
			<View className="h-50 border border-gray-300">
				<Text variant="sans-semibold-14" className="p-2.5">
					Loading State:
				</Text>
				<LayoutContent>
					<Text variant="body" className="text-center">
						Loading content...
					</Text>
				</LayoutContent>
			</View>

			<View className="h-50 border border-gray-300">
				<Text variant="sans-semibold-14" className="p-2.5">
					Error State:
				</Text>
				<LayoutContent>
					<Text variant="body" className="text-center text-red-500">
						Error loading content
					</Text>
				</LayoutContent>
			</View>
		</View>
	),
};

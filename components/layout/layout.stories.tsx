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
		<View style={{ height: 400, width: 300 }}>
			<LayoutContainer>
				<LayoutHeader
					title="Welcome to Keychain"
					description="Secure your digital assets"
				/>

				<LayoutContent>
					<Text variant="body" style={{ textAlign: "center", padding: 20 }}>
						Layout Content
					</Text>
				</LayoutContent>

				<LayoutFooter>
					<Text variant="body" style={{ textAlign: "center" }}>
						Layout Footer
					</Text>
				</LayoutFooter>
			</LayoutContainer>
		</View>
	),
};

export const WithScrollContent: Story = {
	render: () => (
		<View style={{ height: 400, width: 300 }}>
			<LayoutContainer>
				<LayoutHeader
					title="Scrollable Content"
					description="Content that scrolls"
				/>

				<LayoutContent>
					<Text
						variant="body"
						style={{ textAlign: "center", marginBottom: 20 }}
					>
						Scrollable Content
					</Text>
					{Array.from({ length: 5 }, (_, i) => (
						<View
							key={i}
							style={{
								padding: 16,
								margin: 8,
								backgroundColor: "#f0f0f0",
								borderRadius: 8,
							}}
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
		<View style={{ height: 400, width: 300 }}>
			<LayoutContainer>
				<LayoutHeader
					variant="expanded"
					title="Expanded Header"
					description="This is an expanded header"
				/>

				<LayoutContent>
					<Text variant="body" style={{ textAlign: "center", padding: 20 }}>
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
		<View style={{ height: 400, width: 300 }}>
			<LayoutContainer>
				<LayoutHeader
					variant="compressed"
					title="Compressed Header"
					description="This is a compressed header"
				/>

				<LayoutContent>
					<Text variant="body" style={{ textAlign: "center", padding: 20 }}>
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
		<View style={{ gap: 20 }}>
			<View style={{ height: 200, borderWidth: 1, borderColor: "#ccc" }}>
				<Text variant="sans-semibold-14" style={{ padding: 10 }}>
					Loading State:
				</Text>
				<LayoutContent>
					<Text variant="body" style={{ textAlign: "center" }}>
						Loading content...
					</Text>
				</LayoutContent>
			</View>

			<View style={{ height: 200, borderWidth: 1, borderColor: "#ccc" }}>
				<Text variant="sans-semibold-14" style={{ padding: 10 }}>
					Error State:
				</Text>
				<LayoutContent>
					<Text
						variant="body"
						style={{ textAlign: "center", color: "#ff6b6b" }}
					>
						Error loading content
					</Text>
				</LayoutContent>
			</View>
		</View>
	),
};

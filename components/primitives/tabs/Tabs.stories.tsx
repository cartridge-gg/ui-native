import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Tabs, TabsContent, TabsRoot } from "./Tabs";

const meta: Meta<typeof Tabs> = {
	title: "Primitives/Tabs",
	component: Tabs,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
	{ value: "tab1", label: "Tab 1" },
	{ value: "tab2", label: "Tab 2" },
	{ value: "tab3", label: "Tab 3" },
];

const sampleTabsWithDisabled = [
	{ value: "tab1", label: "Active" },
	{ value: "tab2", label: "Disabled", disabled: true },
	{ value: "tab3", label: "Active" },
];

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState("tab1");

		return (
			<View className="w-75">
				<Tabs items={sampleTabs} value={value} onValueChange={setValue} />
			</View>
		);
	},
};

export const WithDisabled: Story = {
	render: () => {
		const [value, setValue] = useState("tab1");

		return (
			<View className="w-75">
				<Tabs
					items={sampleTabsWithDisabled}
					value={value}
					onValueChange={setValue}
				/>
			</View>
		);
	},
};

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState("tab1");

		return (
			<View className="w-75">
				<Tabs items={sampleTabs} value={value} onValueChange={setValue} />
			</View>
		);
	},
};

export const Disabled: Story = {
	render: () => {
		const [value, setValue] = useState("tab1");

		return (
			<View className="w-75">
				<Tabs
					items={sampleTabs.map((tab, index) => ({
						...tab,
						disabled: index === 1,
					}))}
					value={value}
					onValueChange={setValue}
				/>
			</View>
		);
	},
};

export const WithContent: Story = {
	render: () => {
		const [value, setValue] = useState("tab1");

		return (
			<View className="w-75 gap-4">
				<Tabs items={sampleTabs} value={value} onValueChange={setValue} />
				{value === "tab1" && (
					<View className="p-4 bg-theme-background-subtle rounded-lg">
						<Text>Content for Tab 1</Text>
						<Text className="mt-2 text-xs text-gray-500">
							This is the content area for the first tab.
						</Text>
					</View>
				)}
				{value === "tab2" && (
					<View className="p-4 bg-theme-background-subtle rounded-lg">
						<Text>Content for Tab 2</Text>
						<Text className="mt-2 text-xs text-gray-500">
							This is the content area for the second tab.
						</Text>
					</View>
				)}
				{value === "tab3" && (
					<View className="p-4 bg-theme-background-subtle rounded-lg">
						<Text>Content for Tab 3</Text>
						<Text className="mt-2 text-xs text-gray-500">
							This is the content area for the third tab.
						</Text>
					</View>
				)}
			</View>
		);
	},
};

export const CustomStyling: Story = {
	render: () => (
		<TabsRoot defaultValue="overview" className="w-75 gap-4">
			<Tabs
				items={[
					{ value: "overview", label: "Overview" },
					{ value: "analytics", label: "Analytics" },
					{ value: "reports", label: "Reports" },
				]}
			/>
			<TabsContent value="overview">
				<View className="p-4 bg-gray-800 rounded-lg">
					<Text>Overview content goes here...</Text>
				</View>
			</TabsContent>
			<TabsContent value="analytics">
				<View className="p-4 bg-gray-800 rounded-lg">
					<Text>Analytics data and charts...</Text>
				</View>
			</TabsContent>
			<TabsContent value="reports">
				<View className="p-4 bg-gray-800 rounded-lg">
					<Text>Reports and summaries...</Text>
				</View>
			</TabsContent>
		</TabsRoot>
	),
};

export const CompoundComponent: Story = {
	render: () => (
		<TabsRoot defaultValue="overview" className="w-75 gap-4">
			<Tabs
				items={[
					{ value: "overview", label: "Overview" },
					{ value: "analytics", label: "Analytics" },
					{ value: "reports", label: "Reports" },
				]}
			/>

			<TabsContent value="overview">
				<View className="p-4 bg-gray-800 rounded-lg">
					<Text>Overview Dashboard</Text>
				</View>
			</TabsContent>

			<TabsContent value="analytics">
				<View className="p-4 bg-gray-800 rounded-lg">
					<Text>Analytics Data</Text>
				</View>
			</TabsContent>

			<TabsContent value="reports">
				<View className="p-4 bg-gray-800 rounded-lg">
					<Text>Reports Section</Text>
				</View>
			</TabsContent>
		</TabsRoot>
	),
};

export const ManyTabs: Story = {
	render: () => {
		const [value, setValue] = useState("tab1");
		const manyTabs = Array.from({ length: 8 }, (_, i) => ({
			value: `tab${i + 1}`,
			label: `Tab ${i + 1}`,
		}));

		return (
			<View className="w-100">
				<Tabs items={manyTabs} value={value} onValueChange={setValue} />
			</View>
		);
	},
};

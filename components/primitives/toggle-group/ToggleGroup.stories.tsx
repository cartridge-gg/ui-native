import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
	title: "Primitives/Toggle Group",
	component: ToggleGroup,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ToggleGroup type="single">
			<ToggleGroupItem value="a">A</ToggleGroupItem>
			<ToggleGroupItem value="b">B</ToggleGroupItem>
			<ToggleGroupItem value="c">C</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const SingleSelection: Story = {
	render: () => {
		const [value, setValue] = useState("center");

		return (
			<View className="gap-4">
				<Text variant="label">Text Alignment: {value || "None"}</Text>
				<ToggleGroup type="single" value={value} onValueChange={setValue}>
					<ToggleGroupItem value="left">Left</ToggleGroupItem>
					<ToggleGroupItem value="center">Center</ToggleGroupItem>
					<ToggleGroupItem value="right">Right</ToggleGroupItem>
				</ToggleGroup>
			</View>
		);
	},
};

export const MultipleSelection: Story = {
	render: () => {
		const [values, setValues] = useState(["bold"]);

		return (
			<View className="gap-4">
				<Text variant="label">
					Selected Options: {values.length > 0 ? values.join(", ") : "None"}
				</Text>
				<ToggleGroup type="multiple" value={values} onValueChange={setValues}>
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
					<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
				</ToggleGroup>
			</View>
		);
	},
};

export const Variants: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Default Variant</Text>
				<ToggleGroup type="single">
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
					<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
				</ToggleGroup>
			</View>

			<View className="gap-2">
				<Text variant="label">Outline Variant</Text>
				<ToggleGroup type="single" variant="outline">
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
					<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
				</ToggleGroup>
			</View>
		</View>
	),
};

export const Sizes: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Small Size</Text>
				<ToggleGroup type="single" size="sm">
					<ToggleGroupItem value="bold">B</ToggleGroupItem>
					<ToggleGroupItem value="italic">I</ToggleGroupItem>
					<ToggleGroupItem value="underline">U</ToggleGroupItem>
				</ToggleGroup>
			</View>

			<View className="gap-2">
				<Text variant="label">Default Size</Text>
				<ToggleGroup type="single">
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
					<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
				</ToggleGroup>
			</View>

			<View className="gap-2">
				<Text variant="label">Large Size</Text>
				<ToggleGroup type="single" size="lg">
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
					<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
				</ToggleGroup>
			</View>
		</View>
	),
};

export const Disabled: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Entire Group Disabled</Text>
				<ToggleGroup type="single" disabled>
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
					<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
				</ToggleGroup>
			</View>

			<View className="gap-2">
				<Text variant="label">Individual Items Disabled</Text>
				<ToggleGroup type="single">
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic" disabled>
						Italic (Disabled)
					</ToggleGroupItem>
					<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
				</ToggleGroup>
			</View>
		</View>
	),
};

export const TextEditor: Story = {
	render: () => {
		const [alignment, setAlignment] = useState("left");
		const [formatting, setFormatting] = useState(["bold"]);

		return (
			<View className="gap-6">
				<View className="gap-3">
					<Text variant="heading-lg">Text Editor Controls</Text>

					<View className="gap-2">
						<Text variant="label">Text Alignment</Text>
						<ToggleGroup
							type="single"
							value={alignment}
							onValueChange={setAlignment}
						>
							<ToggleGroupItem value="left">Left</ToggleGroupItem>
							<ToggleGroupItem value="center">Center</ToggleGroupItem>
							<ToggleGroupItem value="right">Right</ToggleGroupItem>
							<ToggleGroupItem value="justify">Justify</ToggleGroupItem>
						</ToggleGroup>
					</View>

					<View className="gap-2">
						<Text variant="label">Text Formatting</Text>
						<ToggleGroup
							type="multiple"
							value={formatting}
							onValueChange={setFormatting}
						>
							<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
							<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
							<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
							<ToggleGroupItem value="strikethrough">Strike</ToggleGroupItem>
						</ToggleGroup>
					</View>

					<View className="gap-1">
						<Text variant="caption" color="muted">
							Alignment: {alignment || "None"} | Formatting:{" "}
							{formatting.length > 0 ? formatting.join(", ") : "None"}
						</Text>
					</View>
				</View>
			</View>
		);
	},
};

export const ViewModes: Story = {
	render: () => {
		const [viewMode, setViewMode] = useState("grid");

		return (
			<View className="gap-4">
				<Text variant="label">View Mode: {viewMode}</Text>
				<ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
					<ToggleGroupItem value="grid">Grid</ToggleGroupItem>
					<ToggleGroupItem value="list">List</ToggleGroupItem>
					<ToggleGroupItem value="card">Card</ToggleGroupItem>
				</ToggleGroup>
			</View>
		);
	},
};

export const FilterOptions: Story = {
	render: () => {
		const [filters, setFilters] = useState(["active"]);

		return (
			<View className="gap-4">
				<Text variant="label">
					Selected Filters: {filters.length > 0 ? filters.join(", ") : "None"}
				</Text>
				<ToggleGroup type="multiple" value={filters} onValueChange={setFilters}>
					<ToggleGroupItem value="new">New</ToggleGroupItem>
					<ToggleGroupItem value="popular">Popular</ToggleGroupItem>
					<ToggleGroupItem value="featured">Featured</ToggleGroupItem>
					<ToggleGroupItem value="sale">On Sale</ToggleGroupItem>
				</ToggleGroup>
			</View>
		);
	},
};

export const MixedVariants: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Group with Mixed Item Variants</Text>
				<ToggleGroup type="single">
					<ToggleGroupItem value="option1" variant="default">
						Option 1
					</ToggleGroupItem>
					<ToggleGroupItem value="option2" variant="outline">
						Option 2
					</ToggleGroupItem>
					<ToggleGroupItem value="option3" variant="default">
						Option 3
					</ToggleGroupItem>
				</ToggleGroup>
			</View>

			<View className="gap-2">
				<Text variant="label">Group with Mixed Item Sizes</Text>
				<ToggleGroup type="single">
					<ToggleGroupItem value="small" size="sm">
						Small
					</ToggleGroupItem>
					<ToggleGroupItem value="medium">Medium</ToggleGroupItem>
					<ToggleGroupItem value="large" size="lg">
						Large
					</ToggleGroupItem>
				</ToggleGroup>
			</View>
		</View>
	),
};

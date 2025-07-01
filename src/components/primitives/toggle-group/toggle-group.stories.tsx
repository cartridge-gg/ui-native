import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "#components";

const meta: Meta = {
	title: "Primitives/Toggle Group",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>();

		return (
			<ToggleGroup type="single" value={value} onValueChange={setValue}>
				<ToggleGroupItem value="a">A</ToggleGroupItem>
				<ToggleGroupItem value="b">B</ToggleGroupItem>
				<ToggleGroupItem value="c">C</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

export const SingleSelection: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>("a");

		return (
			<ToggleGroup type="single" value={value} onValueChange={setValue}>
				<ToggleGroupItem value="a" aria-label="A">
					A
				</ToggleGroupItem>
				<ToggleGroupItem value="b" aria-label="B">
					B
				</ToggleGroupItem>
				<ToggleGroupItem value="c" aria-label="C">
					C
				</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

export const MultipleSelection: Story = {
	render: () => {
		const [value, setValue] = useState<string[]>(["a"]);

		return (
			<ToggleGroup type="multiple" value={value} onValueChange={setValue}>
				<ToggleGroupItem value="a" aria-label="A">
					A
				</ToggleGroupItem>
				<ToggleGroupItem value="b" aria-label="B">
					B
				</ToggleGroupItem>
				<ToggleGroupItem value="c" aria-label="C">
					C
				</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

export const TextOptions: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>("left");

		return (
			<ToggleGroup type="single" value={value} onValueChange={setValue}>
				<ToggleGroupItem value="left" aria-label="Align left">
					Left
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					Center
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					Right
				</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

export const Disabled: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>();

		return (
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={setValue}
				disabled
			>
				<ToggleGroupItem value="a" aria-label="A">
					A
				</ToggleGroupItem>
				<ToggleGroupItem value="b" aria-label="B">
					B
				</ToggleGroupItem>
				<ToggleGroupItem value="c" aria-label="C">
					C
				</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

export const SmallSize: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>("a");

		return (
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={setValue}
				size="sm"
			>
				<ToggleGroupItem value="a" aria-label="A">
					A
				</ToggleGroupItem>
				<ToggleGroupItem value="b" aria-label="B">
					B
				</ToggleGroupItem>
				<ToggleGroupItem value="c" aria-label="C">
					C
				</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

export const LargeSize: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>("a");

		return (
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={setValue}
				size="lg"
			>
				<ToggleGroupItem value="a" aria-label="A">
					A
				</ToggleGroupItem>
				<ToggleGroupItem value="b" aria-label="B">
					B
				</ToggleGroupItem>
				<ToggleGroupItem value="c" aria-label="C">
					C
				</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

export const OutlineVariant: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>("a");

		return (
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={setValue}
				variant="outline"
			>
				<ToggleGroupItem value="a" aria-label="A">
					A
				</ToggleGroupItem>
				<ToggleGroupItem value="b" aria-label="B">
					B
				</ToggleGroupItem>
				<ToggleGroupItem value="c" aria-label="C">
					C
				</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

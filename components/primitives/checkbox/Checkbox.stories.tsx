import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
	title: "Primitives/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<View className="flex-row items-center gap-2">
			<Checkbox />
			<Text variant="body">Accept terms and conditions</Text>
		</View>
	),
};

export const Variants: Story = {
	render: () => {
		const [checked1, setChecked1] = useState(true);
		const [checked2, setChecked2] = useState(true);
		const [checked3, setChecked3] = useState<boolean | "indeterminate">(
			"indeterminate",
		);

		return (
			<View className="flex-col gap-4">
				<View className="flex-row gap-4 items-center">
					<Checkbox
						variant="line"
						checked={checked1}
						onCheckedChange={setChecked1}
					/>
					<Checkbox
						variant="solid"
						checked={checked2}
						onCheckedChange={setChecked2}
					/>
					<Checkbox
						checked={checked3}
						onCheckedChange={(value) => setChecked3(value)}
					/>
				</View>
			</View>
		);
	},
};

export const Sizes: Story = {
	render: () => {
		const [checked, setChecked] = useState(true);

		return (
			<View className="flex-row gap-4 items-center">
				<Checkbox size="xs" checked={checked} onCheckedChange={setChecked} />
				<Checkbox size="sm" checked={checked} onCheckedChange={setChecked} />
				<Checkbox
					size="default"
					checked={checked}
					onCheckedChange={setChecked}
				/>
				<Checkbox size="lg" checked={checked} onCheckedChange={setChecked} />
				<Checkbox size="xl" checked={checked} onCheckedChange={setChecked} />
			</View>
		);
	},
};

export const States: Story = {
	render: () => (
		<View className="flex-col gap-4">
			<View className="flex-row gap-4 items-center">
				<Checkbox checked={false} />
				<Text variant="body">Unchecked</Text>
			</View>
			<View className="flex-row gap-4 items-center">
				<Checkbox checked={false} disabled />
				<Text variant="body" color="muted">
					Disabled unchecked
				</Text>
			</View>
			<View className="flex-row gap-4 items-center">
				<Checkbox checked={true} />
				<Text variant="body">Checked</Text>
			</View>
			<View className="flex-row gap-4 items-center">
				<Checkbox checked={true} disabled />
				<Text variant="body" color="muted">
					Disabled checked
				</Text>
			</View>
		</View>
	),
};

export const Controlled: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);

		return (
			<View className="flex-col gap-4">
				<View className="flex-row gap-4 items-center">
					<Checkbox checked={checked} onCheckedChange={setChecked} />
					<Text variant="body">Controlled checkbox</Text>
				</View>
				<Text variant="caption" color="muted">
					Checked: {checked ? "Yes" : "No"}
				</Text>
			</View>
		);
	},
};

export const CheckboxGroup: Story = {
	render: () => {
		return (
			<View className="flex-col gap-4">
				<View className="flex-row gap-4 items-center">
					<Checkbox checked />
					<Text>Item 1 (checked)</Text>
				</View>

				<View className="flex-row gap-4 items-center">
					<Checkbox />
					<Text>Item 2</Text>
				</View>

				<View className="flex-row gap-4 items-center">
					<Checkbox disabled />
					<Text>Item 3 (disabled)</Text>
				</View>

				<View className="flex-row gap-4 items-center">
					<Checkbox checked disabled />
					<Text>Item 4 (checked + disabled)</Text>
				</View>
			</View>
		);
	},
};

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MoonIcon, Toggle } from "#components";

const meta: Meta<typeof Toggle> = {
	title: "Primitives/Toggle",
	component: Toggle,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [pressed, setPressed] = useState(false);

		return (
			<Toggle
				pressed={pressed}
				onPressedChange={setPressed}
				aria-label="Toggle bold"
			>
				<MoonIcon variant="solid" />
			</Toggle>
		);
	},
};

export const Pressed: Story = {
	render: () => (
		<Toggle
			pressed={true}
			onPressedChange={() => {}}
			aria-label="Toggle bold pressed"
		>
			<MoonIcon variant="solid" />
		</Toggle>
	),
};

export const Unpressed: Story = {
	render: () => (
		<Toggle
			pressed={false}
			onPressedChange={() => {}}
			aria-label="Toggle bold unpressed"
		>
			<MoonIcon variant="solid" />
		</Toggle>
	),
};

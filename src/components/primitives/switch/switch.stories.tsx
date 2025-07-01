import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "#components";

const meta: Meta<typeof Switch> = {
	title: "Primitives/Switch",
	component: Switch,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<ThemeProvider value={DarkTheme}>
				<Story />
			</ThemeProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);
		return <Switch checked={checked} onCheckedChange={setChecked} />;
	},
};

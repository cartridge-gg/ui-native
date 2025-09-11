import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TabsContent, TabsList, TabsTrigger, Tabs as UITabs } from "./";

const meta: Meta<typeof Tabs> = {
	title: "Primitives/Tabs",
	component: Tabs,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

function Tabs() {
	const [value, setValue] = React.useState("account");

	return (
		<UITabs value={value} onValueChange={setValue} className="w-[400px]">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				Make changes to your account here.
			</TabsContent>
			<TabsContent value="password">Change your password here.</TabsContent>
		</UITabs>
	);
}

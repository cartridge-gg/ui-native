import type { Meta, StoryObj } from "@storybook/react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#components";

const meta: Meta<typeof SelectComponent> = {
	title: "Primitives/Select",
	component: SelectComponent,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SelectComponent>;

export const Default: Story = {};

function SelectComponent() {
	return (
		<Select className="w-[180px]">
			<SelectTrigger>
				<SelectValue placeholder="Theme" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="light" label="Light" />
					<SelectItem value="dark" label="Dark" />
					<SelectItem value="system" label="System" />
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

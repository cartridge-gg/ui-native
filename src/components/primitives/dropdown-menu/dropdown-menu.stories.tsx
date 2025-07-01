import type { Meta, StoryObj } from "@storybook/react";
import {
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	DropdownMenu as UIDropdownMenu,
} from "#components";

const meta: Meta<typeof DropdownMenu> = {
	title: "Primitives/Dropdown Menu",
	component: DropdownMenu,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {};

function DropdownMenu() {
	return (
		<UIDropdownMenu>
			<DropdownMenuTrigger>Open</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>

				<DropdownMenuCheckboxItem checked={true} onCheckedChange={() => {}}>
					Checkbox Item 1
				</DropdownMenuCheckboxItem>

				<DropdownMenuRadioGroup value="radio-item-1" onValueChange={() => {}}>
					<DropdownMenuRadioItem value="radio-item-1">
						Radio Item 1
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="radio-item-2">
						Radio Item 2
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Subtrigger</DropdownMenuSubTrigger>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</UIDropdownMenu>
	);
}

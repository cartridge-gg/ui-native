import type { Meta, StoryObj } from "@storybook/react";
import {
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Dialog as UIDialog,
	DialogContent as UIDialogContent,
} from "#components";

const meta: Meta<typeof DialogExample> = {
	title: "Primitives/Dialog",
	component: DialogExample,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DialogExample>;

export const Default: Story = {};

// This matches the UI version - just shows the trigger
function DialogExample() {
	return (
		<UIDialog>
			<DialogTrigger>Open</DialogTrigger>
			<UIDialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
			</UIDialogContent>
		</UIDialog>
	);
}

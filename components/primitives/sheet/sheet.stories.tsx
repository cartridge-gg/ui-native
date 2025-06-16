import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./sheet";

const meta: Meta<typeof Sheet> = {
	title: "Primitives/Sheet",
	component: Sheet,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger>
				<Button variant="primary">Open Sheet</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
};

export const RightSide: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger>
				<Button variant="primary">Open Right Sheet</Button>
			</SheetTrigger>
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Right Side Sheet</SheetTitle>
					<SheetDescription>
						This sheet slides in from the right side of the screen.
					</SheetDescription>
				</SheetHeader>
				<Text variant="body" style={{ marginVertical: 16 }}>
					This is the content area of the sheet. You can put any content here.
				</Text>
				<SheetFooter>
					<SheetClose>
						<Button variant="secondary">Close</Button>
					</SheetClose>
					<Button variant="primary">Save Changes</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
};

export const LeftSide: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger>
				<Button variant="secondary">Open Left Sheet</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Left Side Sheet</SheetTitle>
					<SheetDescription>
						This sheet slides in from the left side of the screen.
					</SheetDescription>
				</SheetHeader>
				<View style={{ marginVertical: 16 }}>
					<Text variant="body" style={{ marginBottom: 12 }}>
						Navigation Menu
					</Text>
					<Button variant="tertiary" style={{ marginBottom: 8 }}>
						Home
					</Button>
					<Button variant="tertiary" style={{ marginBottom: 8 }}>
						Profile
					</Button>
					<Button variant="tertiary" style={{ marginBottom: 8 }}>
						Settings
					</Button>
				</View>
			</SheetContent>
		</Sheet>
	),
};

export const BottomSheet: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger>
				<Button variant="tertiary">Open Bottom Sheet</Button>
			</SheetTrigger>
			<SheetContent side="bottom">
				<SheetHeader>
					<SheetTitle>Bottom Sheet</SheetTitle>
					<SheetDescription>
						This sheet slides up from the bottom of the screen.
					</SheetDescription>
				</SheetHeader>
				<View style={{ marginVertical: 16 }}>
					<Text variant="body" style={{ marginBottom: 12 }}>
						Quick Actions
					</Text>
					<Button variant="outline" style={{ marginBottom: 8 }}>
						Share
					</Button>
					<Button variant="outline" style={{ marginBottom: 8 }}>
						Copy Link
					</Button>
					<Button variant="outline" style={{ marginBottom: 8 }}>
						Download
					</Button>
				</View>
				<SheetFooter>
					<SheetClose>
						<Button variant="secondary">Cancel</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
};

export const TopSheet: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger>
				<Button variant="outline">Open Top Sheet</Button>
			</SheetTrigger>
			<SheetContent side="top">
				<SheetHeader>
					<SheetTitle>Top Sheet</SheetTitle>
					<SheetDescription>
						This sheet slides down from the top of the screen.
					</SheetDescription>
				</SheetHeader>
				<Text variant="body" style={{ marginVertical: 16 }}>
					This is useful for notifications or quick information displays.
				</Text>
			</SheetContent>
		</Sheet>
	),
};

export const WithoutCloseButton: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger>
				<Button variant="primary">Sheet without Close Button</Button>
			</SheetTrigger>
			<SheetContent showClose={false}>
				<SheetHeader>
					<SheetTitle>No Close Button</SheetTitle>
					<SheetDescription>
						This sheet doesn't have a close button in the corner.
					</SheetDescription>
				</SheetHeader>
				<Text variant="body" style={{ marginVertical: 16 }}>
					You can only close this sheet by tapping outside or using the button
					below.
				</Text>
				<SheetFooter>
					<SheetClose>
						<Button variant="primary">Close Sheet</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
};

export const ControlledSheet: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);

		return (
			<View style={{ gap: 12 }}>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger>
						<Button variant="primary">Open Controlled Sheet</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Controlled Sheet</SheetTitle>
							<SheetDescription>
								This sheet's open state is controlled by the parent component.
							</SheetDescription>
						</SheetHeader>
						<SheetFooter>
							<Button variant="secondary" onPress={() => setOpen(false)}>
								Close Programmatically
							</Button>
						</SheetFooter>
					</SheetContent>
				</Sheet>

				<Button variant="outline" onPress={() => setOpen(true)}>
					Open from External Button
				</Button>
			</View>
		);
	},
};

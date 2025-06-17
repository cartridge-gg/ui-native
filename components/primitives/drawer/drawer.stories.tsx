import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./drawer";

const meta: Meta<typeof Drawer> = {
	title: "Primitives/Drawer",
	component: Drawer,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger>
				<Button variant="primary">Open Drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Are you absolutely sure?</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button variant="primary">Submit</Button>
					<DrawerClose>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
};

export const WithForm: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger>
				<Button variant="secondary">Open Form Drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Edit Profile</DrawerTitle>
					<DrawerDescription>
						Make changes to your profile here. Click save when you're done.
					</DrawerDescription>
				</DrawerHeader>
				<View className="p-4 gap-4">
					<View>
						<Text variant="sans-medium-14" className="mb-2">
							Name
						</Text>
						<View className="border border-gray-300 rounded bg-gray-100 h-10 px-3 justify-center">
							<Text variant="body" className="text-gray-500">
								Enter your name
							</Text>
						</View>
					</View>
					<View>
						<Text variant="sans-medium-14" className="mb-2">
							Email
						</Text>
						<View className="border border-gray-300 rounded bg-gray-100 h-10 px-3 justify-center">
							<Text variant="body" className="text-gray-500">
								Enter your email
							</Text>
						</View>
					</View>
				</View>
				<DrawerFooter>
					<Button variant="primary">Save Changes</Button>
					<DrawerClose>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
};

export const SimpleDrawer: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger>
				<Button variant="tertiary">Simple Drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Simple Drawer</DrawerTitle>
				</DrawerHeader>
				<View className="p-4">
					<Text variant="body" className="text-center">
						This is a simple drawer with just a title and some content.
					</Text>
				</View>
				<DrawerFooter>
					<DrawerClose>
						<Button variant="primary">Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
};

export const ControlledDrawer: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);

		return (
			<View className="gap-3">
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger>
						<Button variant="primary">Controlled Drawer</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Controlled State</DrawerTitle>
							<DrawerDescription>
								This drawer's open state is controlled by the parent component.
							</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter>
							<Button variant="secondary" onPress={() => setOpen(false)}>
								Close Programmatically
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>

				<Button variant="outline" onPress={() => setOpen(true)}>
					Open from External Button
				</Button>
			</View>
		);
	},
};

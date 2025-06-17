import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
	title: "Primitives/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "padded",
	},
	decorators: [
		(Story) => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger>
				<Button>Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>Add to library</TooltipContent>
		</Tooltip>
	),
};

export const WithCustomDelay: Story = {
	render: () => (
		<View className="gap-4">
			<Tooltip delayDuration={0}>
				<TooltipTrigger>
					<Button>No Delay</Button>
				</TooltipTrigger>
				<TooltipContent>This tooltip appears immediately</TooltipContent>
			</Tooltip>

			<Tooltip delayDuration={1000}>
				<TooltipTrigger>
					<Button>1 Second Delay</Button>
				</TooltipTrigger>
				<TooltipContent>This tooltip appears after 1 second</TooltipContent>
			</Tooltip>
		</View>
	),
};

export const DifferentSides: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<Tooltip>
				<TooltipTrigger>
					<Button>Top Tooltip</Button>
				</TooltipTrigger>
				<TooltipContent side="top">This tooltip appears on top</TooltipContent>
			</Tooltip>

			<View className="flex-row gap-6">
				<Tooltip>
					<TooltipTrigger>
						<Button>Left</Button>
					</TooltipTrigger>
					<TooltipContent side="left">Left side</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<Button>Right</Button>
					</TooltipTrigger>
					<TooltipContent side="right">Right side</TooltipContent>
				</Tooltip>
			</View>

			<Tooltip>
				<TooltipTrigger>
					<Button>Bottom Tooltip</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					This tooltip appears on bottom
				</TooltipContent>
			</Tooltip>
		</View>
	),
};

export const ControlledTooltip: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<View className="gap-4">
				<Text variant="label">Tooltip is {open ? "open" : "closed"}</Text>
				<Tooltip open={open} onOpenChange={setOpen}>
					<TooltipTrigger>
						<Button>Controlled Tooltip</Button>
					</TooltipTrigger>
					<TooltipContent>
						This tooltip is controlled by external state
					</TooltipContent>
				</Tooltip>
				<Button onPress={() => setOpen(!open)} variant="secondary">
					{open ? "Close Tooltip" : "Open Tooltip"}
				</Button>
			</View>
		);
	},
};

export const HelpTooltips: Story = {
	render: () => (
		<View className="gap-6">
			<View className="flex-row items-center gap-2">
				<Text variant="label">Username</Text>
				<Tooltip>
					<TooltipTrigger>
						<View className="w-4 h-4 rounded-full bg-gray-500 items-center justify-center">
							<Text className="text-white text-xs">?</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>
						Your username must be unique and contain only letters, numbers, and
						underscores
					</TooltipContent>
				</Tooltip>
			</View>

			<View className="flex-row items-center gap-2">
				<Text variant="label">Password Strength</Text>
				<Tooltip>
					<TooltipTrigger>
						<View className="w-4 h-4 rounded-full bg-gray-500 items-center justify-center">
							<Text className="text-white text-xs">i</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>
						Use at least 8 characters with a mix of letters, numbers, and
						symbols
					</TooltipContent>
				</Tooltip>
			</View>
		</View>
	),
};

export const IconTooltips: Story = {
	render: () => (
		<View className="gap-4">
			<Text variant="label">Toolbar Actions</Text>
			<View className="flex-row gap-3">
				<Tooltip>
					<TooltipTrigger>
						<View className="w-10 h-10 rounded-lg bg-gray-100 items-center justify-center">
							<Text>📝</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>Edit document</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<View className="w-10 h-10 rounded-lg bg-gray-100 items-center justify-center">
							<Text>💾</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>Save changes (Cmd+S)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<View className="w-10 h-10 rounded-lg bg-gray-100 items-center justify-center">
							<Text>🗑️</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>Delete document</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<View className="w-10 h-10 rounded-lg bg-gray-100 items-center justify-center">
							<Text>📤</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>Share document</TooltipContent>
				</Tooltip>
			</View>
		</View>
	),
};

export const CustomContent: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger>
				<Button>Rich Tooltip</Button>
			</TooltipTrigger>
			<TooltipContent>
				<View className="gap-1">
					<Text className="font-bold text-white">John Doe</Text>
					<Text className="text-white opacity-80">Software Engineer</Text>
					<Text className="text-white opacity-80">Online</Text>
				</View>
			</TooltipContent>
		</Tooltip>
	),
};

export const WithSideOffset: Story = {
	render: () => (
		<View className="gap-6">
			<Tooltip>
				<TooltipTrigger>
					<Button>Default Offset</Button>
				</TooltipTrigger>
				<TooltipContent>Default side offset (4px)</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger>
					<Button>Large Offset</Button>
				</TooltipTrigger>
				<TooltipContent sideOffset={20}>
					Large side offset (20px)
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger>
					<Button>No Offset</Button>
				</TooltipTrigger>
				<TooltipContent sideOffset={0}>No side offset (0px)</TooltipContent>
			</Tooltip>
		</View>
	),
};

export const LongContent: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger>
				<Button>Long Tooltip</Button>
			</TooltipTrigger>
			<TooltipContent>
				This is a very long tooltip that demonstrates how the component handles
				longer text content. The tooltip will wrap to multiple lines and
				maintain good readability while staying within the maximum width
				constraint.
			</TooltipContent>
		</Tooltip>
	),
};

export const ProviderWithDelay: Story = {
	render: () => (
		<TooltipProvider delayDuration={200}>
			<View className="gap-4">
				<Text variant="label">Custom Provider (200ms delay)</Text>
				<View className="flex-row gap-3">
					<Tooltip>
						<TooltipTrigger>
							<Button>Fast 1</Button>
						</TooltipTrigger>
						<TooltipContent>Quick tooltip 1</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger>
							<Button>Fast 2</Button>
						</TooltipTrigger>
						<TooltipContent>Quick tooltip 2</TooltipContent>
					</Tooltip>

					<Tooltip delayDuration={1000}>
						<TooltipTrigger>
							<Button>Slow Override</Button>
						</TooltipTrigger>
						<TooltipContent>
							This one overrides the provider delay
						</TooltipContent>
					</Tooltip>
				</View>
			</View>
		</TooltipProvider>
	),
};

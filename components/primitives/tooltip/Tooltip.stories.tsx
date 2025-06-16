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
				<Button title="Hover me" />
			</TooltipTrigger>
			<TooltipContent>Add to library</TooltipContent>
		</Tooltip>
	),
};

export const WithCustomDelay: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>
					<Button title="No Delay" />
				</TooltipTrigger>
				<TooltipContent>This tooltip appears immediately</TooltipContent>
			</Tooltip>

			<Tooltip delayDuration={1000}>
				<TooltipTrigger>
					<Button title="1 Second Delay" />
				</TooltipTrigger>
				<TooltipContent>This tooltip appears after 1 second</TooltipContent>
			</Tooltip>
		</View>
	),
};

export const DifferentSides: Story = {
	render: () => (
		<View style={{ gap: 24, alignItems: "center" }}>
			<Tooltip>
				<TooltipTrigger>
					<Button title="Top Tooltip" />
				</TooltipTrigger>
				<TooltipContent side="top">This tooltip appears on top</TooltipContent>
			</Tooltip>

			<View style={{ flexDirection: "row", gap: 24 }}>
				<Tooltip>
					<TooltipTrigger>
						<Button title="Left" />
					</TooltipTrigger>
					<TooltipContent side="left">Left side</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<Button title="Right" />
					</TooltipTrigger>
					<TooltipContent side="right">Right side</TooltipContent>
				</Tooltip>
			</View>

			<Tooltip>
				<TooltipTrigger>
					<Button title="Bottom Tooltip" />
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
			<View style={{ gap: 16 }}>
				<Text variant="label">Tooltip is {open ? "open" : "closed"}</Text>
				<Tooltip open={open} onOpenChange={setOpen}>
					<TooltipTrigger>
						<Button title="Controlled Tooltip" />
					</TooltipTrigger>
					<TooltipContent>
						This tooltip is controlled by external state
					</TooltipContent>
				</Tooltip>
				<Button
					title={open ? "Close Tooltip" : "Open Tooltip"}
					onPress={() => setOpen(!open)}
					variant="secondary"
				/>
			</View>
		);
	},
};

export const HelpTooltips: Story = {
	render: () => (
		<View style={{ gap: 24 }}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<Text variant="label">Username</Text>
				<Tooltip>
					<TooltipTrigger>
						<View
							style={{
								width: 16,
								height: 16,
								borderRadius: 8,
								backgroundColor: "#6b7280",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text style={{ color: "white", fontSize: 10 }}>?</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>
						Your username must be unique and contain only letters, numbers, and
						underscores
					</TooltipContent>
				</Tooltip>
			</View>

			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<Text variant="label">Password Strength</Text>
				<Tooltip>
					<TooltipTrigger>
						<View
							style={{
								width: 16,
								height: 16,
								borderRadius: 8,
								backgroundColor: "#6b7280",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text style={{ color: "white", fontSize: 10 }}>i</Text>
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
		<View style={{ gap: 16 }}>
			<Text variant="label">Toolbar Actions</Text>
			<View style={{ flexDirection: "row", gap: 12 }}>
				<Tooltip>
					<TooltipTrigger>
						<View
							style={{
								width: 40,
								height: 40,
								borderRadius: 8,
								backgroundColor: "#f3f4f6",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text>📝</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>Edit document</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<View
							style={{
								width: 40,
								height: 40,
								borderRadius: 8,
								backgroundColor: "#f3f4f6",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text>💾</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>Save changes (Cmd+S)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<View
							style={{
								width: 40,
								height: 40,
								borderRadius: 8,
								backgroundColor: "#f3f4f6",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text>🗑️</Text>
						</View>
					</TooltipTrigger>
					<TooltipContent>Delete document</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<View
							style={{
								width: 40,
								height: 40,
								borderRadius: 8,
								backgroundColor: "#f3f4f6",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
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
				<Button title="Rich Tooltip" />
			</TooltipTrigger>
			<TooltipContent>
				<View style={{ gap: 4 }}>
					<Text style={{ fontWeight: "bold", color: "white" }}>John Doe</Text>
					<Text style={{ color: "white", opacity: 0.8 }}>
						Software Engineer
					</Text>
					<Text style={{ color: "white", opacity: 0.8 }}>Online</Text>
				</View>
			</TooltipContent>
		</Tooltip>
	),
};

export const WithSideOffset: Story = {
	render: () => (
		<View style={{ gap: 24 }}>
			<Tooltip>
				<TooltipTrigger>
					<Button title="Default Offset" />
				</TooltipTrigger>
				<TooltipContent>Default side offset (4px)</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger>
					<Button title="Large Offset" />
				</TooltipTrigger>
				<TooltipContent sideOffset={20}>
					Large side offset (20px)
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger>
					<Button title="No Offset" />
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
				<Button title="Long Tooltip" />
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

export const CustomProvider: Story = {
	render: () => (
		<TooltipProvider delayDuration={200}>
			<View style={{ gap: 16 }}>
				<Text variant="label">Custom Provider (200ms delay)</Text>
				<View style={{ flexDirection: "row", gap: 12 }}>
					<Tooltip>
						<TooltipTrigger>
							<Button title="Fast 1" />
						</TooltipTrigger>
						<TooltipContent>Quick tooltip 1</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger>
							<Button title="Fast 2" />
						</TooltipTrigger>
						<TooltipContent>Quick tooltip 2</TooltipContent>
					</Tooltip>

					<Tooltip delayDuration={1000}>
						<TooltipTrigger>
							<Button title="Slow Override" />
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

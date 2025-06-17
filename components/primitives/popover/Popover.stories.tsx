import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Separator } from "../separator/Separator";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverTrigger,
} from "./Popover";

const meta: Meta<typeof Popover> = {
	title: "Primitives/Popover",
	component: Popover,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger>
				<Button title="Open Popover" />
			</PopoverTrigger>
			<PopoverContent>
				<Text variant="body">Place content for the popover here.</Text>
			</PopoverContent>
		</Popover>
	),
};

export const WithForm: Story = {
	render: () => {
		const [name, setName] = useState("");
		const [email, setEmail] = useState("");

		return (
			<Popover>
				<PopoverTrigger>
					<Button title="Edit Profile" />
				</PopoverTrigger>
				<PopoverContent>
					<View className="gap-4">
						<Text variant="heading-md">Edit Profile</Text>
						<Text variant="body" className="text-theme-foreground-muted">
							Make changes to your profile here. Click save when you're done.
						</Text>
						<Separator />
						<View className="gap-3">
							<View className="gap-1">
								<Text variant="label">Name</Text>
								<Input
									value={name}
									onChangeText={setName}
									placeholder="Enter your name"
								/>
							</View>
							<View className="gap-1">
								<Text variant="label">Email</Text>
								<Input
									value={email}
									onChangeText={setEmail}
									placeholder="Enter your email"
									keyboardType="email-address"
								/>
							</View>
						</View>
						<Button title="Save Changes" />
					</View>
				</PopoverContent>
			</Popover>
		);
	},
};

export const ControlledPopover: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<View className="gap-4">
				<Text variant="label">Popover is {open ? "open" : "closed"}</Text>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger>
						<Button variant="primary">Controlled Popover</Button>
					</PopoverTrigger>
					<PopoverContent>
						<View className="gap-3">
							<Text variant="heading-sm">Controlled Popover</Text>
							<Text variant="body" className="text-theme-foreground-muted">
								This popover's state is controlled by the parent component.
							</Text>
						</View>
					</PopoverContent>
				</Popover>
			</View>
		);
	},
};

export const UserInfo: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger>
				<Button title="👤 @johndoe" variant="secondary" />
			</PopoverTrigger>
			<PopoverContent>
				<View className="gap-3">
					<View className="gap-1">
						<Text variant="heading-sm">John Doe</Text>
						<Text variant="caption" className="text-theme-foreground-muted">
							@johndoe
						</Text>
						<Text variant="body" className="text-theme-foreground-muted">
							Software Engineer at Acme Corp
						</Text>
					</View>
					<Separator />
					<View className="flex-row gap-4">
						<View className="gap-0.5">
							<Text variant="label">Following</Text>
							<Text variant="body">1,234</Text>
						</View>
						<View className="gap-0.5">
							<Text variant="label">Followers</Text>
							<Text variant="body">5,678</Text>
						</View>
					</View>
				</View>
			</PopoverContent>
		</Popover>
	),
};

export const HelpTooltip: Story = {
	render: () => (
		<View className="gap-4">
			<Text variant="heading-md">Settings</Text>
			<View className="flex-row items-center gap-2">
				<Text variant="label">Enable Notifications</Text>
				<Popover>
					<PopoverTrigger>
						<Button variant="secondary" className="w-6 h-6" />
					</PopoverTrigger>
					<PopoverContent>
						<View className="gap-2">
							<Text variant="heading-sm">Notifications</Text>
							<Text variant="body" className="text-theme-foreground-muted">
								Get notified about important updates and messages.
							</Text>
						</View>
					</PopoverContent>
				</Popover>
			</View>
		</View>
	),
};

export const QuickActions: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger>
				<Button title="⚡ Quick Actions" />
			</PopoverTrigger>
			<PopoverContent>
				<View className="gap-2">
					<Text variant="heading-sm">Quick Actions</Text>
					<Text variant="body" className="text-theme-foreground-muted">
						Perform common actions quickly.
					</Text>
				</View>
			</PopoverContent>
		</Popover>
	),
};

export const WithAnchor: Story = {
	render: () => (
		<View className="gap-4">
			<Text variant="heading-md">Popover with Anchor</Text>
			<Popover>
				<PopoverAnchor>
					<View className="p-4 bg-theme-background-subtle rounded border border-dashed border-theme-border items-center justify-center">
						<Text variant="body">Click me for popover</Text>
					</View>
				</PopoverAnchor>
				<PopoverTrigger>
					<Button title="Show Info" />
				</PopoverTrigger>
				<PopoverContent>
					<Text variant="body">
						This popover is anchored to the element above, but triggered by the
						button below.
					</Text>
				</PopoverContent>
			</Popover>
		</View>
	),
};

export const AlignmentOptions: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Start Aligned</Text>
				<Popover>
					<PopoverTrigger>
						<Button variant="primary">Start Aligned</Button>
					</PopoverTrigger>
					<PopoverContent align="start">
						<Text variant="body">This popover is aligned to the start.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View className="gap-2">
				<Text variant="label">Center Aligned (Default)</Text>
				<Popover>
					<PopoverTrigger>
						<Button variant="primary">Center Aligned</Button>
					</PopoverTrigger>
					<PopoverContent align="center">
						<Text variant="body">This popover is center aligned.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View className="gap-2">
				<Text variant="label">End Aligned</Text>
				<Popover>
					<PopoverTrigger>
						<Button variant="primary">End Aligned</Button>
					</PopoverTrigger>
					<PopoverContent align="end">
						<Text variant="body">This popover is aligned to the end.</Text>
					</PopoverContent>
				</Popover>
			</View>
		</View>
	),
};

export const SideOptions: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Top Side</Text>
				<Popover>
					<PopoverTrigger>
						<Button variant="primary">Top Popover</Button>
					</PopoverTrigger>
					<PopoverContent side="top">
						<Text variant="body">This popover appears on the top.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View className="gap-2">
				<Text variant="label">Bottom Side (Default)</Text>
				<Popover>
					<PopoverTrigger>
						<Button variant="primary">Bottom Popover</Button>
					</PopoverTrigger>
					<PopoverContent side="bottom">
						<Text variant="body">This popover appears on the bottom.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View className="gap-2">
				<Text variant="label">Left Side</Text>
				<Popover>
					<PopoverTrigger>
						<Button variant="primary">Left Popover</Button>
					</PopoverTrigger>
					<PopoverContent side="left">
						<Text variant="body">This popover appears on the left.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View className="gap-2">
				<Text variant="label">Right Side</Text>
				<Popover>
					<PopoverTrigger>
						<Button variant="primary">Right Popover</Button>
					</PopoverTrigger>
					<PopoverContent side="right">
						<Text variant="body">This popover appears on the right.</Text>
					</PopoverContent>
				</Popover>
			</View>
		</View>
	),
};

export const ColorPicker: Story = {
	render: () => {
		const [selectedColor, setSelectedColor] = useState("#3b82f6");

		const colors = [
			"#ef4444",
			"#f97316",
			"#f59e0b",
			"#eab308",
			"#84cc16",
			"#22c55e",
			"#10b981",
			"#14b8a6",
			"#06b6d4",
			"#0ea5e9",
			"#3b82f6",
			"#6366f1",
			"#8b5cf6",
			"#a855f7",
			"#d946ef",
			"#ec4899",
		];

		return (
			<View className="gap-4">
				<Text variant="label">Selected Color: {selectedColor}</Text>
				<Popover>
					<PopoverTrigger>
						<View
							className="w-10 h-10 rounded border border-theme-border items-center justify-center"
							style={{ backgroundColor: selectedColor }}
						>
							<Text variant="caption">{selectedColor}</Text>
						</View>
					</PopoverTrigger>
					<PopoverContent>
						<View className="gap-3">
							<Text variant="heading-sm">Choose Color</Text>
							<View className="flex-row flex-wrap gap-2">
								{colors.map((color) => (
									<Pressable
										key={color}
										className="w-8 h-8 rounded border border-gray-300"
										style={{ backgroundColor: color }}
										onPress={() => setSelectedColor(color)}
									/>
								))}
							</View>
						</View>
					</PopoverContent>
				</Popover>
			</View>
		);
	},
};

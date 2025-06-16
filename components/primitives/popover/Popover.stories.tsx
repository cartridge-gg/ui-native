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
					<View style={{ gap: 16 }}>
						<Text variant="heading-md">Edit Profile</Text>
						<Text variant="caption" color="muted">
							Make changes to your profile here. Click save when you're done.
						</Text>
						<Separator />
						<View style={{ gap: 12 }}>
							<View style={{ gap: 4 }}>
								<Text variant="label">Name</Text>
								<Input
									value={name}
									onChangeText={setName}
									placeholder="Enter your name"
								/>
							</View>
							<View style={{ gap: 4 }}>
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
			<View style={{ gap: 16 }}>
				<Text variant="label">Popover is {open ? "open" : "closed"}</Text>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger>
						<Button title="Controlled Popover" />
					</PopoverTrigger>
					<PopoverContent>
						<View style={{ gap: 12 }}>
							<Text variant="heading-sm">Controlled Popover</Text>
							<Text variant="body">
								This popover's open state is controlled by external state.
							</Text>
							<Button
								title="Close Popover"
								onPress={() => setOpen(false)}
								variant="secondary"
							/>
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
				<View style={{ gap: 12 }}>
					<View style={{ gap: 4 }}>
						<Text variant="heading-sm">John Doe</Text>
						<Text variant="caption" color="muted">
							@johndoe
						</Text>
					</View>
					<Text variant="body">
						Software engineer passionate about building great user experiences.
						Currently working on React Native applications.
					</Text>
					<Separator />
					<View style={{ flexDirection: "row", gap: 16 }}>
						<View style={{ gap: 2 }}>
							<Text variant="label">Following</Text>
							<Text variant="body">1,234</Text>
						</View>
						<View style={{ gap: 2 }}>
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
		<View style={{ gap: 16 }}>
			<Text variant="heading-md">Settings</Text>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<Text variant="label">Enable Notifications</Text>
				<Popover>
					<PopoverTrigger>
						<Button
							title="?"
							variant="secondary"
							style={{ width: 24, height: 24 }}
						/>
					</PopoverTrigger>
					<PopoverContent>
						<View style={{ gap: 8 }}>
							<Text variant="heading-sm">Notifications</Text>
							<Text variant="body">
								When enabled, you'll receive push notifications for important
								updates, messages, and reminders. You can customize notification
								preferences in your account settings.
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
				<View style={{ gap: 8 }}>
					<Text variant="heading-sm">Quick Actions</Text>
					<Separator />
					<Button title="📝 Create New Post" variant="ghost" />
					<Button title="📷 Upload Photo" variant="ghost" />
					<Button title="📊 View Analytics" variant="ghost" />
					<Button title="⚙️ Settings" variant="ghost" />
					<Separator />
					<Button title="🚪 Logout" variant="ghost" />
				</View>
			</PopoverContent>
		</Popover>
	),
};

export const WithAnchor: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			<Text variant="heading-md">Popover with Anchor</Text>
			<Popover>
				<PopoverAnchor>
					<View
						style={{
							padding: 16,
							backgroundColor: "#f0f0f0",
							borderRadius: 8,
							alignItems: "center",
						}}
					>
						<Text variant="body">This is the anchor element</Text>
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
		<View style={{ gap: 24 }}>
			<View style={{ gap: 8 }}>
				<Text variant="label">Start Aligned</Text>
				<Popover>
					<PopoverTrigger>
						<Button title="Start Aligned Popover" />
					</PopoverTrigger>
					<PopoverContent align="start">
						<Text variant="body">This popover is aligned to the start.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Center Aligned (Default)</Text>
				<Popover>
					<PopoverTrigger>
						<Button title="Center Aligned Popover" />
					</PopoverTrigger>
					<PopoverContent align="center">
						<Text variant="body">This popover is center aligned.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">End Aligned</Text>
				<Popover>
					<PopoverTrigger>
						<Button title="End Aligned Popover" />
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
		<View style={{ gap: 24 }}>
			<View style={{ gap: 8 }}>
				<Text variant="label">Top Side</Text>
				<Popover>
					<PopoverTrigger>
						<Button title="Top Popover" />
					</PopoverTrigger>
					<PopoverContent side="top">
						<Text variant="body">This popover appears on the top.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Bottom Side (Default)</Text>
				<Popover>
					<PopoverTrigger>
						<Button title="Bottom Popover" />
					</PopoverTrigger>
					<PopoverContent side="bottom">
						<Text variant="body">This popover appears on the bottom.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Left Side</Text>
				<Popover>
					<PopoverTrigger>
						<Button title="Left Popover" />
					</PopoverTrigger>
					<PopoverContent side="left">
						<Text variant="body">This popover appears on the left.</Text>
					</PopoverContent>
				</Popover>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Right Side</Text>
				<Popover>
					<PopoverTrigger>
						<Button title="Right Popover" />
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
			<View style={{ gap: 16 }}>
				<Text variant="label">Selected Color: {selectedColor}</Text>
				<Popover>
					<PopoverTrigger>
						<View
							style={{
								width: 40,
								height: 40,
								backgroundColor: selectedColor,
								borderRadius: 8,
								borderWidth: 2,
								borderColor: "#e5e7eb",
							}}
						/>
					</PopoverTrigger>
					<PopoverContent>
						<View style={{ gap: 12 }}>
							<Text variant="heading-sm">Choose Color</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									gap: 8,
									width: 200,
								}}
							>
								{colors.map((color) => (
									<Pressable
										key={color}
										style={{
											width: 32,
											height: 32,
											backgroundColor: color,
											borderRadius: 6,
											borderWidth: selectedColor === color ? 3 : 1,
											borderColor: selectedColor === color ? "#000" : "#e5e7eb",
										}}
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

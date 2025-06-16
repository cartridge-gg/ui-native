import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
	title: "Primitives/Dropdown Menu",
	component: DropdownMenu,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>Open Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithLabelsAndSeparators: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>My Account</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithShortcuts: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>File Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					New File
					<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Open
					<DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Save
					<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Print
					<DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithCheckboxItems: Story = {
	render: () => {
		const [showStatusBar, setShowStatusBar] = useState(true);
		const [showActivityBar, setShowActivityBar] = useState(false);
		const [showPanel, setShowPanel] = useState(true);

		return (
			<View style={{ gap: 16 }}>
				<Text variant="label">
					Status Bar: {showStatusBar ? "On" : "Off"}, Activity Bar:{" "}
					{showActivityBar ? "On" : "Off"}, Panel: {showPanel ? "On" : "Off"}
				</Text>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button>View Options</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Appearance</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem
							checked={showStatusBar}
							onCheckedChange={setShowStatusBar}
						>
							Status Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={showActivityBar}
							onCheckedChange={setShowActivityBar}
						>
							Activity Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={showPanel}
							onCheckedChange={setShowPanel}
						>
							Panel
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</View>
		);
	},
};

export const WithRadioGroup: Story = {
	render: () => {
		const [theme, setTheme] = useState("light");

		return (
			<View style={{ gap: 16 }}>
				<Text variant="label">Current Theme: {theme}</Text>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button>Theme Settings</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Theme</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
							<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="system">
								System
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</View>
		);
	},
};

export const ControlledMenu: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<View style={{ gap: 16 }}>
				<Text variant="label">Menu is {open ? "open" : "closed"}</Text>
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger>
						<Button>Controlled Menu</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</View>
		);
	},
};

export const WithDisabledItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>Actions</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Copy</DropdownMenuItem>
				<DropdownMenuItem disabled>Paste (Disabled)</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const UserAccountMenu: Story = {
	render: () => {
		const [notifications, setNotifications] = useState(true);
		const [marketing, setMarketing] = useState(false);
		const [status, setStatus] = useState("online");

		return (
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button variant="secondary">👤 John Doe</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />

					<DropdownMenuLabel>Preferences</DropdownMenuLabel>
					<DropdownMenuCheckboxItem
						checked={notifications}
						onCheckedChange={setNotifications}
					>
						Email Notifications
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={marketing}
						onCheckedChange={setMarketing}
					>
						Marketing Emails
					</DropdownMenuCheckboxItem>
					<DropdownMenuSeparator />

					<DropdownMenuLabel>Status</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
						<DropdownMenuRadioItem value="online">
							🟢 Online
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="away">🟡 Away</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="busy">🔴 Busy</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="offline">
							⚫ Offline
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
					<DropdownMenuSeparator />

					<DropdownMenuItem>
						Logout
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
};

export const EditorContextMenu: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>Right Click Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					Cut
					<DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Copy
					<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Paste
					<DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Select All
					<DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Find
					<DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Replace
					<DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const GroupedItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>Grouped Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Navigation</DropdownMenuLabel>
					<DropdownMenuItem>Dashboard</DropdownMenuItem>
					<DropdownMenuItem>Projects</DropdownMenuItem>
					<DropdownMenuItem>Tasks</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>Account</DropdownMenuLabel>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Help</DropdownMenuItem>
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const InsetItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>Inset Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>File Operations</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>New File</DropdownMenuItem>
				<DropdownMenuItem inset>New Folder</DropdownMenuItem>
				<DropdownMenuItem inset>New Project</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Open</DropdownMenuItem>
				<DropdownMenuItem inset>Open Recent</DropdownMenuItem>
				<DropdownMenuItem inset>Open Workspace</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

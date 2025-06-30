import { PortalHost } from "@rn-primitives/portal";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "#components";

const meta: Meta = {
	title: "Primitives/Menubar",
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => {
			return (
				<>
					<Story />
					<PortalHost />
				</>
			);
		},
	],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>(undefined);

		return (
			<Menubar value={value} onValueChange={setValue}>
				<MenubarMenu value="file">
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const MultipleMenus: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>(undefined);

		return (
			<Menubar value={value} onValueChange={setValue}>
				<MenubarMenu value="file">
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New Tab</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu value="edit">
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>Undo</MenubarItem>
						<MenubarItem>Redo</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Cut</MenubarItem>
						<MenubarItem>Copy</MenubarItem>
						<MenubarItem>Paste</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu value="view">
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>Zoom In</MenubarItem>
						<MenubarItem>Zoom Out</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Full Screen</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const WithCheckboxItems: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>(undefined);
		const [showBookmarks, setShowBookmarks] = useState(true);
		const [showUrls, setShowUrls] = useState(false);

		return (
			<Menubar value={value} onValueChange={setValue}>
				<MenubarMenu value="view">
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarCheckboxItem
							checked={showBookmarks}
							onCheckedChange={setShowBookmarks}
						>
							Show Bookmarks
						</MenubarCheckboxItem>
						<MenubarCheckboxItem
							checked={showUrls}
							onCheckedChange={setShowUrls}
						>
							Show Full URLs
						</MenubarCheckboxItem>
						<MenubarSeparator />
						<MenubarItem>Reload</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const WithRadioGroup: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>(undefined);
		const [theme, setTheme] = useState("light");

		return (
			<Menubar value={value} onValueChange={setValue}>
				<MenubarMenu value="settings">
					<MenubarTrigger>Settings</MenubarTrigger>
					<MenubarContent>
						<MenubarLabel>Theme</MenubarLabel>
						<MenubarRadioGroup value={theme} onValueChange={setTheme}>
							<MenubarRadioItem value="light">Light</MenubarRadioItem>
							<MenubarRadioItem value="dark">Dark</MenubarRadioItem>
							<MenubarRadioItem value="system">System</MenubarRadioItem>
						</MenubarRadioGroup>
						<MenubarSeparator />
						<MenubarItem>Preferences</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const WithSubMenus: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>(undefined);

		return (
			<Menubar value={value} onValueChange={setValue}>
				<MenubarMenu value="file">
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New Tab</MenubarItem>
						<MenubarSub>
							<MenubarSubTrigger>New</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem>Document</MenubarItem>
								<MenubarItem>Spreadsheet</MenubarItem>
								<MenubarItem>Presentation</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarSeparator />
						<MenubarItem>Open</MenubarItem>
						<MenubarItem>Save</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const WithGroups: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>(undefined);

		return (
			<Menubar value={value} onValueChange={setValue}>
				<MenubarMenu value="edit">
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarGroup>
							<MenubarLabel>History</MenubarLabel>
							<MenubarItem>Undo</MenubarItem>
							<MenubarItem>Redo</MenubarItem>
						</MenubarGroup>
						<MenubarSeparator />
						<MenubarGroup>
							<MenubarLabel>Clipboard</MenubarLabel>
							<MenubarItem>Cut</MenubarItem>
							<MenubarItem>Copy</MenubarItem>
							<MenubarItem>Paste</MenubarItem>
						</MenubarGroup>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const Disabled: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>(undefined);

		return (
			<Menubar value={value} onValueChange={setValue}>
				<MenubarMenu value="file">
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>New Tab</MenubarItem>
						<MenubarItem disabled>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarItem disabled>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const OpenByDefault: Story = {
	render: () => {
		const [value, setValue] = useState<string | undefined>("file");

		return (
			<Menubar value={value} onValueChange={setValue}>
				<MenubarMenu value="file">
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>New Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Share</MenubarItem>
						<MenubarItem>Print</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu value="edit">
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>Undo</MenubarItem>
						<MenubarItem>Redo</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Cut</MenubarItem>
						<MenubarItem>Copy</MenubarItem>
						<MenubarItem>Paste</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

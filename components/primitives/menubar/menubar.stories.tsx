import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "./menubar";

const meta: Meta<typeof Menubar> = {
	title: "Primitives/Menubar",
	component: Menubar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Menubar>
			<MenubarMenu>
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
	),
};

export const MultipleMenus: Story = {
	render: () => (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>New File</MenubarItem>
					<MenubarItem>Open File</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Save</MenubarItem>
					<MenubarItem>Save As...</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Exit</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Undo <MenubarShortcut>⌘Z</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Redo <MenubarShortcut>⌘⇧Z</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Cut <MenubarShortcut>⌘X</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Copy <MenubarShortcut>⌘C</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Paste <MenubarShortcut>⌘V</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Reset Zoom <MenubarShortcut>⌘0</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Toggle Fullscreen <MenubarShortcut>F11</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	),
};

export const WithCheckboxItems: Story = {
	render: () => {
		const [showToolbar, setShowToolbar] = React.useState(true);
		const [showSidebar, setShowSidebar] = React.useState(false);
		const [showStatusBar, setShowStatusBar] = React.useState(true);

		return (
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarLabel>Appearance</MenubarLabel>
						<MenubarSeparator />
						<MenubarCheckboxItem
							checked={showToolbar}
							onCheckedChange={setShowToolbar}
						>
							Show Toolbar
						</MenubarCheckboxItem>
						<MenubarCheckboxItem
							checked={showSidebar}
							onCheckedChange={setShowSidebar}
						>
							Show Sidebar
						</MenubarCheckboxItem>
						<MenubarCheckboxItem
							checked={showStatusBar}
							onCheckedChange={setShowStatusBar}
						>
							Show Status Bar
						</MenubarCheckboxItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const WithRadioItems: Story = {
	render: () => {
		const [theme, setTheme] = React.useState("light");

		return (
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>Settings</MenubarTrigger>
					<MenubarContent>
						<MenubarLabel>Theme</MenubarLabel>
						<MenubarSeparator />
						<MenubarRadioGroup>
							<MenubarRadioItem
								value="light"
								checked={theme === "light"}
								onSelect={setTheme}
							>
								Light
							</MenubarRadioItem>
							<MenubarRadioItem
								value="dark"
								checked={theme === "dark"}
								onSelect={setTheme}
							>
								Dark
							</MenubarRadioItem>
							<MenubarRadioItem
								value="system"
								checked={theme === "system"}
								onSelect={setTheme}
							>
								System
							</MenubarRadioItem>
						</MenubarRadioGroup>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

export const ComplexMenubar: Story = {
	render: () => {
		const [recentFiles] = React.useState([
			"document1.txt",
			"presentation.pptx",
			"spreadsheet.xlsx",
		]);

		return (
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New <MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Open <MenubarShortcut>⌘O</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarLabel>Recent Files</MenubarLabel>
						{recentFiles.map((file, index) => (
							<MenubarItem key={index} inset>
								{file}
							</MenubarItem>
						))}
						<MenubarSeparator />
						<MenubarItem>
							Save <MenubarShortcut>⌘S</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Save As... <MenubarShortcut>⌘⇧S</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem disabled>
							Print <MenubarShortcut>⌘P</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger>Help</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>Documentation</MenubarItem>
						<MenubarItem>Keyboard Shortcuts</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>Report Bug</MenubarItem>
						<MenubarItem>Feature Request</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>About</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	},
};

import type React from "react";
import { createContext, useContext, useState } from "react";
import {
	Modal,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { WedgeIcon } from "../../icons/directional/WedgeIcon";
import { CheckIcon } from "../../icons/state/CheckIcon";
import { CircleIcon } from "../../icons/utility/CircleIcon";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

// MenuBar Context
interface MenuBarContextType {
	activeMenu: string | null;
	setActiveMenu: (menu: string | null) => void;
}

const MenuBarContext = createContext<MenuBarContextType | undefined>(undefined);

const useMenuBar = () => {
	const context = useContext(MenuBarContext);
	if (!context) {
		throw new Error("MenuBar components must be used within a MenuBar");
	}
	return context;
};

// MenuBar Root Component
interface MenubarProps {
	children: React.ReactNode;
	className?: string;
}

export const Menubar: React.FC<MenubarProps> = ({ children, className }) => {
	const [activeMenu, setActiveMenu] = useState<string | null>(null);

	return (
		<MenuBarContext.Provider value={{ activeMenu, setActiveMenu }}>
			<View
				className={cn(
					"flex-row items-center h-9 bg-theme-background border border-theme-border rounded-md p-1 gap-1 shadow-sm",
					className,
				)}
			>
				{children}
			</View>
		</MenuBarContext.Provider>
	);
};

// MenuBar Menu Component
interface MenubarMenuProps {
	children: React.ReactNode;
	value?: string;
}

export const MenubarMenu: React.FC<MenubarMenuProps> = ({
	children,
	value = "menu",
}) => {
	return <>{children}</>;
};

// MenuBar Trigger Component
interface MenubarTriggerProps {
	children: React.ReactNode;
	className?: string;
}

export const MenubarTrigger: React.FC<MenubarTriggerProps> = ({
	children,
	className,
}) => {
	const { activeMenu, setActiveMenu } = useMenuBar();
	const menuId = typeof children === "string" ? children : "menu";
	const isActive = activeMenu === menuId;

	return (
		<TouchableOpacity
			className={cn(
				"px-3 py-1 rounded",
				isActive ? "bg-theme-background-muted" : "bg-transparent",
				className,
			)}
			onPress={() => setActiveMenu(isActive ? null : menuId)}
			activeOpacity={0.7}
		>
			<Text
				variant="sans-medium-14"
				className={cn(
					isActive ? "text-theme-foreground-subtle" : "text-theme-foreground",
				)}
			>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

// MenuBar Content Component
interface MenubarContentProps {
	children: React.ReactNode;
	align?: "start" | "center" | "end";
	alignOffset?: number;
	sideOffset?: number;
	className?: string;
}

export const MenubarContent: React.FC<MenubarContentProps> = ({
	children,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	className,
}) => {
	const { activeMenu, setActiveMenu } = useMenuBar();
	const isVisible = activeMenu !== null;

	return (
		<Modal
			visible={isVisible}
			transparent
			animationType="fade"
			onRequestClose={() => setActiveMenu(null)}
		>
			<TouchableWithoutFeedback onPress={() => setActiveMenu(null)}>
				<View className="flex-1 bg-black/30">
					<TouchableWithoutFeedback>
						<View
							className={cn(
								"absolute top-12 left-5 min-w-48 bg-theme-background-subtle border border-theme-border rounded-md p-1 shadow-lg z-50",
								className,
							)}
						>
							{children}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

// MenuBar Item Component
interface MenubarItemProps {
	children: React.ReactNode;
	onPress?: () => void;
	disabled?: boolean;
	inset?: boolean;
	className?: string;
}

export const MenubarItem: React.FC<MenubarItemProps> = ({
	children,
	onPress,
	disabled = false,
	inset = false,
	className,
}) => {
	const { setActiveMenu } = useMenuBar();

	const handlePress = () => {
		if (!disabled) {
			onPress?.();
			setActiveMenu(null);
		}
	};

	return (
		<TouchableOpacity
			className={cn(
				"flex-row items-center px-2 py-1.5 rounded",
				inset && "pl-8",
				disabled && "opacity-50",
				className,
			)}
			onPress={handlePress}
			disabled={disabled}
			activeOpacity={0.7}
		>
			<Text variant="body" className="text-theme-foreground">
				{children}
			</Text>
		</TouchableOpacity>
	);
};

// MenuBar Separator Component
interface MenubarSeparatorProps {
	className?: string;
}

export const MenubarSeparator: React.FC<MenubarSeparatorProps> = ({
	className,
}) => {
	return (
		<View
			className={cn("h-px bg-theme-background-subtle my-1 -mx-1", className)}
		/>
	);
};

// MenuBar Shortcut Component
interface MenubarShortcutProps {
	children: React.ReactNode;
	className?: string;
}

export const MenubarShortcut: React.FC<MenubarShortcutProps> = ({
	children,
	className,
}) => {
	return (
		<Text
			variant="caption"
			className={cn("ml-auto text-theme-foreground-muted", className)}
		>
			{children}
		</Text>
	);
};

// Additional components for API compatibility
export const MenubarGroup: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};

export const MenubarPortal: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};

export const MenubarSub: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};

export const MenubarRadioGroup: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};

export const MenubarLabel: React.FC<{
	children: React.ReactNode;
	inset?: boolean;
	className?: string;
}> = ({ children, inset = false, className }) => {
	return (
		<Text
			variant="sans-semibold-14"
			className={cn(
				"px-2 py-1.5 text-theme-foreground",
				inset && "pl-8",
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const MenubarCheckboxItem: React.FC<{
	children: React.ReactNode;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	className?: string;
}> = ({
	children,
	checked = false,
	onCheckedChange,
	disabled = false,
	className,
}) => {
	const { setActiveMenu } = useMenuBar();

	const handlePress = () => {
		if (!disabled) {
			onCheckedChange?.(!checked);
			setActiveMenu(null);
		}
	};

	return (
		<TouchableOpacity
			className={cn(
				"flex-row items-center pl-8 pr-2 py-1.5 rounded",
				disabled && "opacity-50",
				className,
			)}
			onPress={handlePress}
			disabled={disabled}
			activeOpacity={0.7}
		>
			<View className="absolute left-2 w-3.5 h-3.5 justify-center items-center">
				{checked && <CheckIcon size="xs" variant="solid" />}
			</View>
			<Text variant="body" className="text-theme-foreground">
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export const MenubarRadioItem: React.FC<{
	children: React.ReactNode;
	value: string;
	checked?: boolean;
	onSelect?: (value: string) => void;
	disabled?: boolean;
	className?: string;
}> = ({
	children,
	value,
	checked = false,
	onSelect,
	disabled = false,
	className,
}) => {
	const { setActiveMenu } = useMenuBar();

	const handlePress = () => {
		if (!disabled) {
			onSelect?.(value);
			setActiveMenu(null);
		}
	};

	return (
		<TouchableOpacity
			className={cn(
				"flex-row items-center pl-8 pr-2 py-1.5 rounded",
				disabled && "opacity-50",
				className,
			)}
			onPress={handlePress}
			disabled={disabled}
			activeOpacity={0.7}
		>
			<View className="absolute left-2 w-3.5 h-3.5 justify-center items-center">
				{checked && <CircleIcon size="xs" />}
			</View>
			<Text variant="body" className="text-theme-foreground">
				{children}
			</Text>
		</TouchableOpacity>
	);
};

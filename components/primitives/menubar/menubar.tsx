import type React from "react";
import { createContext, useContext, useState } from "react";
import {
	Modal,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { WedgeIcon } from "../../icons/directional/WedgeIcon";
import { CheckIcon } from "../../icons/state/CheckIcon";
import { CircleIcon } from "../../icons/utility/CircleIcon";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";

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

export const Menubar: React.FC<MenubarProps> = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState<string | null>(null);
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			height: 36, // h-9 equivalent
			backgroundColor: colors.background[100],
			borderWidth: 1,
			borderColor: colors.border[200],
			borderRadius: 6,
			padding: 4,
			gap: 4,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 2,
			elevation: 2,
		},
	});

	return (
		<MenuBarContext.Provider value={{ activeMenu, setActiveMenu }}>
			<View style={styles.container}>{children}</View>
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

export const MenubarTrigger: React.FC<MenubarTriggerProps> = ({ children }) => {
	const { activeMenu, setActiveMenu } = useMenuBar();
	const { colors } = useTheme();
	const menuId = typeof children === "string" ? children : "menu";
	const isActive = activeMenu === menuId;

	const styles = StyleSheet.create({
		trigger: {
			paddingHorizontal: 12,
			paddingVertical: 4,
			borderRadius: 4,
			backgroundColor: isActive ? colors.background[500] : "transparent",
		},
		text: {
			color: isActive ? colors.foreground[200] : colors.foreground[100],
		},
	});

	return (
		<TouchableOpacity
			style={styles.trigger}
			onPress={() => setActiveMenu(isActive ? null : menuId)}
			activeOpacity={0.7}
		>
			<Text variant="sans-medium-14" style={styles.text}>
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
}) => {
	const { activeMenu, setActiveMenu } = useMenuBar();
	const { colors } = useTheme();
	const isVisible = activeMenu !== null;

	const styles = StyleSheet.create({
		overlay: {
			flex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.3)",
		},
		content: {
			position: "absolute",
			top: 50, // Approximate position below menubar
			left: 20,
			minWidth: 192, // min-w-[12rem]
			backgroundColor: colors.background[200],
			borderWidth: 1,
			borderColor: colors.border[200],
			borderRadius: 6,
			padding: 4,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
			zIndex: 50,
		},
	});

	return (
		<Modal
			visible={isVisible}
			transparent
			animationType="fade"
			onRequestClose={() => setActiveMenu(null)}
		>
			<TouchableWithoutFeedback onPress={() => setActiveMenu(null)}>
				<View style={styles.overlay}>
					<TouchableWithoutFeedback>
						<View style={styles.content}>{children}</View>
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
}) => {
	const { setActiveMenu } = useMenuBar();
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		item: {
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: inset ? 32 : 8,
			paddingVertical: 6,
			borderRadius: 4,
			opacity: disabled ? 0.5 : 1,
		},
		text: {
			color: colors.foreground[100],
		},
	});

	const handlePress = () => {
		if (!disabled) {
			onPress?.();
			setActiveMenu(null);
		}
	};

	return (
		<TouchableOpacity
			style={styles.item}
			onPress={handlePress}
			disabled={disabled}
			activeOpacity={0.7}
		>
			<Text variant="body" style={styles.text}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

// MenuBar Separator Component
interface MenubarSeparatorProps {
	className?: string;
}

export const MenubarSeparator: React.FC<MenubarSeparatorProps> = () => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		separator: {
			height: 1,
			backgroundColor: colors.background[200],
			marginVertical: 4,
			marginHorizontal: -4,
		},
	});

	return <View style={styles.separator} />;
};

// MenuBar Shortcut Component
interface MenubarShortcutProps {
	children: React.ReactNode;
	className?: string;
}

export const MenubarShortcut: React.FC<MenubarShortcutProps> = ({
	children,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		shortcut: {
			marginLeft: "auto",
			color: colors.foreground[400],
		},
	});

	return (
		<Text variant="caption" style={styles.shortcut}>
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
}> = ({ children, inset = false }) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		label: {
			paddingHorizontal: inset ? 32 : 8,
			paddingVertical: 6,
			color: colors.foreground[100],
		},
	});

	return (
		<Text variant="sans-semibold-14" style={styles.label}>
			{children}
		</Text>
	);
};

export const MenubarCheckboxItem: React.FC<{
	children: React.ReactNode;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
}> = ({ children, checked = false, onCheckedChange, disabled = false }) => {
	const { setActiveMenu } = useMenuBar();
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		item: {
			flexDirection: "row",
			alignItems: "center",
			paddingLeft: 32,
			paddingRight: 8,
			paddingVertical: 6,
			borderRadius: 4,
			opacity: disabled ? 0.5 : 1,
		},
		indicator: {
			position: "absolute",
			left: 8,
			width: 14,
			height: 14,
			justifyContent: "center",
			alignItems: "center",
		},
		text: {
			color: colors.foreground[100],
		},
	});

	const handlePress = () => {
		if (!disabled) {
			onCheckedChange?.(!checked);
			setActiveMenu(null);
		}
	};

	return (
		<TouchableOpacity
			style={styles.item}
			onPress={handlePress}
			disabled={disabled}
			activeOpacity={0.7}
		>
			<View style={styles.indicator}>
				{checked && (
					<CheckIcon size="xs" variant="solid" color={colors.foreground[100]} />
				)}
			</View>
			<Text variant="body" style={styles.text}>
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
}> = ({ children, value, checked = false, onSelect, disabled = false }) => {
	const { setActiveMenu } = useMenuBar();
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		item: {
			flexDirection: "row",
			alignItems: "center",
			paddingLeft: 32,
			paddingRight: 8,
			paddingVertical: 6,
			borderRadius: 4,
			opacity: disabled ? 0.5 : 1,
		},
		indicator: {
			position: "absolute",
			left: 8,
			width: 14,
			height: 14,
			justifyContent: "center",
			alignItems: "center",
		},
		text: {
			color: colors.foreground[100],
		},
	});

	const handlePress = () => {
		if (!disabled) {
			onSelect?.(value);
			setActiveMenu(null);
		}
	};

	return (
		<TouchableOpacity
			style={styles.item}
			onPress={handlePress}
			disabled={disabled}
			activeOpacity={0.7}
		>
			<View style={styles.indicator}>
				{checked && <CircleIcon size="xs" color={colors.foreground[100]} />}
			</View>
			<Text variant="body" style={styles.text}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

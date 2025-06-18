import React, { createContext, useContext, useMemo, useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";

// Command Context
interface CommandContextType {
	search: string;
	setSearch: (search: string) => void;
	onSelect?: (value: string) => void;
}

const CommandContext = createContext<CommandContextType | null>(null);

export interface CommandProps {
	children: React.ReactNode;
	onSelect?: (value: string) => void;
	style?: ViewStyle;
}

export const Command: React.FC<CommandProps> = ({
	children,
	onSelect,
	style,
}) => {
	const [search, setSearch] = useState("");
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: colors.background[200],
			borderRadius: 8,
			borderWidth: 1,
			borderColor: colors.background[300],
			overflow: "hidden",
		},
	});

	return (
		<CommandContext.Provider value={{ search, setSearch, onSelect }}>
			<View style={[styles.container, style]}>{children}</View>
		</CommandContext.Provider>
	);
};

export interface CommandInputProps {
	placeholder?: string;
	style?: ViewStyle;
	inputStyle?: TextStyle;
}

export const CommandInput: React.FC<CommandInputProps> = ({
	placeholder = "Type a command or search...",
	style,
	inputStyle,
}) => {
	const context = useContext(CommandContext);
	const { colors } = useTheme();

	if (!context) {
		throw new Error("CommandInput must be used within a Command");
	}

	const { search, setSearch } = context;

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			borderBottomWidth: 1,
			borderBottomColor: colors.background[300],
			paddingHorizontal: 12,
			gap: 8,
		},
		icon: {
			fontSize: 16,
			color: colors.foreground[400],
			opacity: 0.5,
		},
		input: {
			flex: 1,
			height: 40,
			fontSize: 14,
			color: colors.foreground[200],
			backgroundColor: "transparent",
		},
	});

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.icon}>🔍</Text>
			<TextInput
				style={[styles.input, inputStyle]}
				value={search}
				onChangeText={setSearch}
				placeholder={placeholder}
				placeholderTextColor={colors.foreground[400]}
				autoCapitalize="none"
				autoCorrect={false}
			/>
		</View>
	);
};

export interface CommandListProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CommandList: React.FC<CommandListProps> = ({
	children,
	style,
}) => {
	const styles = StyleSheet.create({
		list: {
			maxHeight: 300,
		},
	});

	return (
		<ScrollView
			style={[styles.list, style]}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps="handled"
		>
			{children}
		</ScrollView>
	);
};

export interface CommandEmptyProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CommandEmpty: React.FC<CommandEmptyProps> = ({
	children,
	style,
}) => {
	const context = useContext(CommandContext);
	const { colors } = useTheme();

	if (!context) {
		throw new Error("CommandEmpty must be used within a Command");
	}

	const styles = StyleSheet.create({
		container: {
			paddingVertical: 24,
			alignItems: "center",
		},
		text: {
			fontSize: 14,
			color: colors.foreground[400],
			textAlign: "center",
		},
	});

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.text}>{children}</Text>
		</View>
	);
};

export interface CommandGroupProps {
	heading?: string;
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CommandGroup: React.FC<CommandGroupProps> = ({
	heading,
	children,
	style,
}) => {
	const context = useContext(CommandContext);
	const { colors } = useTheme();

	if (!context) {
		throw new Error("CommandGroup must be used within a Command");
	}

	const { search } = context;

	// Filter children based on search
	const filteredChildren = useMemo(() => {
		if (!search) return children;

		return React.Children.toArray(children).filter((child) => {
			if (React.isValidElement(child) && child.props.children) {
				const text =
					typeof child.props.children === "string" ? child.props.children : "";
				return text.toLowerCase().includes(search.toLowerCase());
			}
			return true;
		});
	}, [children, search]);

	// Don't render if no children match search
	if (search && filteredChildren.length === 0) {
		return null;
	}

	const styles = StyleSheet.create({
		container: {
			padding: 4,
		},
		heading: {
			paddingHorizontal: 8,
			paddingVertical: 6,
			fontSize: 12,
			fontWeight: "500",
			color: colors.foreground[400],
		},
	});

	return (
		<View style={[styles.container, style]}>
			{heading && <Text style={styles.heading}>{heading}</Text>}
			{filteredChildren}
		</View>
	);
};

export interface CommandSeparatorProps {
	style?: ViewStyle;
}

export const CommandSeparator: React.FC<CommandSeparatorProps> = ({
	style,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		separator: {
			height: 1,
			backgroundColor: colors.background[300],
			marginHorizontal: -4,
			marginVertical: 4,
		},
	});

	return <View style={[styles.separator, style]} />;
};

export interface CommandItemProps {
	value?: string;
	children: React.ReactNode;
	onSelect?: () => void;
	disabled?: boolean;
	style?: ViewStyle;
}

export const CommandItem: React.FC<CommandItemProps> = ({
	value,
	children,
	onSelect,
	disabled = false,
	style,
}) => {
	const context = useContext(CommandContext);
	const { colors } = useTheme();

	if (!context) {
		throw new Error("CommandItem must be used within a Command");
	}

	const { search, onSelect: contextOnSelect } = context;

	// Filter based on search
	const text = typeof children === "string" ? children : "";
	const isVisible =
		!search || text.toLowerCase().includes(search.toLowerCase());

	if (!isVisible) {
		return null;
	}

	const handlePress = () => {
		if (disabled) return;
		onSelect?.();
		contextOnSelect?.(value || text);
	};

	const styles = StyleSheet.create({
		item: {
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 8,
			paddingVertical: 6,
			borderRadius: 4,
			opacity: disabled ? 0.5 : 1,
		},
		text: {
			fontSize: 14,
			color: colors.foreground[200],
		},
	});

	return (
		<Pressable
			style={[styles.item, style]}
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="menuitem"
			accessibilityState={{ disabled }}
		>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
};

export interface CommandShortcutProps {
	children: React.ReactNode;
	style?: any;
}

export const CommandShortcut: React.FC<CommandShortcutProps> = ({
	children,
	style,
}) => {
	const { colors } = useTheme();

	return (
		<Text
			style={[
				{
					marginLeft: "auto",
					fontSize: 12,
					color: colors.foreground[400],
					opacity: 0.6,
				},
				style,
			]}
		>
			{children}
		</Text>
	);
};

// Command Dialog for modal usage
export interface CommandDialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

export const CommandDialog: React.FC<CommandDialogProps> = ({
	open = false,
	onOpenChange,
	children,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		overlay: {
			flex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			justifyContent: "center",
			alignItems: "center",
			padding: 16,
		},
		content: {
			backgroundColor: colors.background[200],
			borderRadius: 8,
			borderWidth: 1,
			borderColor: colors.background[300],
			width: "100%",
			maxWidth: 400,
			maxHeight: "80%",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
		},
	});

	if (!open) return null;

	return (
		<View style={styles.overlay}>
			<Pressable style={styles.overlay} onPress={() => onOpenChange?.(false)}>
				<Pressable style={styles.content} onPress={(e) => e.stopPropagation()}>
					{children}
				</Pressable>
			</Pressable>
		</View>
	);
};

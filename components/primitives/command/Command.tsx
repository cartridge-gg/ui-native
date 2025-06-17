import React, { createContext, useContext, useState, useMemo } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

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
	className?: string;
}

export const Command: React.FC<CommandProps> = ({
	children,
	onSelect,
	className,
}) => {
	const [search, setSearch] = useState("");

	return (
		<CommandContext.Provider value={{ search, setSearch, onSelect }}>
			<View
				className={cn(
					"bg-background-200 rounded-lg border border-background-300 overflow-hidden",
					className,
				)}
			>
				{children}
			</View>
		</CommandContext.Provider>
	);
};

export interface CommandInputProps {
	placeholder?: string;
	className?: string;
	inputClassName?: string;
}

export const CommandInput: React.FC<CommandInputProps> = ({
	placeholder = "Type a command or search...",
	className,
	inputClassName,
}) => {
	const context = useContext(CommandContext);

	if (!context) {
		throw new Error("CommandInput must be used within a Command");
	}

	const { search, setSearch } = context;

	return (
		<View
			className={cn(
				"flex-row items-center border-b border-background-300 px-3 gap-2",
				className,
			)}
		>
			<Text className="text-base text-foreground-400 opacity-50">🔍</Text>
			<TextInput
				className={cn(
					"flex-1 h-10 text-sm text-foreground-200 bg-transparent",
					inputClassName,
				)}
				value={search}
				onChangeText={setSearch}
				placeholder={placeholder}
				placeholderTextColor="rgba(255, 255, 255, 0.4)"
				autoCapitalize="none"
				autoCorrect={false}
			/>
		</View>
	);
};

export interface CommandListProps {
	children: React.ReactNode;
	className?: string;
}

export const CommandList: React.FC<CommandListProps> = ({
	children,
	className,
}) => {
	return (
		<ScrollView
			className={cn("max-h-75", className)}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps="handled"
		>
			{children}
		</ScrollView>
	);
};

export interface CommandEmptyProps {
	children: React.ReactNode;
	className?: string;
}

export const CommandEmpty: React.FC<CommandEmptyProps> = ({
	children,
	className,
}) => {
	const context = useContext(CommandContext);

	if (!context) {
		throw new Error("CommandEmpty must be used within a Command");
	}

	return (
		<View className={cn("py-6 items-center", className)}>
			<Text className="text-sm text-foreground-400 text-center">
				{children}
			</Text>
		</View>
	);
};

export interface CommandGroupProps {
	heading?: string;
	children: React.ReactNode;
	className?: string;
}

export const CommandGroup: React.FC<CommandGroupProps> = ({
	heading,
	children,
	className,
}) => {
	const context = useContext(CommandContext);

	if (!context) {
		throw new Error("CommandGroup must be used within a Command");
	}

	const { search } = context;

	// Filter children based on search
	const filteredChildren = useMemo(() => {
		if (!search) return children;

		return React.Children.toArray(children).filter((child) => {
			if (React.isValidElement(child) && (child.props as any).children) {
				const text =
					typeof (child.props as any).children === "string"
						? (child.props as any).children
						: "";
				return text.toLowerCase().includes(search.toLowerCase());
			}
			return true;
		});
	}, [children, search]);

	// Don't render if no children match search
	const filteredArray = React.Children.toArray(filteredChildren);
	if (search && filteredArray.length === 0) {
		return null;
	}

	return (
		<View className={cn("p-1", className)}>
			{heading && (
				<Text className="px-2 py-1.5 text-xs font-medium text-foreground-400">
					{heading}
				</Text>
			)}
			{filteredChildren}
		</View>
	);
};

export interface CommandSeparatorProps {
	className?: string;
}

export const CommandSeparator: React.FC<CommandSeparatorProps> = ({
	className,
}) => {
	return (
		<View className={cn("h-px bg-background-300 -mx-1 my-1", className)} />
	);
};

export interface CommandItemProps {
	value?: string;
	children: React.ReactNode;
	onSelect?: () => void;
	disabled?: boolean;
	className?: string;
}

export const CommandItem: React.FC<CommandItemProps> = ({
	value,
	children,
	onSelect,
	disabled = false,
	className,
}) => {
	const context = useContext(CommandContext);

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

	return (
		<Pressable
			className={cn(
				"flex-row items-center px-2 py-1.5 rounded",
				disabled && "opacity-50",
				className,
			)}
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="menuitem"
			accessibilityState={{ disabled }}
		>
			<Text className="text-sm text-foreground-200">{children}</Text>
		</Pressable>
	);
};

export interface CommandShortcutProps {
	children: React.ReactNode;
	className?: string;
}

export const CommandShortcut: React.FC<CommandShortcutProps> = ({
	children,
	className,
}) => {
	return (
		<Text
			className={cn(
				"ml-auto text-xs text-foreground-400 opacity-60",
				className,
			)}
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
	if (!open) return null;

	return (
		<View className="flex-1 bg-black/50 justify-center items-center p-4">
			<Pressable
				className="flex-1 bg-black/50 justify-center items-center p-4"
				onPress={() => onOpenChange?.(false)}
			>
				<Pressable
					className="bg-background-200 rounded-lg border border-background-300 w-full max-w-sm max-h-[80%] shadow-lg"
					onPress={(e) => e.stopPropagation()}
				>
					{children}
				</Pressable>
			</Pressable>
		</View>
	);
};

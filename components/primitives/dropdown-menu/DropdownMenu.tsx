import type React from "react";
import { createContext, useContext, useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

// DropdownMenu Context
interface DropdownMenuContextType {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

// RadioGroup Context for DropdownMenuRadioGroup
interface DropdownMenuRadioGroupContextType {
	value?: string;
	onValueChange?: (value: string) => void;
}

const DropdownMenuRadioGroupContext =
	createContext<DropdownMenuRadioGroupContextType | null>(null);

export interface DropdownMenuProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
	open: controlledOpen,
	defaultOpen = false,
	onOpenChange,
	children,
}) => {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

	const handleOpenChange = (newOpen: boolean) => {
		if (controlledOpen === undefined) {
			setInternalOpen(newOpen);
		}
		onOpenChange?.(newOpen);
	};

	return (
		<DropdownMenuContext.Provider
			value={{ open, onOpenChange: handleOpenChange }}
		>
			{children}
		</DropdownMenuContext.Provider>
	);
};

export interface DropdownMenuTriggerProps {
	children: React.ReactNode;
	className?: string;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
	children,
	className,
}) => {
	const context = useContext(DropdownMenuContext);

	if (!context) {
		throw new Error("DropdownMenuTrigger must be used within a DropdownMenu");
	}

	const { onOpenChange } = context;

	return (
		<Pressable className={className} onPress={() => onOpenChange(true)}>
			{children}
		</Pressable>
	);
};

export interface DropdownMenuContentProps {
	children: React.ReactNode;
	className?: string;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
	children,
	className,
}) => {
	const context = useContext(DropdownMenuContext);

	if (!context) {
		throw new Error("DropdownMenuContent must be used within a DropdownMenu");
	}

	const { open, onOpenChange } = context;

	return (
		<Modal
			visible={open}
			transparent
			animationType="fade"
			onRequestClose={() => onOpenChange(false)}
		>
			<Pressable
				className="flex-1 bg-black/50 justify-center items-center p-4"
				onPress={() => onOpenChange(false)}
			>
				<Pressable
					className={cn(
						"bg-theme-background-subtle rounded-lg border border-theme-border p-1 min-w-32 max-w-72 shadow-lg max-h-96",
						className,
					)}
					onPress={(e) => e.stopPropagation()}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						{children}
					</ScrollView>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

export interface DropdownMenuItemProps {
	children: React.ReactNode;
	onPress?: () => void;
	disabled?: boolean;
	inset?: boolean;
	className?: string;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
	children,
	onPress,
	disabled = false,
	inset = false,
	className,
}) => {
	const context = useContext(DropdownMenuContext);

	if (!context) {
		throw new Error("DropdownMenuItem must be used within a DropdownMenu");
	}

	const { onOpenChange } = context;

	const handlePress = () => {
		if (disabled) return;
		onPress?.();
		onOpenChange(false);
	};

	return (
		<Pressable
			className={cn(
				"flex-row items-center px-2 py-1.5 rounded",
				inset && "pl-8",
				disabled && "opacity-50",
				className,
			)}
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="menuitem"
			accessibilityState={{ disabled }}
		>
			<Text className="text-sm text-theme-foreground-subtle">{children}</Text>
		</Pressable>
	);
};

export interface DropdownMenuCheckboxItemProps {
	children: React.ReactNode;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	className?: string;
}

export const DropdownMenuCheckboxItem: React.FC<
	DropdownMenuCheckboxItemProps
> = ({
	children,
	checked = false,
	onCheckedChange,
	disabled = false,
	className,
}) => {
	const handlePress = () => {
		if (disabled) return;
		onCheckedChange?.(!checked);
	};

	return (
		<Pressable
			className={cn(
				"flex-row items-center pl-8 pr-2 py-1.5 rounded",
				disabled && "opacity-50",
				className,
			)}
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="checkbox"
			accessibilityState={{
				checked,
				disabled,
			}}
		>
			<View className="absolute left-2 w-3.5 h-3.5 justify-center items-center">
				{checked && (
					<Text className="text-xs text-theme-foreground-subtle">✓</Text>
				)}
			</View>
			<Text className="text-sm text-theme-foreground-subtle">{children}</Text>
		</Pressable>
	);
};

export interface DropdownMenuRadioGroupProps {
	value?: string;
	onValueChange?: (value: string) => void;
	children: React.ReactNode;
}

export const DropdownMenuRadioGroup: React.FC<DropdownMenuRadioGroupProps> = ({
	value,
	onValueChange,
	children,
}) => {
	return (
		<DropdownMenuRadioGroupContext.Provider value={{ value, onValueChange }}>
			{children}
		</DropdownMenuRadioGroupContext.Provider>
	);
};

export interface DropdownMenuRadioItemProps {
	value: string;
	children: React.ReactNode;
	disabled?: boolean;
	className?: string;
}

export const DropdownMenuRadioItem: React.FC<DropdownMenuRadioItemProps> = ({
	value,
	children,
	disabled = false,
	className,
}) => {
	const radioContext = useContext(DropdownMenuRadioGroupContext);

	if (!radioContext) {
		throw new Error(
			"DropdownMenuRadioItem must be used within a DropdownMenuRadioGroup",
		);
	}

	const { value: selectedValue, onValueChange } = radioContext;
	const isSelected = selectedValue === value;

	const handlePress = () => {
		if (disabled) return;
		onValueChange?.(value);
	};

	return (
		<Pressable
			className={cn(
				"flex-row items-center pl-8 pr-2 py-1.5 rounded",
				disabled && "opacity-50",
				className,
			)}
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="radio"
			accessibilityState={{
				selected: isSelected,
				disabled,
			}}
		>
			<View className="absolute left-2 w-3.5 h-3.5 rounded-full border-2 border-theme-foreground-muted justify-center items-center">
				{isSelected && (
					<View className="w-1.5 h-1.5 rounded-full bg-theme-foreground-subtle" />
				)}
			</View>
			<Text className="text-sm text-theme-foreground-subtle">{children}</Text>
		</Pressable>
	);
};

export interface DropdownMenuLabelProps {
	children: React.ReactNode;
	inset?: boolean;
	className?: string;
}

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({
	children,
	inset = false,
	className,
}) => {
	return (
		<View className={cn("px-2 py-1.5", inset && "pl-8", className)}>
			<Text className="text-sm font-semibold text-theme-foreground">
				{children}
			</Text>
		</View>
	);
};

export interface DropdownMenuSeparatorProps {
	className?: string;
}

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
	className,
}) => {
	return <View className={cn("h-px bg-theme-border -mx-1 my-1", className)} />;
};

export interface DropdownMenuShortcutProps {
	children: React.ReactNode;
	className?: string;
}

export const DropdownMenuShortcut: React.FC<DropdownMenuShortcutProps> = ({
	children,
	className,
}) => {
	return (
		<Text
			className={cn(
				"ml-auto text-xs text-theme-foreground-muted opacity-60",
				className,
			)}
		>
			{children}
		</Text>
	);
};

export interface DropdownMenuGroupProps {
	children: React.ReactNode;
}

export const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({
	children,
}) => {
	return <View>{children}</View>;
};

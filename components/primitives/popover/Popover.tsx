import type React from "react";
import { createContext, useContext, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { cn } from "../../utils/cn";

// Popover Context
interface PopoverContextType {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export interface PopoverProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({
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
		<PopoverContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
			{children}
		</PopoverContext.Provider>
	);
};

export interface PopoverTriggerProps {
	children: React.ReactNode;
	className?: string;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
	children,
	className,
}) => {
	const context = useContext(PopoverContext);

	if (!context) {
		throw new Error("PopoverTrigger must be used within a Popover");
	}

	const { onOpenChange } = context;

	return (
		<Pressable className={className} onPress={() => onOpenChange(true)}>
			{children}
		</Pressable>
	);
};

export interface PopoverContentProps {
	children: React.ReactNode;
	className?: string;
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
	children,
	className,
	align = "center",
	side = "bottom",
}) => {
	const context = useContext(PopoverContext);

	if (!context) {
		throw new Error("PopoverContent must be used within a Popover");
	}

	const { open, onOpenChange } = context;

	const alignClasses = {
		start: "items-start",
		center: "items-center",
		end: "items-end",
	};

	const sideClasses = {
		top: "justify-start",
		bottom: "justify-end",
		left: "justify-start",
		right: "justify-end",
	};

	return (
		<Modal
			visible={open}
			transparent
			animationType="fade"
			onRequestClose={() => onOpenChange(false)}
		>
			<Pressable
				className={cn(
					"flex-1 bg-black/30 p-4",
					sideClasses[side],
					alignClasses[align],
				)}
				onPress={() => onOpenChange(false)}
			>
				<Pressable
					className={cn(
						"bg-background-200 rounded-lg border border-background-300 p-4 w-72 max-w-[90%] shadow-lg",
						className,
					)}
					onPress={(e) => e.stopPropagation()}
				>
					{children}
				</Pressable>
			</Pressable>
		</Modal>
	);
};

export interface PopoverAnchorProps {
	children: React.ReactNode;
	className?: string;
}

export const PopoverAnchor: React.FC<PopoverAnchorProps> = ({
	children,
	className,
}) => {
	return <View className={className}>{children}</View>;
};

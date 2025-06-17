import type React from "react";
import { createContext, useContext, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

// Tooltip Context
interface TooltipContextType {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	delayDuration: number;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

// TooltipProvider Context
interface TooltipProviderContextType {
	delayDuration: number;
}

const TooltipProviderContext = createContext<TooltipProviderContextType>({
	delayDuration: 700,
});

export interface TooltipProviderProps {
	delayDuration?: number;
	children: React.ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
	delayDuration = 700,
	children,
}) => {
	return (
		<TooltipProviderContext.Provider value={{ delayDuration }}>
			{children}
		</TooltipProviderContext.Provider>
	);
};

export interface TooltipProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	delayDuration?: number;
	children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
	open: controlledOpen,
	defaultOpen = false,
	onOpenChange,
	delayDuration: customDelayDuration,
	children,
}) => {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const providerContext = useContext(TooltipProviderContext);

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const delayDuration = customDelayDuration ?? providerContext.delayDuration;

	const handleOpenChange = (newOpen: boolean) => {
		if (controlledOpen === undefined) {
			setInternalOpen(newOpen);
		}
		onOpenChange?.(newOpen);
	};

	return (
		<TooltipContext.Provider
			value={{ open, onOpenChange: handleOpenChange, delayDuration }}
		>
			{children}
		</TooltipContext.Provider>
	);
};

export interface TooltipTriggerProps {
	children: React.ReactNode;
	className?: string;
}

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
	children,
	className,
}) => {
	const context = useContext(TooltipContext);

	if (!context) {
		throw new Error("TooltipTrigger must be used within a Tooltip");
	}

	const { onOpenChange, delayDuration } = context;
	let timeoutId: NodeJS.Timeout;

	const handlePressIn = () => {
		timeoutId = setTimeout(() => {
			onOpenChange(true);
		}, delayDuration);
	};

	const handlePressOut = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		onOpenChange(false);
	};

	return (
		<Pressable
			className={className}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={() => {}} // Prevent default press behavior
		>
			{children}
		</Pressable>
	);
};

export interface TooltipContentProps {
	children: React.ReactNode;
	className?: string;
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
}

export const TooltipContent: React.FC<TooltipContentProps> = ({
	children,
	className,
	side = "bottom",
	sideOffset = 4,
}) => {
	const context = useContext(TooltipContext);

	if (!context) {
		throw new Error("TooltipContent must be used within a Tooltip");
	}

	const { open, onOpenChange } = context;

	const sideClasses = {
		top: "justify-start",
		bottom: "justify-end",
		left: "justify-center items-start",
		right: "justify-center items-end",
	};

	const paddingClasses = {
		top: "pt-1",
		bottom: "pb-1",
		left: "pl-1",
		right: "pr-1",
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
					"flex-1 bg-transparent items-center",
					sideClasses[side],
					paddingClasses[side],
				)}
				onPress={() => onOpenChange(false)}
			>
				<View
					className={cn(
						"bg-background-100 rounded-md px-3 py-1.5 max-w-[250px] shadow-lg",
						className,
					)}
				>
					{typeof children === "string" ? (
						<Text className="text-xs text-foreground-100 text-center">
							{children}
						</Text>
					) : (
						children
					)}
				</View>
			</Pressable>
		</Modal>
	);
};

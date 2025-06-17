import type React from "react";
import { Pressable } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";

export interface ToggleProps {
	children: React.ReactNode;
	pressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
	variant?: ToggleVariant;
	size?: ToggleSize;
	disabled?: boolean;
	className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
	children,
	pressed = false,
	onPressedChange,
	variant = "default",
	size = "default",
	disabled = false,
	className,
}) => {
	const baseStyles = "flex-row items-center justify-center rounded-md";

	const variantStyles = {
		default: pressed ? "bg-background-500" : "bg-transparent",
		outline: pressed
			? "bg-background-500 border border-input"
			: "bg-transparent border border-input",
	};

	const sizeStyles = {
		sm: "h-8 px-2",
		default: "h-9 px-3",
		lg: "h-10 px-3",
	};

	const textColorClass = pressed
		? "text-foreground-200"
		: "text-foreground-400";

	return (
		<Pressable
			className={cn(
				baseStyles,
				variantStyles[variant],
				sizeStyles[size],
				disabled && "opacity-50",
				className,
			)}
			onPress={() => onPressedChange?.(!pressed)}
			disabled={disabled}
		>
			{typeof children === "string" ? (
				<Text className={cn("text-sm font-medium", textColorClass)}>
					{children}
				</Text>
			) : (
				children
			)}
		</Pressable>
	);
};

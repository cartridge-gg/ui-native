import type React from "react";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

export interface TabItem {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface TabsProps {
	items: TabItem[];
	value?: string;
	onValueChange?: (value: string) => void;
	className?: string;
}

export interface TabsContentProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
	items,
	value,
	onValueChange,
	className,
}) => {
	return (
		<View
			className={cn("flex-row bg-background-200 rounded-lg p-1", className)}
		>
			{items.map((item) => (
				<Pressable
					key={item.value}
					className={cn(
						"flex-1 py-2 px-3 rounded-md items-center justify-center",
						value === item.value && "bg-background-500",
						item.disabled && "opacity-50",
					)}
					onPress={() => {
						if (!item.disabled && onValueChange) {
							onValueChange(item.value);
						}
					}}
					disabled={item.disabled}
				>
					<Text
						className={cn(
							"text-xs font-semibold text-foreground-400",
							value === item.value && "text-foreground-100",
						)}
					>
						{item.label}
					</Text>
				</Pressable>
			))}
		</View>
	);
};

export const TabsContent: React.FC<TabsContentProps> = ({
	value,
	children,
	className,
}) => {
	return <View className={className}>{children}</View>;
};

// Compound component pattern
export const TabsRoot: React.FC<{
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	children: React.ReactNode;
	className?: string;
}> = ({
	defaultValue,
	value: controlledValue,
	onValueChange,
	children,
	className,
}) => {
	const [internalValue, setInternalValue] = useState(defaultValue || "");

	const value = controlledValue !== undefined ? controlledValue : internalValue;

	const handleValueChange = (newValue: string) => {
		if (controlledValue === undefined) {
			setInternalValue(newValue);
		}
		onValueChange?.(newValue);
	};

	return <View className={className}>{children}</View>;
};

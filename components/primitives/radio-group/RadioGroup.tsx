import { createContext, useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { cn } from "../../utils/cn";

// RadioGroup Context
interface RadioGroupContextType {
	value?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioGroupProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
	value: controlledValue,
	defaultValue,
	onValueChange,
	disabled = false,
	children,
	className,
}) => {
	const [internalValue, setInternalValue] = useState(defaultValue);

	const value = controlledValue !== undefined ? controlledValue : internalValue;

	const handleValueChange = (newValue: string) => {
		if (disabled) return;

		if (controlledValue === undefined) {
			setInternalValue(newValue);
		}
		onValueChange?.(newValue);
	};

	return (
		<RadioGroupContext.Provider
			value={{
				value,
				onValueChange: handleValueChange,
				disabled,
			}}
		>
			<View className={cn("gap-2", className)}>{children}</View>
		</RadioGroupContext.Provider>
	);
};

export interface RadioGroupItemProps {
	value: string;
	id?: string;
	disabled?: boolean;
	className?: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
	value,
	disabled: itemDisabled = false,
	className,
}) => {
	const context = useContext(RadioGroupContext);

	if (!context) {
		throw new Error("RadioGroupItem must be used within a RadioGroup");
	}

	const {
		value: selectedValue,
		onValueChange,
		disabled: groupDisabled,
	} = context;
	const isSelected = selectedValue === value;
	const isDisabled = groupDisabled || itemDisabled;

	const handlePress = () => {
		if (!isDisabled && onValueChange) {
			onValueChange(value);
		}
	};

	return (
		<Pressable
			className={cn(
				"w-4 h-4 rounded-full border bg-background-100 justify-center items-center",
				isDisabled
					? "border-foreground-400 opacity-50"
					: "border-foreground-100",
				className,
			)}
			onPress={handlePress}
			disabled={isDisabled}
			accessibilityRole="radio"
			accessibilityState={{
				checked: isSelected,
				disabled: isDisabled,
			}}
		>
			<View
				className={cn(
					"w-1.5 h-1.5 rounded-full",
					isSelected
						? isDisabled
							? "bg-foreground-400"
							: "bg-foreground-100"
						: "bg-transparent",
				)}
			/>
		</Pressable>
	);
};

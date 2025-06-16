import { createContext, useContext, useState } from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

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
	style?: ViewStyle;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
	value: controlledValue,
	defaultValue,
	onValueChange,
	disabled = false,
	children,
	style,
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
			<View style={[styles.container, style]}>{children}</View>
		</RadioGroupContext.Provider>
	);
};

export interface RadioGroupItemProps {
	value: string;
	id?: string;
	disabled?: boolean;
	style?: ViewStyle;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
	value,
	disabled: itemDisabled = false,
	style,
}) => {
	const context = useContext(RadioGroupContext);
	const { colors } = useTheme();

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

	const itemStyles = StyleSheet.create({
		container: {
			width: 16,
			height: 16,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: isDisabled ? colors.foreground[400] : colors.foreground[100],
			backgroundColor: colors.background[100],
			justifyContent: "center",
			alignItems: "center",
			opacity: isDisabled ? 0.5 : 1,
		},
		indicator: {
			width: 6,
			height: 6,
			borderRadius: 3,
			backgroundColor: isSelected
				? isDisabled
					? colors.foreground[400]
					: colors.foreground[100]
				: "transparent",
		},
	});

	return (
		<Pressable
			style={[itemStyles.container, style]}
			onPress={handlePress}
			disabled={isDisabled}
			accessibilityRole="radio"
			accessibilityState={{
				checked: isSelected,
				disabled: isDisabled,
			}}
		>
			<View style={itemStyles.indicator} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
});

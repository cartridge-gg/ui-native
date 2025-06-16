import { createContext, useContext, useState } from "react";
import {
	LayoutAnimation,
	Platform,
	Pressable,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";

// Accordion Context
interface AccordionContextType {
	type: "single" | "multiple";
	value?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	collapsible?: boolean;
	disabled?: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export interface AccordionProps {
	type: "single" | "multiple";
	value?: string | string[];
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	collapsible?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
	style?: ViewStyle;
}

export const Accordion: React.FC<AccordionProps> = ({
	type,
	value: controlledValue,
	defaultValue,
	onValueChange,
	collapsible = false,
	disabled = false,
	children,
	style,
}) => {
	const [internalValue, setInternalValue] = useState(
		defaultValue || (type === "single" ? "" : []),
	);

	const value = controlledValue !== undefined ? controlledValue : internalValue;

	const handleValueChange = (newValue: string | string[]) => {
		if (disabled) return;

		if (controlledValue === undefined) {
			setInternalValue(newValue);
		}
		onValueChange?.(newValue);
	};

	return (
		<AccordionContext.Provider
			value={{
				type,
				value,
				onValueChange: handleValueChange,
				collapsible,
				disabled,
			}}
		>
			<View style={[styles.container, style]}>{children}</View>
		</AccordionContext.Provider>
	);
};

// AccordionItem Context
interface AccordionItemContextType {
	value: string;
	isOpen: boolean;
	onToggle: () => void;
	disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(
	null,
);

export interface AccordionItemProps {
	value: string;
	disabled?: boolean;
	children: React.ReactNode;
	style?: ViewStyle;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
	value,
	disabled: itemDisabled = false,
	children,
	style,
}) => {
	const context = useContext(AccordionContext);

	if (!context) {
		throw new Error("AccordionItem must be used within an Accordion");
	}

	const {
		type,
		value: accordionValue,
		onValueChange,
		collapsible,
		disabled: accordionDisabled,
	} = context;
	const isDisabled = accordionDisabled || itemDisabled;

	const isOpen =
		type === "single"
			? accordionValue === value
			: Array.isArray(accordionValue) &&
				(accordionValue as string[]).indexOf(value) !== -1;

	const handleToggle = () => {
		if (isDisabled) return;

		if (type === "single") {
			const newValue = isOpen && collapsible ? "" : value;
			onValueChange?.(newValue);
		} else {
			const currentArray = Array.isArray(accordionValue) ? accordionValue : [];
			const newValue = isOpen
				? currentArray.filter((v) => v !== value)
				: [...currentArray, value];
			onValueChange?.(newValue);
		}
	};

	return (
		<AccordionItemContext.Provider
			value={{ value, isOpen, onToggle: handleToggle, disabled: isDisabled }}
		>
			<View style={[styles.item, style]}>{children}</View>
		</AccordionItemContext.Provider>
	);
};

export interface AccordionTriggerProps {
	hideIcon?: boolean;
	children: React.ReactNode;
	style?: ViewStyle;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
	hideIcon = false,
	children,
	style,
}) => {
	const context = useContext(AccordionItemContext);
	const { colors } = useTheme();

	if (!context) {
		throw new Error("AccordionTrigger must be used within an AccordionItem");
	}

	const { isOpen, onToggle, disabled } = context;

	const handlePress = () => {
		// Configure layout animation for smooth expand/collapse
		if (Platform.OS !== "web") {
			LayoutAnimation.configureNext({
				duration: 200,
				create: { type: "easeOut", property: "opacity" },
				update: { type: "easeOut" },
				delete: { type: "easeOut", property: "opacity" },
			});
		}
		onToggle();
	};

	const triggerStyles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingVertical: 12,
			opacity: disabled ? 0.5 : 1,
		},
		content: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
		},
		icon: {
			marginLeft: 8,
			transform: [{ rotate: isOpen ? "90deg" : "0deg" }],
			color: colors.foreground[400],
		},
	});

	return (
		<Pressable
			style={[triggerStyles.container, style]}
			onPress={handlePress}
			disabled={disabled}
			accessibilityRole="button"
			accessibilityState={{
				expanded: isOpen,
				disabled,
			}}
		>
			<View style={triggerStyles.content}>{children}</View>
			{!hideIcon && <Text style={triggerStyles.icon}>▶</Text>}
		</Pressable>
	);
};

export interface AccordionContentProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
	children,
	style,
}) => {
	const context = useContext(AccordionItemContext);

	if (!context) {
		throw new Error("AccordionContent must be used within an AccordionItem");
	}

	const { isOpen } = context;

	if (!isOpen) return null;

	return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		gap: 0,
	},
	item: {
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255, 255, 255, 0.1)",
	},
	content: {
		paddingBottom: 12,
		gap: 4,
	},
});

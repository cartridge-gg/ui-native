import type React from "react";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

export interface LabelProps {
	children: React.ReactNode;
	htmlFor?: string; // For web compatibility, but not used in React Native
	className?: string;
	disabled?: boolean;
	required?: boolean;
	testID?: string;
}

export const Label: React.FC<LabelProps> = ({
	children,
	className,
	disabled = false,
	required = false,
	testID,
	...props
}) => {
	return (
		<Text
			className={cn(
				"text-xs text-theme-foreground-muted font-medium leading-4 uppercase",
				disabled && "opacity-70",
				className,
			)}
			testID={testID}
			{...props}
		>
			{children}
			{required && <Text className="text-theme-destructive"> *</Text>}
		</Text>
	);
};

Label.displayName = "Label";

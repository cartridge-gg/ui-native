import type React from "react";
import { View } from "react-native";
import type { IconProps } from "../../icons/types";
import { SpinnerIcon } from "../../icons/utility/SpinnerIcon";
import { cn } from "../../utils/cn";

export interface SpinnerProps extends IconProps {
	className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
	size = "default",
	color,
	className,
	...props
}) => {
	return (
		<View className={cn("animate-spin", className)}>
			<SpinnerIcon size={size} color={color} {...props} />
		</View>
	);
};

Spinner.displayName = "Spinner";

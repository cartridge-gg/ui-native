import React from "react";
import { TouchableOpacity } from "react-native";
import { cn } from "../../../utils/cn";

interface AchievementBitProps {
	completed?: boolean;
	active?: boolean;
	onClick?: () => void;
	className?: string;
}

export function AchievementBit({
	completed = false,
	active = false,
	onClick,
	className,
}: AchievementBitProps) {
	const baseClasses = cn(
		"h-2.5 w-2.5",
		completed ? "bg-theme-primary" : "bg-theme-foreground-muted",
		active ? "opacity-100" : "opacity-50",
		className,
	);

	if (onClick) {
		return (
			<TouchableOpacity
				className={baseClasses}
				onPress={onClick}
				activeOpacity={0.8}
			/>
		);
	}

	return (
		<TouchableOpacity className={baseClasses} disabled activeOpacity={1} />
	);
}

export default AchievementBit;

import { View } from "react-native";
import { cn } from "#utils";

export interface SpinnerProps {
	className?: string;
	size?: "sm" | "md" | "lg";
}

export function Spinner({ className, size = "md" }: SpinnerProps) {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
	};

	return (
		<View
			className={cn(
				"border-2 border-foreground-400 border-t-transparent rounded-full",
				"animate-spin",
				sizeClasses[size],
				className,
			)}
		/>
	);
}

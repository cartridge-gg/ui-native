import { View } from "react-native";
import { cn } from "#utils";

interface SeparatorProps {
	className?: string;
	orientation?: "horizontal" | "vertical";
	decorative?: boolean;
}

export function Separator({
	className,
	orientation = "horizontal",
	decorative = true,
	...props
}: SeparatorProps) {
	return (
		<View
			aria-hidden={decorative}
			className={cn(
				"shrink-0 bg-border",
				orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
				className,
			)}
			{...props}
		/>
	);
}

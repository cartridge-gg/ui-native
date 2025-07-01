import { AlertIcon as AlertIconRaw, InfoIcon, WarningIcon } from "#components";
import { cn } from "#utils";

export type ErrorAlertIconProps = {
	variant: "info" | "warning" | "error";
	size?: "sm";
	className?: string;
};

export function ErrorAlertIcon({
	variant,
	size = "sm",
	className,
}: ErrorAlertIconProps) {
	switch (variant) {
		case "info":
			return (
				<InfoIcon size={size} className={cn("text-[#005299]", className)} />
			);
		case "warning":
			return (
				<WarningIcon size={size} className={cn("text-[#fac400]", className)} />
			);
		case "error":
			return (
				<AlertIconRaw
					size={size}
					className={cn("text-destructive-100", className)}
				/>
			);
	}
}

import { type IconProps, SpinnerIcon } from "#components";
import { cn } from "#utils";

export function Spinner({ className, ...props }: IconProps) {
	return (
		<SpinnerIcon
			className={cn(
				"text-foreground-400",
				"[&:not([data-no-animation])]:animate-spin",
				className,
			)}
			{...props}
		/>
	);
}

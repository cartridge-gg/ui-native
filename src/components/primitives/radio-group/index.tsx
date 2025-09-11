import { CheckIcon } from "#components";
import { cn } from "#utils";
import * as RadioGroupPrimitive from "./radio-group";
import type { ItemProps, ItemRef, RootProps, RootRef } from "./types";

export function RadioGroup({
	className,
	...props
}: RootProps & {
	ref?: React.RefObject<RootRef>;
}) {
	return (
		<RadioGroupPrimitive.Root
			className={cn("web:grid gap-2 native:gap-2", className)}
			{...props}
		/>
	);
}

export function RadioGroupItem({
	className,
	...props
}: ItemProps & {
	ref?: React.RefObject<ItemRef>;
}) {
	return (
		<RadioGroupPrimitive.Item
			className={cn(
				"aspect-square h-4 w-4 native:h-5 native:w-5 rounded-full justify-center items-center border border-foreground text-foreground web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
				props.disabled && "web:cursor-not-allowed opacity-50",
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="items-center justify-center">
				<CheckIcon size="2xs" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
}

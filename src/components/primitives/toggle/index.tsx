import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import type { IconProps } from "#components/icons";
import { TextClassContext } from "#components/primitives/text";
import { cn } from "#utils";
import * as TogglePrimitive from "./toggle";
import type * as ToggleTypes from "./types";

export const toggleVariants = cva(
	"web:inline-flex native:flex items-center justify-center rounded-md text-sm font-medium web:transition-colors web:hover:bg-background-200 web:hover:text-foreground-400 web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-foreground web:disabled:pointer-events-none disabled:opacity-50 web:data-[state=on]:bg-background-500 web:data-[state=on]:text-foreground-200",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent web:shadow-sm web:hover:bg-background-500 web:hover:text-foreground-200",
			},
			size: {
				default: "h-9 px-3 native:h-12 native:px-[12]",
				sm: "h-8 px-2 native:h-10 native:px-[8]",
				lg: "h-10 px-3 native:h-14 native:px-[12]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export const toggleTextVariants = cva(
	"text-sm native:text-base text-foreground font-medium",
	{
		variants: {
			variant: {
				default: "",
				outline: "",
			},
			size: {
				default: "",
				sm: "",
				lg: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export function Toggle({
	className,
	variant,
	size,
	...props
}: ToggleTypes.RootProps &
	VariantProps<typeof toggleVariants> &
	VariantProps<typeof toggleVariants> & {
		ref?: React.RefObject<ToggleTypes.RootRef>;
	}) {
	return (
		<TextClassContext.Provider
			value={cn(
				toggleTextVariants({ variant, size }),
				props.pressed ? "text-foreground-200" : "text-foreground",
				className,
			)}
		>
			<TogglePrimitive.Root
				className={cn(
					toggleVariants({ variant, size }),
					props.pressed && "bg-background-500 text-foreground-200",
					className,
				)}
				{...props}
			/>
		</TextClassContext.Provider>
	);
}

export function ToggleIcon({
	className,
	icon: Icon,
	...props
}: React.ComponentPropsWithoutRef<typeof Icon> & {
	icon: IconProps;
}) {
	const textClass = React.useContext(TextClassContext);
	return <Icon className={cn(textClass, className)} {...props} />;
}

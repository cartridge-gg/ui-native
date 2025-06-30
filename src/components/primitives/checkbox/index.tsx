import type * as React from "react";
import { Platform } from "react-native";
import { CheckIcon } from "#components";
import { cn } from "#utils";
import * as CheckboxPrimitive from "./checkbox";
import type * as CheckboxTypes from "./types";

export function Checkbox({
	className,
	...props
}: CheckboxTypes.RootProps & {
	ref?: React.RefObject<CheckboxTypes.RootRef>;
}) {
	return (
		<CheckboxPrimitive.Root
			className={cn(
				"web:peer h-4 w-4 native:h-[20] native:w-[20] shrink-0 rounded-sm native:rounded border border-foreground bg-background-200 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				props.checked && "bg-primary border-primary",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				className={cn("items-center justify-center h-full w-full")}
			>
				<CheckIcon
					strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
					className="text-foreground"
				/>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

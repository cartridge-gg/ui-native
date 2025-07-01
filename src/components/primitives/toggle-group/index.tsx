import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import {
	type IconProps,
	TextClassContext,
	toggleTextVariants,
	toggleVariants,
} from "#components";
import * as ToggleGroupPrimitive from "#components/primitives/toggle-group/toggle-group";
import type * as ToggleGroupTypes from "#components/primitives/toggle-group/types";
import { cn } from "#utils";

const ToggleGroupContext = React.createContext<VariantProps<
	typeof toggleVariants
> | null>(null);

export function ToggleGroup({
	className,
	variant,
	size,
	children,
	...props
}: ToggleGroupTypes.RootProps &
	VariantProps<typeof toggleVariants> & {
		ref?: React.RefObject<ToggleGroupTypes.RootRef>;
	}) {
	return (
		<ToggleGroupPrimitive.Root
			className={cn(
				"flex flex-row items-center justify-center gap-1",
				className,
			)}
			{...props}
		>
			<ToggleGroupContext.Provider value={{ variant, size }}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	);
}

function useToggleGroupContext() {
	const context = React.useContext(ToggleGroupContext);
	if (context === null) {
		throw new Error(
			"ToggleGroup compound components cannot be rendered outside the ToggleGroup component",
		);
	}
	return context;
}

export function ToggleGroupItem({
	className,
	children,
	variant,
	size,
	...props
}: ToggleGroupTypes.ItemProps &
	VariantProps<typeof toggleVariants> & {
		ref?: React.RefObject<ToggleGroupTypes.ItemRef>;
	}) {
	const context = useToggleGroupContext();
	const { value } = ToggleGroupPrimitive.useRootContext();

	return (
		<TextClassContext.Provider
			value={cn(
				toggleTextVariants({ variant, size }),
				ToggleGroupPrimitive.utils.getIsSelected(value, props.value)
					? "text-foreground-200"
					: "web:group-hover:text-foreground-300",
			)}
		>
			<ToggleGroupPrimitive.Item
				className={cn(
					toggleVariants({
						variant: context.variant || variant,
						size: context.size || size,
					}),
					props.disabled && "web:pointer-events-none opacity-50",
					ToggleGroupPrimitive.utils.getIsSelected(value, props.value) &&
						"bg-background-500",
					className,
				)}
				{...props}
			>
				{children}
			</ToggleGroupPrimitive.Item>
		</TextClassContext.Provider>
	);
}

export function ToggleGroupIcon({
	className,
	icon: Icon,
	...props
}: React.ComponentPropsWithoutRef<typeof Icon> & {
	icon: IconProps;
}) {
	const textClass = React.useContext(TextClassContext);
	return <Icon className={cn(textClass, className)} {...props} />;
}

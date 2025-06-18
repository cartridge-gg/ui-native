import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";
import { ExternalIcon } from "#components/icons";
import { buttonVariants } from "#components/primitives/button/utils";
import { Spinner } from "#components/primitives/spinner";
import { Text } from "#components/primitives/text";
import { cn } from "#utils";

export interface ButtonProps
	extends React.ComponentProps<typeof Pressable>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
	isActive?: boolean;
	children?: React.ReactNode;
}

export const Button = React.forwardRef<
	React.ElementRef<typeof Pressable>,
	ButtonProps
>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			isLoading,
			isActive,
			children,
			disabled,
			...props
		},
		ref,
	) => {
		// Note: asChild not implemented for React Native as there's no equivalent to Radix Slot
		return (
			<Pressable
				className={cn(
					buttonVariants({
						variant,
						size,
						status: isActive ? "active" : undefined,
						className,
					}),
					"flex-row", // Ensure horizontal layout for text + icon
				)}
				ref={ref}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading ? (
					<Spinner size="sm" />
				) : (
					<>
						{typeof children === "string" ? (
							<Text
								className={cn(
									"text-inherit uppercase",
									variant === "tertiary" || isActive
										? "font-mono-medium"
										: "font-mono-semibold",
								)}
							>
								{children}
							</Text>
						) : (
							children
						)}
						{variant === "link" && !isLoading && <ExternalIcon size="sm" />}
					</>
				)}
			</Pressable>
		);
	},
);
Button.displayName = "Button";

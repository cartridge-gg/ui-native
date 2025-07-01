import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { View, type ViewProps } from "react-native";
import { Text, TextClassContext } from "#components";
import { cn } from "#utils";

const alertVariants = cva(
	"relative w-full rounded-lg border px-4 py-2.5 text-sm [&>svg]:absolute [&>svg]:left-2.5 [&>svg]:top-3 [&>svg]:text-foreground [&>svg~*]:pl-7",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground border-border",
				destructive:
					"border-destructive-100 text-destructive-100 dark:border-destructive-100 [&>svg]:text-destructive-100",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export function Alert({
	className,
	variant,
	children,
	...props
}: ViewProps & VariantProps<typeof alertVariants>) {
	return (
		<TextClassContext.Provider
			value={
				variant === "destructive" ? "text-destructive-100" : "text-foreground"
			}
		>
			<View
				role="alert"
				className={cn(alertVariants({ variant }), className)}
				{...props}
			>
				{children}
			</View>
		</TextClassContext.Provider>
	);
}

export function AlertTitle({
	className,
	children,
	...props
}: ViewProps & {
	children?: React.ReactNode;
}) {
	return (
		<Text
			className={cn("mb-1 font-medium leading-none tracking-tight", className)}
			{...props}
		>
			{children}
		</Text>
	);
}

export function AlertDescription({
	className,
	children,
	...props
}: ViewProps & {
	children?: React.ReactNode;
}) {
	return (
		<Text className={cn("text-sm leading-relaxed", className)} {...props}>
			{children}
		</Text>
	);
}

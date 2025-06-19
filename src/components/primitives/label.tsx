import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Text, type TextProps } from "react-native";
import { cn } from "#utils";

const labelVariants = cva(
	"text-xs text-foreground-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase",
);

export function Label({
	className,
	...props
}: TextProps & VariantProps<typeof labelVariants> & { ref?: React.Ref<Text> }) {
	return <Text className={cn(labelVariants(), className)} {...props} />;
}

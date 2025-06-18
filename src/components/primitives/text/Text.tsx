import type * as React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cn } from "#utils";

export interface TextProps extends RNTextProps {
	children?: React.ReactNode;
}

export function Text({
	className,
	style,
	ref,
	...props
}: TextProps & { ref?: React.Ref<RNText> }) {
	return (
		<RNText
			className={cn("text-foreground-100 font-sans", className)}
			style={style}
			ref={ref}
			{...props}
		/>
	);
}

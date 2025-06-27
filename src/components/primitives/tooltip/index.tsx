import type * as React from "react";
import { Platform, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { TextClassContext } from "#components/primitives/text";
import { cn } from "#utils";
import * as TooltipPrimitive from "./tooltip";
import type * as TooltipPrimitiveTypes from "./types";

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
	className,
	sideOffset = 4,
	portalHost,
	...props
}: TooltipPrimitiveTypes.ContentProps & {
	ref?: React.RefObject<TooltipPrimitiveTypes.ContentRef>;
	portalHost?: string;
}) {
	return (
		<TooltipPrimitive.Portal hostName={portalHost}>
			<TooltipPrimitive.Overlay
				style={Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined}
			>
				<Animated.View
					entering={Platform.select({ web: undefined, default: FadeIn })}
					exiting={Platform.select({ web: undefined, default: FadeOut })}
				>
					<TextClassContext.Provider value="text-xs text-foreground">
						<TooltipPrimitive.Content
							sideOffset={sideOffset}
							className={cn(
								"z-50 overflow-hidden rounded-md px-3 py-1.5 shadow-md shadow-foreground/5 web:animate-in web:fade-in-0 web:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-background",
								className,
							)}
							{...props}
						/>
					</TextClassContext.Provider>
				</Animated.View>
			</TooltipPrimitive.Overlay>
		</TooltipPrimitive.Portal>
	);
}

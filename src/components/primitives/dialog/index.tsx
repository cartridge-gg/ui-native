import type * as React from "react";
import { Platform, StyleSheet, View, type ViewProps } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Text, TextClassContext, TimesIcon } from "#components";
import { cn } from "#utils";
import * as DialogPrimitive from "./dialog";
import type {
	ContentProps,
	DescriptionProps,
	OverlayProps,
	TitleProps,
	TriggerProps,
} from "./types";

export const Dialog = DialogPrimitive.Root;

export function DialogTrigger({
	className,
	...props
}: TriggerProps & { className?: string }) {
	return (
		<DialogPrimitive.Trigger
			className={cn("self-start", className)}
			{...props}
		/>
	);
}

export const DialogPortal = DialogPrimitive.Portal;

export const DialogClose = DialogPrimitive.Close;

export function DialogOverlayWeb({
	className,
	...props
}: OverlayProps & {
	className?: string;
}) {
	const { open } = DialogPrimitive.useRootContext();
	return (
		<DialogPrimitive.Overlay
			className={cn(
				"bg-black/80 flex justify-center items-center p-2 absolute top-0 right-0 bottom-0 left-0",
				open
					? "web:animate-in web:fade-in-0"
					: "web:animate-out web:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
}

export function DialogOverlayNative({
	className,
	children,
	...props
}: OverlayProps & {
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<DialogPrimitive.Overlay
			style={StyleSheet.absoluteFill}
			className={cn(
				"flex bg-black/80 justify-center items-center p-2",
				className,
			)}
			{...props}
		>
			<Animated.View
				entering={FadeIn.duration(150)}
				exiting={FadeOut.duration(150)}
			>
				{children}
			</Animated.View>
		</DialogPrimitive.Overlay>
	);
}

export const DialogOverlay = Platform.select({
	web: DialogOverlayWeb,
	default: DialogOverlayNative,
});

export function DialogContent({
	className,
	children,
	portalHost,
	...props
}: ContentProps & {
	className?: string;
	portalHost?: string;
}) {
	const { open } = DialogPrimitive.useRootContext();
	return (
		<DialogPortal hostName={portalHost}>
			<DialogOverlay>
				<TextClassContext.Provider value="text-foreground">
					<DialogPrimitive.Content
						className={cn(
							"max-w-lg gap-4 border border-border web:cursor-default bg-background p-6 shadow-lg web:duration-200 rounded-lg",
							open
								? "web:animate-in web:fade-in-0 web:zoom-in-95"
								: "web:animate-out web:fade-out-0 web:zoom-out-95",
							className,
						)}
						{...props}
					>
						{children}
						<DialogPrimitive.Close
							className={
								"absolute right-4 top-4 p-0.5 web:group rounded-sm opacity-70 web:ring-offset-background web:transition-opacity web:hover:opacity-100 web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 web:disabled:pointer-events-none"
							}
						>
							<TimesIcon
								size="sm"
								className={cn(
									"text-foreground-400",
									open && "text-foreground-400",
								)}
							/>
						</DialogPrimitive.Close>
					</DialogPrimitive.Content>
				</TextClassContext.Provider>
			</DialogOverlay>
		</DialogPortal>
	);
}

export function DialogHeader({ className, ...props }: ViewProps) {
	return (
		<View
			className={cn(
				"flex flex-col gap-1.5 text-center sm:text-left",
				className,
			)}
			{...props}
		/>
	);
}

export function DialogFooter({ className, ...props }: ViewProps) {
	return (
		<View
			className={cn(
				"flex flex-col-reverse sm:flex-row sm:justify-end gap-2",
				className,
			)}
			{...props}
		/>
	);
}

export function DialogTitle({
	className,
	children,
	...props
}: TitleProps & {
	className?: string;
	children?: React.ReactNode;
}) {
	// Wrap text children in Text component for React Native compatibility
	const wrappedChildren =
		typeof children === "string" || typeof children === "number" ? (
			<Text>{children}</Text>
		) : (
			children
		);

	return (
		<TextClassContext.Provider value="text-lg native:text-xl text-foreground font-semibold leading-none tracking-tight">
			<DialogPrimitive.Title
				className={cn(
					"text-lg native:text-xl text-foreground font-semibold leading-none tracking-tight",
					className,
				)}
				{...props}
			>
				{wrappedChildren}
			</DialogPrimitive.Title>
		</TextClassContext.Provider>
	);
}

export function DialogDescription({
	className,
	children,
	...props
}: DescriptionProps & {
	className?: string;
	children?: React.ReactNode;
}) {
	// Wrap text children in Text component for React Native compatibility
	const wrappedChildren =
		typeof children === "string" || typeof children === "number" ? (
			<Text>{children}</Text>
		) : (
			children
		);

	return (
		<TextClassContext.Provider value="text-sm native:text-base text-foreground-400">
			<DialogPrimitive.Description
				className={cn(
					"text-sm native:text-base text-foreground-400",
					className,
				)}
				{...props}
			>
				{wrappedChildren}
			</DialogPrimitive.Description>
		</TextClassContext.Provider>
	);
}

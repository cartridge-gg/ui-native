import * as React from "react";
import { Image, View } from "react-native";
import { Text } from "#components";

import { cn } from "#utils";

export function Card({
	className,
	ref,
	...props
}: React.ComponentProps<typeof View> & { ref?: React.Ref<View> }) {
	return (
		<View
			ref={ref}
			className={cn(
				"flex-col rounded overflow-hidden text-foreground gap-y-px shrink-0",
				className,
			)}
			{...props}
		/>
	);
}

export function CardHeader({
	className,
	icon,
	ref,
	...props
}: React.ComponentProps<typeof View> & {
	icon?: React.ReactNode;
	ref?: React.Ref<View>;
}) {
	return icon ? (
		<View
			ref={ref}
			className={cn(
				"h-10 flex-row items-center gap-x-px bg-background-200",
				className,
			)}
		>
			{React.isValidElement(icon) ? (
				<CardIcon>{icon}</CardIcon>
			) : (
				<CardIcon src={icon as string} />
			)}
			<View className="w-px h-full bg-background" />
			<View className={cn("p-3 w-full", className)} {...props} />
		</View>
	) : (
		<View
			ref={ref}
			className={cn("flex-col gap-y-1 p-3 bg-background-200", className)}
			{...props}
		/>
	);
}

export function CardHeaderRight({
	className,
	ref,
	...props
}: React.ComponentProps<typeof View> & { ref?: React.Ref<View> }) {
	return <View ref={ref} className={cn("ml-auto", className)} {...props} />;
}

export function CardIcon({
	className,
	src,
	ref,
	...props
}: React.ComponentProps<typeof View> & {
	src?: string;
	ref?: React.Ref<View>;
}): React.ReactNode {
	return (
		<View
			ref={ref}
			className="h-9 w-9 p-2 bg-background-200 flex items-center justify-center"
		>
			{src ? (
				<Image
					source={{ uri: src }}
					className={cn("aspect-square rounded-sm", className)}
					style={{ width: 32, height: 32 }}
				/>
			) : props.children ? (
				props.children
			) : (
				<View
					className={cn(
						"h-8 aspect-square bg-[image:var(--theme-icon-url)] bg-cover bg-center place-content-center",
						className,
					)}
					{...props}
				/>
			)}
		</View>
	);
}

export function CardTitle({
	className,
	ref,
	...props
}: React.ComponentProps<typeof Text> & { ref?: React.Ref<Text> }) {
	return (
		<Text
			ref={ref}
			className={cn(
				"text-xs font-semibold text-foreground-400 tracking-wide leading-normal",
				className,
			)}
			{...props}
		/>
	);
}

export function CardDescription({
	className,
	ref,
	...props
}: React.ComponentProps<typeof Text> & { ref?: React.Ref<Text> }) {
	return (
		<Text
			ref={ref}
			className={cn("text-sm text-foreground-400 leading-normal", className)}
			{...props}
		/>
	);
}

export function CardContent({
	className,
	ref,
	...props
}: React.ComponentProps<typeof View> & { ref?: React.Ref<View> }) {
	return (
		<View
			ref={ref}
			className={cn("p-3 bg-background-200", className)}
			{...props}
		/>
	);
}

export function CardListContent({
	className,
	ref,
	...props
}: React.ComponentProps<typeof View> & { ref?: React.Ref<View> }) {
	return (
		<View
			ref={ref}
			className={cn("flex-col gap-px text-sm font-medium", className)}
			{...props}
		/>
	);
}

export function CardListItem({
	className,
	icon,
	ref,
	...props
}: React.ComponentProps<typeof View> & {
	icon?: React.ReactNode;
	ref?: React.Ref<View>;
}) {
	return icon ? (
		<View
			ref={ref}
			className={cn(
				"h-11 flex-row items-center gap-x-px bg-background",
				className,
			)}
		>
			{React.isValidElement(icon) ? (
				<CardListItemIcon>{icon}</CardListItemIcon>
			) : (
				<CardListItemIcon src={icon as string} />
			)}
			<View
				className={cn(
					"px-3 flex-1 h-full flex-row items-center justify-between bg-background-200",
					className,
				)}
				{...props}
			/>
		</View>
	) : (
		<View
			ref={ref}
			className={cn(
				"flex-col gap-y-1 p-3 bg-background-200 justify-between",
				className,
			)}
			{...props}
		/>
	);
}

function CardListItemIcon({
	className,
	src,
	ref,
	...props
}: React.ComponentProps<typeof View> & {
	src?: string;
	ref?: React.Ref<View>;
}) {
	return (
		<View
			ref={ref}
			className="h-11 w-11 bg-background-200 flex items-center justify-center"
		>
			{src ? (
				<Image
					source={{ uri: src }}
					className={cn("h-6 aspect-square rounded-sm", className)}
				/>
			) : props.children ? (
				props.children
			) : (
				<Image
					source={{
						uri: "https://x.cartridge.gg/whitelabel/dope-wars/icon.png",
					}}
					className={cn("h-6 aspect-square rounded-sm", className)}
				/>
			)}
		</View>
	);
}

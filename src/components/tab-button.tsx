import type { TabTriggerSlotProps } from "expo-router/ui";
import { Pressable, View } from "react-native";
import { SvgClassContext } from "#components/icons";
import type { StateIconProps } from "#components/icons/types";
import { cn } from "#utils";

export type IconComponent = React.ComponentType<StateIconProps>;

export function TabButton({
	isFocused,
	Icon,
	className,
	...props
}: TabTriggerSlotProps & { Icon: IconComponent; className?: string }) {
	return (
		<Pressable
			{...props}
			className={cn(
				"flex-1 h-full relative",
				isFocused ? "opacity-100" : "opacity-60",
				className,
			)}
			accessibilityRole="tab"
			accessibilityState={{ selected: !!isFocused }}
		>
			{isFocused ? (
				<View className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
			) : null}
			<View className="flex-1 w-full h-full items-center justify-center">
				<SvgClassContext.Provider
					value={isFocused ? "fill-primary" : "fill-foreground-100"}
				>
					<Icon variant={isFocused ? "solid" : "line"} size="lg" />
				</SvgClassContext.Provider>
			</View>
		</Pressable>
	);
}

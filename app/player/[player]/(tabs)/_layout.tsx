import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChestIcon, PulseIcon, TabButton, TrophyIcon } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export default function PlayerTabsLayout() {
	const insets = useSafeAreaInsets();

	return (
		<Tabs>
			<View className="flex-1 bg-background">
				<TabSlot />
			</View>
			<TabList
				className={
					"w-full flex-row shrink-0 bg-background-200 border-t border-spacer-100 shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.32)] px-4"
				}
				style={{
					height: TAB_BAR_HEIGHT + insets.bottom,
					paddingBottom: insets.bottom,
				}}
			>
				<TabTrigger name="inventory" href="./inventory" asChild>
					<TabButton Icon={ChestIcon} />
				</TabTrigger>
				<TabTrigger name="achievement" href="./achievement" asChild>
					<TabButton Icon={TrophyIcon} />
				</TabTrigger>
				<TabTrigger name="activity" href="./activity" asChild>
					<TabButton Icon={PulseIcon} />
				</TabTrigger>
			</TabList>
		</Tabs>
	);
}

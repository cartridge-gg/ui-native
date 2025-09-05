import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	LeaderboardIcon,
	ListIcon,
	PulseIcon,
	ShoppingCartIcon,
	SwordsIcon,
	TabButton,
} from "#components";

export default function GameTabsLayout() {
	const insets = useSafeAreaInsets();
	const baseBarHeight = 60;

	return (
		<Tabs>
			<View className="flex-1 bg-background">
				<TabSlot />
			</View>
			<TabList
				className={
					"w-full flex-row justify-around items-center shrink-0 bg-background-200 border-t border-spacer-100 shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.32)] gap-x-2 px-4"
				}
				style={{
					height: baseBarHeight + insets.bottom,
					paddingBottom: insets.bottom,
				}}
			>
				<TabTrigger name="activity" href="./activity" asChild>
					<TabButton Icon={PulseIcon} />
				</TabTrigger>
				<TabTrigger name="leaderboard" href="./leaderboard" asChild>
					<TabButton Icon={LeaderboardIcon} />
				</TabTrigger>
				<TabTrigger name="marketplace" href="./marketplace" asChild>
					<TabButton Icon={ShoppingCartIcon} />
				</TabTrigger>
				<TabTrigger name="guilds" href="./guilds" asChild>
					<TabButton Icon={SwordsIcon} />
				</TabTrigger>
				<TabTrigger name="about" href="./about" asChild>
					<TabButton Icon={ListIcon} />
				</TabTrigger>
			</TabList>
		</Tabs>
	);
}

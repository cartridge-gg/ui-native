import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import { useContext, useMemo } from "react";
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
import { ThemeContext } from "#context/theme";
import { cn, TAB_BAR_HEIGHT } from "#utils";

export default function GameTabsLayout() {
	const insets = useSafeAreaInsets();

	const { isGameThemed } = useContext(ThemeContext);

	const tabListClassName = useMemo(
		() =>
			cn(
				"w-full flex-row justify-around items-center shrink-0 shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.32)] gap-x-2 px-4 bg-background-200",
				// Keep original background; only change top border color when themed
				isGameThemed ? "border-primary" : "border-spacer-100",
			),
		[isGameThemed],
	);

	return (
		<Tabs>
			<View className="flex-1 bg-background">
				<TabSlot />
			</View>
			<TabList
				className={tabListClassName}
				style={[
					{
						height: TAB_BAR_HEIGHT + insets.bottom,
						paddingBottom: insets.bottom,
					},
				]}
			>
				<TabTrigger name="activity" href="activity" asChild>
					<TabButton Icon={PulseIcon} />
				</TabTrigger>
				<TabTrigger name="leaderboard" href="leaderboard" asChild>
					<TabButton Icon={LeaderboardIcon} />
				</TabTrigger>
				<TabTrigger name="marketplace" href="marketplace" asChild>
					<TabButton Icon={ShoppingCartIcon} />
				</TabTrigger>
				<TabTrigger name="guilds" href="guilds" asChild>
					<TabButton Icon={SwordsIcon} />
				</TabTrigger>
				<TabTrigger name="about" href="about" asChild>
					<TabButton Icon={ListIcon} />
				</TabTrigger>
			</TabList>
		</Tabs>
	);
}

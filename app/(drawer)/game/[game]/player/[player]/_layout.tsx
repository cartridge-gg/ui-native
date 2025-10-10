import { Link, Slot, usePathname } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	ChestIcon,
	LeaderboardIcon,
	PlayerHeader,
	TabButton,
} from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export default function GamePlayerLayout() {
	const insets = useSafeAreaInsets();
	const pathname = usePathname();

	return (
		<View className="flex-1 bg-background">
			<PlayerHeader />

			<View className="flex-1">
				<Slot />
			</View>
			<View
				className="w-full flex-row shrink-0 bg-background-200 border-t border-spacer-100 shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.32)] px-4"
				style={{
					height: TAB_BAR_HEIGHT + insets.bottom,
					paddingBottom: insets.bottom,
				}}
			>
				<Link href="./inventory" replace asChild>
					<TabButton
						Icon={ChestIcon}
						isFocused={pathname?.includes("/inventory")}
					/>
				</Link>
				<Link href="./leaderboard" replace asChild>
					<TabButton
						Icon={LeaderboardIcon}
						isFocused={pathname?.includes("/leaderboard")}
					/>
				</Link>
			</View>
		</View>
	);
}

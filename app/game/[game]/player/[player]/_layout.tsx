import {
	Slot,
	useLocalSearchParams,
	usePathname,
	useRouter,
} from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChestIcon, LeaderboardIcon, TabButton } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export default function GamePlayerLayout() {
	const insets = useSafeAreaInsets();
	const pathname = usePathname();
	const router = useRouter();
	const { game, player } = useLocalSearchParams<{
		game: string;
		player: string;
	}>();

	// Determine which tab is active based on pathname
	const isInventoryActive = pathname?.includes("/inventory");
	const isLeaderboardActive = pathname?.includes("/leaderboard");

	return (
		<View className="flex-1 bg-background">
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
				<TabButton
					Icon={ChestIcon}
					isFocused={isInventoryActive}
					onPress={() =>
						router.push(`/game/${game}/player/${player}/inventory`)
					}
				/>
				<TabButton
					Icon={LeaderboardIcon}
					isFocused={isLeaderboardActive}
					onPress={() =>
						router.push(`/game/${game}/player/${player}/leaderboard`)
					}
				/>
			</View>
		</View>
	);
}

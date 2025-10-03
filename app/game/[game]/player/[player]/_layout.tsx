import {
	Slot,
	useLocalSearchParams,
	usePathname,
	useRouter,
} from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	ChestIcon,
	LeaderboardIcon,
	PlayerHeader,
	PulseIcon,
	ShoppingCartIcon,
	TabButton,
	TrophyIcon,
} from "#components";
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
	const isAchievementActive = pathname?.includes("/achievement");
	const isActivityActive = pathname?.includes("/activity");
	const isLeaderboardActive = pathname?.includes("/leaderboard");
	const isMarketplaceActive = pathname?.includes("/marketplace");

	return (
		<View className="flex-1 bg-background">
			<PlayerHeader />
			<Slot />
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
					Icon={TrophyIcon}
					isFocused={isAchievementActive}
					onPress={() =>
						router.push(`/game/${game}/player/${player}/achievement`)
					}
				/>
				<TabButton
					Icon={PulseIcon}
					isFocused={isActivityActive}
					onPress={() => router.push(`/game/${game}/player/${player}/activity`)}
				/>
				<TabButton
					Icon={LeaderboardIcon}
					isFocused={isLeaderboardActive}
					onPress={() =>
						router.push(`/game/${game}/player/${player}/leaderboard`)
					}
				/>
				<TabButton
					Icon={ShoppingCartIcon}
					isFocused={isMarketplaceActive}
					onPress={() =>
						router.push(`/game/${game}/player/${player}/marketplace`)
					}
				/>
			</View>
		</View>
	);
}

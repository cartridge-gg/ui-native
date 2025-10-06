import {
	Slot,
	useLocalSearchParams,
	usePathname,
	useRouter,
} from "expo-router";
import { useContext } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	GameHeader,
	LeaderboardIcon,
	ListIcon,
	ShoppingCartIcon,
	TabButton,
} from "#components";
import { ThemeContext } from "#context/theme";
import { cn, TAB_BAR_HEIGHT } from "#utils";

export default function GameTabsLayout() {
	const insets = useSafeAreaInsets();
	const pathname = usePathname();
	const router = useRouter();
	const { game } = useLocalSearchParams<{ game: string }>();
	const { isGameThemed } = useContext(ThemeContext);

	// Determine which tab is active based on pathname
	const isMarketplaceActive = pathname?.includes("/marketplace");
	const isLeaderboardActive = pathname?.includes("/leaderboard");
	const isAboutActive = pathname?.includes("/about");

	return (
		<View className="flex-1 bg-background">
			<GameHeader />
			<View className="flex-1 bg-background">
				<Slot />
			</View>
			<View
				className={cn(
					"w-full flex-row justify-around items-center shrink-0 shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.32)] gap-x-2 px-4 bg-background-200 border-t",
					isGameThemed ? "border-primary" : "border-spacer-100",
				)}
				style={{
					height: TAB_BAR_HEIGHT + insets.bottom,
					paddingBottom: insets.bottom,
				}}
			>
				<TabButton
					Icon={ShoppingCartIcon}
					isFocused={isMarketplaceActive}
					onPress={() => router.push(`/game/${game}/marketplace`)}
				/>
				<TabButton
					Icon={LeaderboardIcon}
					isFocused={isLeaderboardActive}
					onPress={() => router.push(`/game/${game}/leaderboard`)}
				/>
				<TabButton
					Icon={ListIcon}
					isFocused={isAboutActive}
					onPress={() => router.push(`/game/${game}/about`)}
				/>
			</View>
		</View>
	);
}

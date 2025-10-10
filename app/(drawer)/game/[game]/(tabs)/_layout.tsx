import { Link, Slot, usePathname } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	GameHeader,
	LeaderboardIcon,
	ListIcon,
	ShoppingCartIcon,
	TabButton,
} from "#components";
import { cn, TAB_BAR_HEIGHT } from "#utils";

export default function GameTabsLayout() {
	const insets = useSafeAreaInsets();
	const pathname = usePathname();

	return (
		<View className="flex-1 bg-background">
			<GameHeader />
			<View className="flex-1">
				<Slot />
			</View>
			<View
				className={cn(
					"w-full flex-row justify-around items-center shrink-0 shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.32)] gap-x-2 px-4 bg-background-200",
				)}
				style={{
					height: TAB_BAR_HEIGHT + insets.bottom,
					paddingBottom: insets.bottom,
				}}
			>
				<Link href="./marketplace" replace asChild>
					<TabButton
						Icon={ShoppingCartIcon}
						isFocused={pathname?.includes("/marketplace")}
					/>
				</Link>
				<Link href="./leaderboard" replace asChild>
					<TabButton
						Icon={LeaderboardIcon}
						isFocused={pathname?.includes("/leaderboard")}
					/>
				</Link>
				<Link href="./about" replace asChild>
					<TabButton Icon={ListIcon} isFocused={pathname?.includes("/about")} />
				</Link>
			</View>
		</View>
	);
}

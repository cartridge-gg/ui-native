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
	PlayerHeader,
	PulseIcon,
	TabButton,
	TrophyIcon,
} from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export default function PlayerLayout() {
	const insets = useSafeAreaInsets();
	const pathname = usePathname();
	const router = useRouter();
	const { player } = useLocalSearchParams<{ player: string }>();

	// Determine which tab is active based on pathname
	const isInventoryActive =
		pathname?.includes("/inventory") || pathname === `/player/${player}`;
	const isAchievementActive = pathname?.includes("/achievement");
	const isActivityActive = pathname?.includes("/activity");

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
					onPress={() => router.push(`/player/${player}/inventory`)}
				/>
				<TabButton
					Icon={TrophyIcon}
					isFocused={isAchievementActive}
					onPress={() => router.push(`/player/${player}/achievement`)}
				/>
				<TabButton
					Icon={PulseIcon}
					isFocused={isActivityActive}
					onPress={() => router.push(`/player/${player}/activity`)}
				/>
			</View>
		</View>
	);
}

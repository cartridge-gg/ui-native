import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	BottomTabItem,
	BottomTabs,
	LeaderboardIcon,
	PulseIcon,
	ShoppingCartIcon,
} from "#components";

export default function TabLayout() {
	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
			}}
			tabBar={({ state, navigation }) => {
				const currentRoute = state.routes[state.index];
				return (
					<BottomTabs
						style={{
							height: 48 + (insets.bottom > 0 ? insets.bottom : 16),
							paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
						}}
					>
						<BottomTabItem
							routeName="activity"
							active={currentRoute.name === "activity"}
							onPress={() => navigation.navigate("activity")}
							Icon={PulseIcon}
						/>
						<BottomTabItem
							routeName="leaderboard"
							active={currentRoute.name === "leaderboard"}
							onPress={() => navigation.navigate("leaderboard")}
							Icon={LeaderboardIcon}
						/>
						<BottomTabItem
							routeName="marketplace"
							active={currentRoute.name === "marketplace"}
							onPress={() => navigation.navigate("marketplace")}
							Icon={ShoppingCartIcon}
						/>
					</BottomTabs>
				);
			}}
		/>
	);
}

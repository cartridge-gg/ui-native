import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  LeaderboardIcon,
  PulseIcon,
  ShoppingCartIcon,
  AwardIcon,
  BottomTabContainer,
  BottomTabItem,
} from "#components";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state }) => (
        <BottomTabContainer
          style={{
            paddingBottom: insets.bottom,
          }}
        >
          <BottomTabItem
            routeName="activity"
            active={state.index === 0}
            Icon={PulseIcon}
          />
          <BottomTabItem
            routeName="leaderboard"
            active={state.index === 1}
            Icon={LeaderboardIcon}
          />
          <BottomTabItem
            routeName="marketplace"
            active={state.index === 2}
            Icon={ShoppingCartIcon}
          />
        </BottomTabContainer>
      )}
    >
      <Tabs.Screen
        name="activity"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

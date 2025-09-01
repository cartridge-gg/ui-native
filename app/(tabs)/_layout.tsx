import { Drawer } from "expo-router/drawer";
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
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1a1a1a',
          width: 280,
        },
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#888888',
        drawerLabelStyle: {
          color: '#ffffff',
          fontSize: 16,
          fontWeight: '500',
        },
        drawerItemStyle: {
          marginHorizontal: 8,
          marginVertical: 2,
          borderRadius: 8,
        },
        drawerActiveBackgroundColor: '#333333',
      }}
    >
      <Drawer.Screen
        name="activity"
        options={{
          drawerLabel: "Activity",
          title: "Activity",
        }}
      />
      <Drawer.Screen
        name="leaderboard"
        options={{
          drawerLabel: "Leaderboard",
          title: "Leaderboard",
        }}
      />
      <Drawer.Screen
        name="marketplace"
        options={{
          drawerLabel: "Marketplace",
          title: "Marketplace",
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
    </Drawer>
  );
}

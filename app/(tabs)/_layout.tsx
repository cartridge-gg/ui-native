import { Drawer } from "expo-router/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DojoDrawerContent } from "#components";
import { type DojoGame } from "#utils/api";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const handleGameSelect = (game: DojoGame) => {
    console.log('Selected game:', game.name);
    // Here you would navigate to the game or handle game selection
  };

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1a1a1a',
          width: 320,
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
      drawerContent={(props) => (
        <DojoDrawerContent onGameSelect={handleGameSelect} />
      )}
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

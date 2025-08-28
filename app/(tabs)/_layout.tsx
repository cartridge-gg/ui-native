import { Tabs } from "expo-router";
import { cssInterop } from "react-native-css-interop";
import { LeaderboardIcon, PulseIcon, ShoppingCartIcon } from "#components";

export default function TabLayout() {
  return (
    <TabsContainer
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fbcb4a",
      }}
      tabBarClassName="bg-background"
      headerClassName="bg-background text-foreground"
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ focused, color }) => (
            <PulseIcon
              variant={focused ? "solid" : "line"}
              color={color}
              size="xl"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ focused, color }) => (
            <LeaderboardIcon
              variant={focused ? "solid" : "line"}
              color={color}
              size="xl"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "Marketplace",
          tabBarIcon: ({ focused, color }) => (
            <ShoppingCartIcon
              variant={focused ? "solid" : "line"}
              color={color}
              size="xl"
            />
          ),
        }}
      />
    </TabsContainer>
  );
}

interface TabsContainerProps {
  tabBarActiveTintColor?: string;
  tabBarInactiveTintColor?: string;
  tabBarBackgroundColor?: string;
  tabBarBorderTopColor?: string;
  headerBackgroundColor?: string;
  headerTintColor?: string;
  screenOptions?: Parameters<typeof Tabs>["0"]["screenOptions"];
  [key: string]: unknown;
}

function TabsContainer({
  tabBarActiveTintColor,
  tabBarInactiveTintColor,
  tabBarBackgroundColor,
  tabBarBorderTopColor,
  headerBackgroundColor,
  headerTintColor,
  screenOptions,
  ...props
}: TabsContainerProps) {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
          borderTopColor: tabBarBorderTopColor,
        },
        headerStyle: {
          backgroundColor: headerBackgroundColor,
        },
        headerTintColor,
        ...screenOptions,
      }}
      {...props}
    />
  );
}

// Enable cssInterop for TabsContainer options
cssInterop(TabsContainer, {
  tabBarClassName: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: "tabBarBackgroundColor",
      borderTopColor: "tabBarBorderTopColor",
    },
  },
  headerClassName: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: "headerBackgroundColor",
      color: "headerTintColor",
    },
  },
});

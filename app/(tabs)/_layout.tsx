import { Tabs } from "expo-router";
// import { cssInterop } from "react-native-css-interop";
import {
  BottomTabItem,
  BottomTabs,
  LeaderboardIcon,
  PulseIcon,
  ShoppingCartIcon,
} from "#components";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fbcb4a",
        tabBarInactiveTintColor: "#727272",
        tabBarStyle: {
          height: 100,
          backgroundColor: "#161a17",
        },
        tabBarItemStyle: {
          backgroundColor: "#161a17",
        },
      }}
      // tabBarClassName="bg-background"
      // headerClassName="bg-background text-foreground"
      tabBar={({ state, navigation }) => {
        const currentRoute = state.routes[state.index];
        return (
          <BottomTabs>
            <BottomTabItem
              routeName="activity"
              active={currentRoute.name === "activity"}
              onPress={() => navigation.navigate("activity")}
            >
              <PulseIcon
                variant={currentRoute.name === "activity" ? "solid" : "line"}
                size="lg"
                className="fill-[red]"
              // color={currentRoute.name === "activity" ? "#fbcb4a" : "#727272"}
              />
            </BottomTabItem>
            <BottomTabItem
              routeName="leaderboard"
              active={currentRoute.name === "leaderboard"}
              onPress={() => navigation.navigate("leaderboard")}
            >
              <LeaderboardIcon
                variant={currentRoute.name === "leaderboard" ? "solid" : "line"}
                size="lg"
                color={currentRoute.name === "leaderboard" ? "#fbcb4a" : "#727272"}
              />
            </BottomTabItem>
            <BottomTabItem
              routeName="marketplace"
              active={currentRoute.name === "marketplace"}
              onPress={() => navigation.navigate("marketplace")}
            >
              <ShoppingCartIcon
                variant={currentRoute.name === "marketplace" ? "solid" : "line"}
                size="lg"
                color={currentRoute.name === "marketplace" ? "#fbcb4a" : "#727272"}
              />
            </BottomTabItem>
          </BottomTabs>
        );
      }}
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
          tabBarIcon: ({ focused, color, size }) => (
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
          tabBarIcon: ({ focused, color, size }) => (
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
          tabBarIcon: ({ focused, color, size }) => (
            <ShoppingCartIcon
              variant={focused ? "solid" : "line"}
              color={color}
              size="xl"
            />
          ),
        }}
      />
    </Tabs>
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

// function TabsContainer({
//   tabBarActiveTintColor,
//   tabBarInactiveTintColor,
//   tabBarBackgroundColor,
//   tabBarBorderTopColor,
//   headerBackgroundColor,
//   headerTintColor,
//   screenOptions,
//   ...props
// }: TabsContainerProps) {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarStyle: {
//           backgroundColor: tabBarBackgroundColor,
//           borderTopColor: tabBarBorderTopColor,
//         },
//         headerStyle: {
//           backgroundColor: headerBackgroundColor,
//         },
//         headerTintColor,
//         ...screenOptions,
//       }}
//       {...props}
//     />
//   );
// }

// // Enable cssInterop for TabsContainer options
// cssInterop(TabsContainer, {
//   tabBarClassName: {
//     target: false,
//     nativeStyleToProp: {
//       backgroundColor: "tabBarBackgroundColor",
//       borderTopColor: "tabBarBorderTopColor",
//     },
//   },
//   headerClassName: {
//     target: false,
//     nativeStyleToProp: {
//       backgroundColor: "headerBackgroundColor",
//       color: "headerTintColor",
//     },
//   },
// });

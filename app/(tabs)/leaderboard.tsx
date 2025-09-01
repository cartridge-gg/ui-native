import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { ArcadeHeader, Text } from "#components";

export default function LeaderboardScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-background">
      <ArcadeHeader
        onMenuPress={() => navigation.openDrawer()}
        onSearchPress={() => console.log("Search pressed")}
        onConnectPress={() => console.log("Connect pressed")}
      />
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-foreground text-xl font-semibold">Leaderboard</Text>
        <Text className="text-muted-foreground mt-2 text-center">
          Leaderboard rankings will appear here
        </Text>
      </View>
    </View>
  );
}

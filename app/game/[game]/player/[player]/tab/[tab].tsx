import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "#components";

export default function GamePlayerTabScreen() {
  const { tab, game, player } = useLocalSearchParams<{ tab?: string; game?: string; player?: string }>();
  return (
    <View className="flex-1 bg-background-100 items-center justify-center px-4">
      <Text className="text-foreground text-xl font-semibold">Game Player Tab</Text>
      <Text className="text-muted-foreground mt-2 text-center">Game: {String(game)}</Text>
      <Text className="text-muted-foreground mt-1 text-center">Player: {String(player)}</Text>
      <Text className="text-muted-foreground mt-1 text-center">Tab: {String(tab)}</Text>
    </View>
  );
}



import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "#components";

export default function GameScreen() {
  const { game } = useLocalSearchParams<{ game?: string }>();
  return (
    <View className="flex-1 bg-background-100 items-center justify-center px-4">
      <Text className="text-foreground text-xl font-semibold">Game</Text>
      <Text className="text-muted-foreground mt-2 text-center">{String(game)}</Text>
    </View>
  );
}



import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "#components";

export default function EditionTabScreen() {
  const { tab, edition } = useLocalSearchParams<{ tab?: string; edition?: string }>();
  return (
    <View className="flex-1 bg-background-100 items-center justify-center px-4">
      <Text className="text-foreground text-xl font-semibold">Edition Tab</Text>
      <Text className="text-muted-foreground mt-2 text-center">Edition: {String(edition)}</Text>
      <Text className="text-muted-foreground mt-1 text-center">Tab: {String(tab)}</Text>
    </View>
  );
}



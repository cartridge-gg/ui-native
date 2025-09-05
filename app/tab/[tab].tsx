import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "#components";

export default function TabScreen() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  return (
    <View className="flex-1 bg-background-100 items-center justify-center px-4">
      <Text className="text-foreground text-xl font-semibold">Tab</Text>
      <Text className="text-muted-foreground mt-2 text-center">{String(tab)}</Text>
    </View>
  );
}



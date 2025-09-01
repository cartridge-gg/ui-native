import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Text } from "#components";

export default function MarketplaceScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-foreground text-xl font-semibold">
        Marketplace
      </Text>
      <Text className="text-muted-foreground mt-2 text-center">
        Marketplace items will appear here
      </Text>
    </View>
  );
}

import { View } from "react-native";
import { Button, SonnerToaster, Text } from "#components";
import { KEYCHAIN_URL } from "#utils";
import * as WebBrowser from "expo-web-browser";

export default function RootScreen() {
  const onConnect = async () => {
    try {
      const res = await WebBrowser.openBrowserAsync(KEYCHAIN_URL);
      console.log(res);
    } catch (error) {
      console.error("Error opening browser:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-background-100 gap-4">
      <Text className="text-2xl font-bold">Cartridge Marketplace</Text>
      <Button onPress={onConnect}>
        <Text>Connect</Text>
      </Button>
      <SonnerToaster />
    </View>
  );
}

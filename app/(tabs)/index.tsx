import { useState } from "react";
import { View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { ArcadeHeader, Text } from "#components";

export default function HomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View className="flex-1 bg-background">
      <ArcadeHeader
        onMenuPress={() => navigation.openDrawer()}
        onSearchPress={() => console.log("Search pressed")}
        onConnectPress={() => console.log("Connect pressed")}
      />
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-foreground text-xl font-semibold">Welcome to Cartridge Arcade</Text>
        <Text className="text-muted-foreground mt-2 text-center">
          Select a game from the menu to start playing
        </Text>
      </View>
    </View>
  );
}

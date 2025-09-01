import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { ArcadeHeader } from "#components";

interface AppHeaderProps {
  title?: string;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onConnectPress?: () => void;
  showHeader?: boolean;
}

export function AppHeader({
  title,
  onMenuPress,
  onSearchPress = () => console.log("Search pressed"),
  onConnectPress = () => console.log("Connect pressed"),
  showHeader = true,
}: AppHeaderProps) {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      // Trigger the drawer navigation
      // @ts-ignore - expo-router drawer navigation
      navigation.openDrawer?.();
    }
  };

  if (!showHeader) {
    return null;
  }

  return (
    <ArcadeHeader
      onMenuPress={handleMenuPress}
      onSearchPress={onSearchPress}
      onConnectPress={onConnectPress}
    />
  );
}

// Keep the old name for backward compatibility
export const TabsHeader = AppHeader;

import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Text } from "#components";
import {
  AwardIcon,
  GearIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  TimesIcon,
  PlusIcon,
} from "#components/icons";
import { useGames } from "#context/games-context";
import { cn } from "#utils";
import type { DojoGame } from "#utils/api";

// Game icons - using placeholder colors for now
const gameIcons = {
  "Dope Wars": "🟢",
  "Loot Survivor": "🟢",
  "Eternum": "🟣",
  "Force Prime": "🔴",
  "Evolute": "🔵",
  "Jokers of Neon": "⚪",
  "Craft Island": "🟠",
  "Blob Arena": "🔵",
  "Rising Revenant": "⚫",
  "zKube": "🔵",
  "Starkane": "🔴",
  "Stark Arcade": "🟢",
  "Block Heroes": "🟢",
};

export function DojoDrawerContent() {
  const insets = useSafeAreaInsets();
  const { games, loading, error } = useGames();
  const [selectedGame, setSelectedGame] = useState<string>("All Games");

  const allGames = [
    "Dope Wars",
    "Loot Survivor", 
    "Eternum",
    "Force Prime",
    "Evolute",
    "Jokers of Neon",
    "Craft Island",
    "Blob Arena",
    "Rising Revenant",
    "zKube",
    "Starkane",
    "Stark Arcade",
    "Block Heroes",
  ];

  return (
    <View className="flex-1 bg-background-200" style={{ paddingTop: insets.top }}>
      <View className="flex-1 flex-col">
        {/* All Games Button - Yellow with gradient effect */}
        <View className="bg-yellow-500 p-3 flex-row items-center">
          <View className="w-6 h-6 bg-background-200 rounded mr-3" />
          <Text className="text-background-200 font-semibold text-white">All Games</Text>
        </View>

        {/* Games List */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-2">
            {allGames.map((gameName) => (
              <Pressable
                key={gameName}
                onPress={() => setSelectedGame(gameName)}
                className="flex-row items-center p-3 rounded-lg active:bg-background-100"
              >
                {/* Game Icon */}
                <View className="w-8 h-8 bg-background-100 rounded mr-3 items-center justify-center">
                  <Text className="text-lg">{gameIcons[gameName as keyof typeof gameIcons] || "🎮"}</Text>
                </View>
                
                {/* Game Name */}
                <Text className="text-white text-sm flex-1">{gameName}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Register Game Button */}
        <View className="p-3 border-t border-background-100">
          <Pressable className="bg-background-100 flex-row items-center justify-center p-3 rounded-lg">
            <Text className="text-foreground-300 mr-2">+</Text>
            <Text className="text-foreground-300 text-sm font-medium">Register Game</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

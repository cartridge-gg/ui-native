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

// Game icons - these would be replaced with actual game icons
const gameIcons = {
  "All Games": "http://localhost:3845/assets/c0238313c206bd00b095d3fa54e0096b96a19698.png",
  "Dope Wars": "http://localhost:3845/assets/d252b26cca1f9c2670bcbe92821cf501dcad501c.png",
  "Loot Survivor": "http://localhost:3845/assets/bf6b323de1529c85df774b046bce3bb6bc97e350.png",
  "Eternum": "http://localhost:3845/assets/cf1aa52ee11b2393ae0b5994674d8c0afa7e0b18.png",
  "Force Prime": "http://localhost:3845/assets/018528c6836d9fb376b47d359a32b979f9a4c880.png",
  "Evolute": "http://localhost:3845/assets/258757ca9246f3ef07d9ea82b47fa9232993614d.png",
  "Jokers of Neon": "http://localhost:3845/assets/4e0ab931d3ca3a3470b7f76e592a3b2424c51464.png",
  "Craft Island": "http://localhost:3845/assets/c82ef8ba76c3b66a63ddcf0aa41b55ed39e9fad4.png",
  "Blob Arena": "http://localhost:3845/assets/41a003c891ad68e8faeb581ee5d1cd4e40d6b53c.png",
  "Rising Revenant": "http://localhost:3845/assets/89058410c44a530bf2ff9c4680ff0c7c4d22e848.png",
  "zKube": "http://localhost:3845/assets/bbccb67d876ca15c0e1b8e239272ec42c2c8f5e8.png",
  "Starkane": "http://localhost:3845/assets/450286d6e542f7625a5ab508500e860a33b37963.png",
  "Stark Arcade": "http://localhost:3845/assets/e1be04f081c1e682dd0ed7e8b3e069ee51e89ac6.png",
  "Block Heroes": "http://localhost:3845/assets/bf6b323de1529c85df774b046bce3bb6bc97e350.png",
};

const gradientMask = "http://localhost:3845/assets/eb98ca39cbb37ae07d0d3bc271a7fa1632172eee.svg";
const plusIcon = "http://localhost:3845/assets/d6368f530b410302b8e45431a4ac0c6077d5486d.svg";

export function DojoDrawerContent() {
  const insets = useSafeAreaInsets();
  const { games, loading, error } = useGames();
  const [selectedGame, setSelectedGame] = useState<string>("All Games");

  const allGames = [
    "All Games",
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
    <View className="flex-1 bg-background-100" style={{ paddingTop: insets.top }}>
      <View className="flex flex-col gap-4 items-start justify-start size-full">
        <View className="bg-background-200 flex flex-col gap-px grow items-start justify-start min-h-px min-w-px overflow-clip w-full">
          {/* Games List Container */}
          <View className="bg-background-100 flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px overflow-clip p-4 w-full">
            {allGames.map((gameName, index) => (
              <Pressable
                key={gameName}
                onPress={() => setSelectedGame(gameName)}
                className={cn(
                  "bg-background-100 flex gap-2 items-center justify-start overflow-clip p-2 rounded w-full",
                  selectedGame === gameName && index === 0 && "relative"
                )}
              >
                {/* Special gradient mask for "All Games" when selected */}
                {selectedGame === gameName && index === 0 && (
                  <View className="absolute h-10 left-0 right-0 top-0">
                    <Image
                      source={{ uri: gradientMask }}
                      className="absolute bg-primary-100 inset-0"
                      resizeMode="stretch"
                    />
                  </View>
                )}

                {/* Game Icon */}
                <View className="bg-background-200 flex gap-2.5 items-center justify-start p-0.5 rounded-sm size-6">
                  <Image
                    source={{ uri: gameIcons[gameName as keyof typeof gameIcons] }}
                    className="bg-center bg-cover bg-no-repeat rounded-sm size-5"
                    resizeMode="cover"
                  />
                </View>

                {/* Game Name */}
                <View className="flex grow items-center justify-between min-h-px min-w-px">
                  <Text
                    className={cn(
                      "text-sm text-center",
                      index === 0 ? "text-primary-100" : "text-white"
                    )}
                  >
                    {gameName}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Register Game Button */}
          <View className="bg-background-100 flex flex-col gap-2.5 items-start justify-start p-3 w-full">
            <Pressable className="bg-background-200 flex gap-1 items-center justify-center overflow-clip p-2 rounded w-full">
              <View className="overflow-clip size-5">
                <Image
                  source={{ uri: plusIcon }}
                  className="size-full"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-sm text-foreground-300 text-center font-medium">
                Register Game
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

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
} from "#components/icons";
import { useGames } from "#context/games-context";
import { cn } from "#utils";
import type { DojoGame } from "#utils/api";

export function DojoDrawerContent() {
  const insets = useSafeAreaInsets();
  const { games, loading, error } = useGames();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Games", count: games.length },
    {
      id: "action",
      name: "Action",
      count: games.filter((g) => g.category === "action").length,
    },
    {
      id: "strategy",
      name: "Strategy",
      count: games.filter((g) => g.category === "strategy").length,
    },
    {
      id: "puzzle",
      name: "Puzzle",
      count: games.filter((g) => g.category === "puzzle").length,
    },
    {
      id: "rpg",
      name: "RPG",
      count: games.filter((g) => g.category === "rpg").length,
    },
    {
      id: "arcade",
      name: "Arcade",
      count: games.filter((g) => g.category === "arcade").length,
    },
  ];

  const filteredGames =
    selectedCategory === "all"
      ? games
      : games.filter((game) => game.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-constructive-100 text-constructive-foreground";
      case "medium":
        return "bg-primary-100 text-primary-foreground";
      case "hard":
        return "bg-destructive-100 text-destructive-foreground";
      default:
        return "bg-background-300 text-foreground-400";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "action":
        return "bg-red-500/20 text-red-400";
      case "strategy":
        return "bg-blue-500/20 text-blue-400";
      case "puzzle":
        return "bg-purple-500/20 text-purple-400";
      case "rpg":
        return "bg-green-500/20 text-green-400";
      case "arcade":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-background-300 text-foreground-400";
    }
  };

  return (
    <View className="flex-1 bg-background-200" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-background-300">
        <View className="flex-row items-center gap-3">
          <View className="w-8 h-8 bg-primary-100 rounded-lg items-center justify-center">
            <AwardIcon size="sm" className="text-primary-foreground" />
          </View>
          <View>
            <Text className="text-foreground text-lg font-semibold">
              Dojo Games
            </Text>
            <Text className="text-foreground-400 text-sm">
              Cartridge Arcade
            </Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View className="p-4 border-b border-background-300">
        <View className="flex-row items-center bg-background-300 rounded-lg px-3 py-2">
          <MagnifyingGlassIcon size="sm" className="text-foreground-400 mr-2" />
          <Text className="text-foreground-400 text-sm flex-1">
            Search games...
          </Text>
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-background-300"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            className={cn(
              "px-3 py-1.5 rounded-full mr-2",
              selectedCategory === category.id
                ? "bg-primary-100"
                : "bg-background-300",
            )}
          >
            <Text
              className={cn(
                "text-sm font-medium",
                selectedCategory === category.id
                  ? "text-primary-foreground"
                  : "text-foreground-400",
              )}
            >
              {category.name} ({category.count})
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Games List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {loading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#6366f1" />
            <Text className="text-foreground-400 mt-4">
              Loading Dojo games...
            </Text>
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-destructive-100 text-center mb-4">
              Failed to load games
            </Text>
            <Text className="text-foreground-400 text-sm text-center">
              {error}
            </Text>
          </View>
        ) : (
          <View className="p-4 space-y-3">
            {filteredGames.map((game) => (
              <Pressable
                key={game.id}
                onPress={() => {
                  console.log('Selected game:', game.name);
                  // Here you would navigate to the game or handle game selection
                }}
                className="bg-background-300 rounded-lg p-3 active:bg-background-400"
              >
                <View className="flex-row gap-3">
                  {/* Game Image */}
                  <Image
                    source={{ uri: game.imageUrl }}
                    className="w-16 h-16 rounded-lg"
                    resizeMode="cover"
                  />

                  {/* Game Info */}
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-foreground font-semibold text-base flex-1 mr-2">
                        {game.name}
                      </Text>
                      <View
                        className={cn(
                          "px-2 py-0.5 rounded-full",
                          getDifficultyColor(game.difficulty),
                        )}
                      >
                        <Text className="text-xs font-medium capitalize">
                          {game.difficulty}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-foreground-400 text-sm mb-2 line-clamp-2">
                      {game.description}
                    </Text>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-4">
                        <View className="flex-row items-center gap-1">
                          <View className="w-2 h-2 bg-constructive-100 rounded-full" />
                          <Text className="text-foreground-400 text-xs">
                            {game.playerCount.toLocaleString()} players
                          </Text>
                        </View>
                        <View
                          className={cn(
                            "px-2 py-0.5 rounded-full",
                            getCategoryColor(game.category),
                          )}
                        >
                          <Text className="text-xs font-medium capitalize">
                            {game.category}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center gap-1">
                        <PlayIcon size="xs" className="text-foreground-400" />
                        <Text className="text-foreground-400 text-xs">
                          {game.estimatedPlayTime}m
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View className="p-4 border-t border-background-300">
        <Button
          variant="outline"
          size="sm"
          onPress={() => console.log("Settings pressed")}
          className="w-full"
        >
          <GearIcon size="sm" className="mr-2" />
          <Text>Game Settings</Text>
        </Button>
      </View>
    </View>
  );
}

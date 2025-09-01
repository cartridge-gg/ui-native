import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Text } from "#components";
import React, { useEffect, useState } from "react";
import { dojoGamesApi, type DojoGame } from "#utils/api";

export default function ActivityScreen() {
  const navigation = useNavigation();
  const [games, setGames] = useState<DojoGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch games from API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const fetchedGames = await dojoGamesApi.getGames();
        setGames(fetchedGames);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch games:", err);
        setError("Failed to load games");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-background-100 items-center justify-center">
        <ActivityIndicator size="large" color="#fbcb4a" />
        <Text className="text-foreground mt-4">Loading activity...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-background-100 items-center justify-center px-4">
        <Text className="text-destructive-100 text-center mb-4">Failed to load activity</Text>
        <Text className="text-foreground-400 text-sm text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-100">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4 space-y-4">
          <Text className="text-foreground-400 text-lg font-semibold">Recent</Text>

          {games.length > 0 ? (
            <View className="space-y-3">
              {games.slice(0, 5).map((game) => (
                <View key={game.id} className="bg-background-200 p-3 rounded-lg">
                  <Text className="text-foreground font-medium">{game.name}</Text>
                  <Text className="text-foreground-400 text-sm mt-1">
                    {game.description}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-foreground-400 text-center">
                No recent activity
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

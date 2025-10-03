import { useMemo } from "react";
import { FlatList, View } from "react-native";
import type { CardProps } from "#clone/arcade/context/activity";
import { useActivities } from "#clone/arcade/hooks/activity";
import { Text } from "#components";

export function ActivityScene() {
  const { activities, status } = useActivities();

  const { events, dates } = useMemo(() => {
    return {
      events: activities,
      dates: [...new Set(activities.map((event) => event.date))],
    };
  }, [activities]);

  if (status === "loading" && !events.length) return <LoadingState />;
  if (status === "error" || !events.length) return <EmptyState />;

  return (
    <FlatList
      data={dates}
      className="flex-1"
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      keyExtractor={(date) => date}
      renderItem={({ item: currentDate }) => (
        <View className="flex flex-col gap-2 mb-4">
          <Text className="py-3 text-xs font-semibold text-foreground-400 tracking-wider uppercase">
            {currentDate}
          </Text>
          {events
            .filter(({ date }) => date === currentDate)
            .map((props: CardProps, index) => (
              <ActivityCard
                key={`${currentDate}-${props.key}-${index}`}
                {...props}
              />
            ))}
        </View>
      )}
    />
  );
}

function ActivityCard(props: CardProps) {
  switch (props.variant) {
    case "token":
      return (
        <View className="flex-row items-center gap-3 p-3 bg-background-200 rounded-lg">
          <View className="size-10 rounded bg-background-100" />
          <View className="flex-1">
            <Text className="text-sm font-medium">{props.action}</Text>
            <Text className="text-xs text-foreground-300">
              {props.amount} {props.value}
            </Text>
          </View>
        </View>
      );
    case "collectible":
      return (
        <View className="flex-row items-center gap-3 p-3 bg-background-200 rounded-lg">
          <View className="size-10 rounded bg-background-100" />
          <View className="flex-1">
            <Text className="text-sm font-medium">{props.name}</Text>
            <Text className="text-xs text-foreground-300">
              {props.collection}
            </Text>
          </View>
        </View>
      );
    case "game":
      return (
        <View className="flex-row items-center gap-3 p-3 bg-background-200 rounded-lg">
          <View className="size-10 rounded bg-background-100" />
          <View className="flex-1">
            <Text className="text-sm font-medium">{props.title}</Text>
            <Text className="text-xs text-foreground-300">{props.website}</Text>
          </View>
        </View>
      );
    case "achievement":
      return (
        <View className="flex-row items-center gap-3 p-3 bg-background-200 rounded-lg">
          <View className="size-10 rounded bg-background-100" />
          <View className="flex-1">
            <Text className="text-sm font-medium">{props.title}</Text>
            <Text className="text-xs text-foreground-300">
              {props.points} pts
            </Text>
          </View>
        </View>
      );
  }
}

const LoadingState = () => {
  return (
    <View className="flex-1 p-4">
      <View className="w-1/4 h-4 bg-background-200 rounded mb-4" />
      {Array.from({ length: 10 }).map((_, index) => (
        <View
          key={`activity-skeleton-${index}`}
          className="h-16 bg-background-200 rounded mb-2"
        />
      ))}
    </View>
  );
};

const EmptyState = () => {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-foreground-300 text-center">
        No activity available
      </Text>
    </View>
  );
};

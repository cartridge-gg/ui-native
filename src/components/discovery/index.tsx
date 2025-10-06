import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { getChecksumAddress } from "starknet";
import type { Discover } from "#clone/arcade";
import { useArcade, useDiscovers } from "#clone/arcade";
import {
	EmptyStateActivityIcon,
	PlayerHeader,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Text,
	UserCheckIcon,
	UsersIcon,
} from "#components";
import { DiscoveryEvent } from "./event";

type TabValue = "all" | "following";

export interface DiscoveryProps {
	onTabChange?: (tab: TabValue) => void;
	initialTab?: TabValue;
	showHeader?: boolean;
}

export function Discovery({
	onTabChange,
	initialTab = "all",
	showHeader = true,
}: DiscoveryProps) {
	const [events, setEvents] = useState<{
		all: Discover[];
		following: Discover[];
	}>({
		all: [],
		following: [],
	});

	const [selected, setSelected] = useState<TabValue>(initialTab);
	const { playthroughs, status: activitiesStatus } = useDiscovers();
	const { editions } = useArcade();

	const following = useMemo(() => {
		// For mobile, we'll use a simplified following logic
		// In a real app, this would come from user's following list
		return [] as string[];
	}, []);

	const filteredEditions = useMemo(() => {
		return editions; // Show all editions on mobile
	}, [editions]);

	const handleTabChange = useCallback(
		(tab: TabValue) => {
			setSelected(tab);
			onTabChange?.(tab);
		},
		[onTabChange],
	);

	// Transform playthroughs data to match desktop structure
	useEffect(() => {
		if (!filteredEditions) {
			return;
		}
		if (!Object.entries(playthroughs)) {
			return;
		}

		const data = filteredEditions
			.flatMap((edition) => {
				const projectPlaythroughs = playthroughs[edition?.config?.project];
				if (!projectPlaythroughs) return [];
				return projectPlaythroughs;
			})
			.sort((a, b) => b.end - a.end);

		if (!data) return;
		const newEvents = {
			all: data,
			following: data.filter((event) =>
				following.includes(getChecksumAddress(event.callerAddress)),
			),
		};
		if (newEvents.all.length === 0) return;
		setEvents(newEvents);
	}, [playthroughs, filteredEditions, following]);

	return (
		<View className="flex-1">
			<Tabs
				value={selected}
				onValueChange={(v) => handleTabChange(v as TabValue)}
				className="flex-1"
			>
				<View className="p-4">
					<TabsList>
						<TabsTrigger value="all">
							<UsersIcon variant={selected === "all" ? "solid" : "line"} />
							<Text>All Players</Text>
						</TabsTrigger>
						<TabsTrigger value="following">
							<UserCheckIcon
								variant={selected === "following" ? "solid" : "line"}
							/>
							<Text>Following</Text>
						</TabsTrigger>
					</TabsList>
				</View>
				<TabsContent value="all" className="flex-1">
					<Content
						events={events.all}
						status={activitiesStatus}
						showHeader={showHeader}
					/>
				</TabsContent>
				<TabsContent value="following" className="flex-1">
					<Content
						events={events.following}
						status={activitiesStatus}
						showHeader={showHeader}
					/>
				</TabsContent>
			</Tabs>
		</View>
	);
}

function Content({
	events,
	status,
	showHeader = true,
}: {
	events: Discover[];
	status: "success" | "error" | "idle" | "loading";
	showHeader?: boolean;
}) {
	if (status === "loading" && events.length === 0) return <LoadingState />;
	if (status === "error" || events.length === 0) return <EmptyState />;

	return (
		<FlatList
			data={events}
			ListHeaderComponent={showHeader ? <PlayerHeader /> : null}
			keyExtractor={(item) => item.identifier}
			renderItem={({ item }) => <DiscoveryEvent {...item} />}
			showsVerticalScrollIndicator={false}
			ItemSeparatorComponent={() => <View className="h-px bg-transparent" />}
			contentContainerClassName="rounded-md overflow-hidden"
			contentContainerStyle={{ paddingHorizontal: 16 }}
		/>
	);
}

function LoadingState() {
	return (
		<View className="flex-1 gap-2 px-4 py-3">
			{Array.from({ length: 12 }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: Skeleton key
				<Skeleton key={i} className="h-11 w-full rounded" />
			))}
		</View>
	);
}

function EmptyState() {
	return (
		<View className="flex-1 items-center justify-center gap-3 px-6">
			<EmptyStateActivityIcon size="xl" />
			<Text className="text-base text-foreground-300">
				No activity available
			</Text>
		</View>
	);
}

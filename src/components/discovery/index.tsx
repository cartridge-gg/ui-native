import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { getChecksumAddress } from "starknet";
import { useArcade, useDiscovers } from "#clone/arcade";
import {
	EmptyStateActivityIcon,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Text,
	UserCheckIcon,
	UserIcon,
	UsersIcon,
} from "#components";
import { DiscoveryEvent, type DiscoveryEventProps } from "./event";

type TabValue = "all" | "following";

export interface DiscoveryEventData {
	identifier: string;
	name: string;
	timestamp: number;
	Icon: React.ReactNode;
	count: number;
	actions: string[];
	achievements: Array<{ title: string; icon: string; points: number }>;
	duration: number;
	address: string;
	onClick: () => void;
	logo?: string;
	color?: string;
}

export interface DiscoveryProps {
	onTabChange?: (tab: TabValue) => void;
	initialTab?: TabValue;
}

export function Discovery({ onTabChange, initialTab = "all" }: DiscoveryProps) {
	const router = useRouter();
	const [events, setEvents] = useState<{
		all: DiscoveryEventProps[];
		following: DiscoveryEventProps[];
	}>({
		all: [],
		following: [],
	});

	const [selected, setSelected] = useState<TabValue>(initialTab);
	const {
		playthroughs,
		usernames: activitiesUsernames,
		status: activitiesStatus,
	} = useDiscovers();
	const { games, editions } = useArcade();

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
		if (!Object.entries(activitiesUsernames)) {
			return;
		}

		const data = filteredEditions
			.flatMap((edition) => {
				const projectPlaythroughs = playthroughs[edition?.config?.project];
				if (!projectPlaythroughs) return [];

				return projectPlaythroughs
					.map((activity) => {
						const address = getChecksumAddress(activity.callerAddress);
						const username =
							activitiesUsernames[address] ??
							`${address.slice(0, 6)}…${address.slice(-4)}`;

						const game = games.find((game) => game.id === edition.gameId);

						if (!game) return null;

						return {
							identifier: activity.identifier,
							name: username,
							address,
							Icon: <UserIcon size="sm" variant="solid" />,
							duration: activity.end - activity.start,
							count: activity.count,
							actions: activity.actions,
							achievements: [...activity.achievements],
							timestamp: Math.floor(activity.end / 1000),
							logo: edition.properties?.icon,
							color: edition.color,
							onClick: () =>
								router.push(
									`../player/${getChecksumAddress(activity.callerAddress)}`,
								),
						};
					})
					.filter((item): item is NonNullable<typeof item> => item !== null);
			})
			.filter((item): item is NonNullable<typeof item> => item !== null)
			.sort((a, b) => b.timestamp - a.timestamp);

		if (!data) return;
		const newEvents = {
			all: data,
			following: data.filter((event) => following.includes(event.address)),
		};
		if (newEvents.all.length === 0) return;
		setEvents(newEvents);
	}, [
		playthroughs,
		filteredEditions,
		activitiesUsernames,
		following,
		games,
		router,
	]);

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
					<Content events={events.all} status={activitiesStatus} />
				</TabsContent>
				<TabsContent value="following" className="flex-1">
					<Content events={events.following} status={activitiesStatus} />
				</TabsContent>
			</Tabs>
		</View>
	);
}

function Content({
	events,
	status,
}: {
	events: DiscoveryEventProps[];
	status: "success" | "error" | "idle" | "loading";
}) {
	if (status === "loading" && events.length === 0) return <LoadingState />;
	if (status === "error" || events.length === 0) return <EmptyState />;

	return (
		<FlatList
			data={events}
			keyExtractor={(item) => item.identifier}
			renderItem={({ item }) => <DiscoveryEvent {...item} />}
			showsVerticalScrollIndicator={false}
			ItemSeparatorComponent={() => <View className="h-px bg-transparent" />}
			className="p-4"
			contentContainerClassName="rounded-md overflow-hidden"
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

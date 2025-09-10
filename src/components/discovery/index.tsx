import { useMemo, useState } from "react";
import { SectionList, View } from "react-native";
import { useDiscovers } from "#clone/arcade";
import {
	EmptyStateActivityIcon,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Text,
	UserCheckIcon,
	UsersIcon,
} from "#components";
import type { DiscoveryEventProps } from "./event";
import { DiscoveryGroup } from "./group";

type TabValue = "all" | "following";

const INITIAL_OFFSET = 30;

// Enhanced interface to match desktop complexity
export interface DiscoveryEvent {
	identifier: string;
	name: string;
	timestamp: number;
	logo?: string;
	color?: string;
	count: number;
	actions: string[];
	achievements: Array<{ title: string; icon: string; points: number }>;
	duration: number;
	address: string;
}

export interface DiscoveryProps {
	followingEvents?: DiscoveryEvent[];
	onTabChange?: (tab: TabValue) => void;
	initialTab?: TabValue;
}

export function Discovery({
	followingEvents,
	onTabChange,
	initialTab = "all",
}: DiscoveryProps) {
	const { playthroughs, status } = useDiscovers();
	const events = useMemo(() => playthroughs.mock, [playthroughs]);
	const followingEventsToShow = useMemo(() => {
		return events.filter((event) =>
			followingEvents?.some((fe) => fe.address === event.address),
		);
	}, [events, followingEvents]);

	const [selected, setSelected] = useState<TabValue>(initialTab);
	const [cap, setCap] = useState(INITIAL_OFFSET);

	const handleTabChange = (tab: TabValue) => {
		setSelected(tab);
		setCap(INITIAL_OFFSET);
		onTabChange?.(tab);
	};

	// Transform events to match component props
	const transformEvent = (event: DiscoveryEvent): DiscoveryEventProps => ({
		identifier: event.identifier,
		name: event.name,
		timestamp: event.timestamp,
		logo: event.logo,
		color: event.color,
		count: event.count,
		actions: event.actions,
		achievements: event.achievements,
		duration: event.duration,
	});

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
						events={events.map(transformEvent)}
						status={status}
						cap={cap}
						setCap={setCap}
					/>
				</TabsContent>
				<TabsContent value="following" className="flex-1">
					<Content
						events={followingEventsToShow.map(transformEvent)}
						status={status}
						cap={cap}
						setCap={setCap}
					/>
				</TabsContent>
			</Tabs>
		</View>
	);
}

function Content({
	events,
	status,
	cap,
	setCap,
}: {
	events: DiscoveryEventProps[];
	status: "success" | "error" | "idle" | "loading";
	cap: number;
	setCap: (n: number) => void;
}) {
	const limited = useMemo(() => events.slice(0, cap), [events, cap]);
	const sections = useMemo(
		() => [{ title: "Today", data: limited }],
		[limited],
	);

	if (status === "loading" && events.length === 0) return <LoadingState />;
	if (status === "error" || sections.length === 0) return <EmptyState />;

	return (
		<SectionList
			sections={sections}
			keyExtractor={(item) => item.identifier}
			renderItem={() => null}
			renderSectionHeader={({ section: { title } }) => (
				<View className="py-3 px-4">
					<Text className="text-xs font-semibold text-foreground-400 tracking-wider">
						{title}
					</Text>
				</View>
			)}
			renderSectionFooter={({ section }) => (
				<DiscoveryGroup rounded events={section.data} />
			)}
			showsVerticalScrollIndicator={false}
			ItemSeparatorComponent={() => <View className="h-px bg-transparent" />}
			contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
			onEndReached={() => setCap(cap + 24)}
			onEndReachedThreshold={0.5}
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

import { useMemo, useState } from "react";
import { SectionList, View } from "react-native";
import { useDiscovers } from "#clone/arcade";
import {
	DiscoveryGroup,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Text,
	UserCheckIcon,
	UsersIcon,
} from "#components";
import { EmptyStateActivityIcon } from "#components/icons/utility";
import { Skeleton } from "#components/primitives/skeleton";

type TabValue = "all" | "following";

const INITIAL_OFFSET = 30;

export default function GameActivityScreen() {
	const [selected, setSelected] = useState<TabValue>("all");
	const { playthroughs, status } = useDiscovers();
	const [cap, setCap] = useState(INITIAL_OFFSET);

	const events = useMemo(() => playthroughs.mock, [playthroughs]);

	return (
		<View className="flex-1">
			<Tabs
				value={selected}
				onValueChange={(v) => {
					setSelected(v as TabValue);
					setCap(INITIAL_OFFSET);
				}}
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
					<Content events={events} status={status} cap={cap} setCap={setCap} />
				</TabsContent>
				<TabsContent value="following" className="flex-1">
					<Content
						events={events.slice(0, Math.max(10, Math.floor(cap / 2)))}
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
	events: {
		identifier: string;
		name: string;
		timestamp: number;
		logo?: string;
		color?: string;
	}[];
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

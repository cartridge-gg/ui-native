import { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { getChecksumAddress } from "starknet";
import { useAchievements, useArcade } from "#clone/arcade";
import {
	BronzeTagIcon,
	EmptyStateActivityIcon,
	GoldTagIcon,
	SilverTagIcon,
	Skeleton,
	SparklesIcon,
	SvgClassContext,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Text,
	TextClassContext,
	UserCheckIcon,
	UserIcon,
	UsersIcon,
} from "#components";
import { cn } from "#utils";

interface EditionModel {
	config: {
		project: string;
	};
}

type TabValue = "all" | "following";

export interface LeaderboardRowData {
	address: string;
	name: string;
	rank: number;
	points: number;
	highlight: boolean;
	following: boolean;
	pins: Array<{ id: string; icon: string }>;
}

export interface LeaderboardProps {
	edition?: EditionModel;
	onPlayerClick?: (address: string) => void;
}

export function Leaderboard({ edition, onPlayerClick }: LeaderboardProps) {
	const [selected, setSelected] = useState<TabValue>("all");

	const { achievements, globals, players, usernames, isLoading, isError } =
		useAchievements();
	const { pins, follows } = useArcade();

	// Mock address for mobile - in real app this would come from wallet context
	const address = "0x0";

	const following = useMemo(() => {
		if (!address) return [];
		const addresses = follows[getChecksumAddress(address)] || [];
		if (addresses.length === 0) return [];
		return [...addresses, getChecksumAddress(address)];
	}, [follows]);

	const gamePlayers = useMemo(() => {
		return players[edition?.config.project || ""] || [];
	}, [players, edition]);

	const gameAchievements = useMemo(() => {
		return achievements[edition?.config.project || ""] || [];
	}, [achievements, edition]);

	const handleClick = useCallback(
		(nameOrAddress: string) => {
			onPlayerClick?.(nameOrAddress);
		},
		[onPlayerClick],
	);

	const gameData = useMemo(() => {
		const data = gamePlayers.map((player, index) => {
			const ids = pins[getChecksumAddress(player.address)] || [];
			const pinneds: { id: string; icon: string }[] = gameAchievements
				.filter(
					(item) =>
						player.completeds.includes(item.id) &&
						(ids.length === 0 || ids.includes(item.id)),
				)
				.sort((a, b) => a.id.localeCompare(b.id))
				.sort((a, b) => parseFloat(a.percentage) - parseFloat(b.percentage))
				.slice(0, 3)
				.map((item) => {
					return {
						id: item.id,
						icon: item.icon,
					};
				});
			return {
				address: getChecksumAddress(player.address),
				name:
					usernames[getChecksumAddress(player.address)] ||
					player.address.slice(0, 9),
				rank: index + 1,
				points: player.earnings,
				highlight: BigInt(player.address) === BigInt(address || "0x0"),
				pins: pinneds,
				following: following.includes(getChecksumAddress(player.address)),
			};
		});
		const newAll = data;
		const filtereds = data.filter((player) =>
			following.includes(getChecksumAddress(player.address)),
		);
		const newFollowings = filtereds;
		return {
			all: newAll,
			following: newFollowings,
		};
	}, [gamePlayers, gameAchievements, pins, usernames, following]);

	const gamesData = useMemo(() => {
		const data = globals.map((player, index) => {
			return {
				address: getChecksumAddress(player.address),
				name:
					usernames[getChecksumAddress(player.address)] ||
					player.address.slice(0, 9),
				rank: index + 1,
				points: player.earnings,
				highlight: BigInt(player.address) === BigInt(address || "0x0"),
				following: following.includes(getChecksumAddress(player.address)),
				pins: [],
			};
		});
		const newAll = data;
		const filtereds = data.filter((player) =>
			following.includes(getChecksumAddress(player.address)),
		);
		const newFollowings = filtereds;
		return {
			all: newAll,
			following: newFollowings,
		};
	}, [globals, usernames, following]);

	const filteredData = useMemo(() => {
		if (!edition) return gamesData;
		return gameData;
	}, [edition, gamesData, gameData]);

	const handleTabChange = useCallback((tab: TabValue) => {
		setSelected(tab);
	}, []);

	return (
		<Tabs
			value={selected}
			onValueChange={(v) => handleTabChange(v as TabValue)}
			className="p-4"
		>
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

			<TabsContent value="all">
				<Content
					data={filteredData.all}
					status={isLoading ? "loading" : isError ? "error" : "success"}
					onPlayerClick={handleClick}
				/>
			</TabsContent>
			<TabsContent value="following">
				<Content
					data={filteredData.following}
					status={isLoading ? "loading" : isError ? "error" : "success"}
					onPlayerClick={handleClick}
				/>
			</TabsContent>
		</Tabs>
	);
}

function Content({
	data,
	status,
	onPlayerClick,
}: {
	data: LeaderboardRowData[];
	status: "success" | "error" | "idle" | "loading";
	onPlayerClick: (address: string) => void;
}) {
	if (status === "loading" && data.length === 0) return <LoadingState />;
	if (status === "error" || data.length === 0) return <EmptyState />;

	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.address}
			renderItem={({ item }) => (
				<LeaderboardRow {...item} onClick={() => onPlayerClick(item.address)} />
			)}
			showsVerticalScrollIndicator={false}
			ItemSeparatorComponent={() => <View className="h-px bg-transparent" />}
			contentContainerClassName="rounded-md overflow-hidden"
		/>
	);
}

function LeaderboardRow({
	rank,
	name,
	points,
	highlight,
	following,
	// pins,
	onClick,
}: LeaderboardRowData & { onClick: () => void }) {
	return (
		<TextClassContext.Provider
			value={cn("text-sm font-medium text-nowrap", highlight && "fill-primary")}
		>
			<SvgClassContext.Provider
				value={highlight ? "bg-primary" : "bg-background-200"}
			>
				<View
					className={cn(
						"flex-row items-center justify-between px-3 py-2.5",
						highlight ? "bg-background-300" : "bg-background-200",
					)}
					onTouchEnd={onClick}
				>
					<View className="flex-row items-center gap-3">
						<View className="w-8 items-center">
							<Text className="text-foreground-400">{rank}.</Text>
						</View>
						<View className="size-5 items-center justify-center">
							{rank === 1 && <GoldTagIcon size="sm" />}
							{rank === 2 && <SilverTagIcon size="sm" />}
							{rank === 3 && <BronzeTagIcon size="sm" />}
						</View>
						<View className="flex-row items-center gap-2">
							<UserIcon size="sm" variant="solid" />
							<Text numberOfLines={1}>{name}</Text>
						</View>
					</View>

					<View className="flex-row items-center gap-3">
						{following && <UserCheckIcon size="sm" variant="solid" />}

						<View className="flex-row items-center gap-1">
							<SparklesIcon size="sm" variant="line" />
							<Text className="text-sm font-medium">{points}</Text>
						</View>
					</View>
				</View>
			</SvgClassContext.Provider>
		</TextClassContext.Provider>
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
				No leaderboard available for this game.
			</Text>
		</View>
	);
}

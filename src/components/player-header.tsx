import { useAccount } from "@starknet-react/core";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { getChecksumAddress } from "starknet";
import { useArcade } from "#clone/arcade";
import { useAchievements } from "#clone/arcade/hooks/achievements";
import { useAddress } from "#clone/arcade/hooks/address";
import {
	Button,
	SvgClassContext,
	Text,
	Thumbnail,
	UserAvatar,
} from "#components";
import { cn } from "#utils";
import { safeGetChecksumAddress } from "#utils/address";

export function PlayerHeader() {
	const { player: playerParam } = useLocalSearchParams<{ player: string }>();
	const { address, isSelf, self } = useAddress();
	const { usernames, globals } = useAchievements();
	const [loading, setLoading] = useState(false);
	const { account, isConnected } = useAccount();
	const { follows } = useArcade();

	// Use the player param from URL or default to current address
	const targetAddress = useMemo(() => {
		return safeGetChecksumAddress(playerParam, address);
	}, [playerParam, address]);

	const { rank, points } = useMemo(() => {
		const gamePlayers = globals;
		const points =
			gamePlayers.find(
				(player) => BigInt(player.address) === BigInt(targetAddress),
			)?.earnings || 0;
		const rank =
			gamePlayers.findIndex(
				(player) => BigInt(player.address) === BigInt(targetAddress),
			) + 1;
		return { rank, points };
	}, [globals, targetAddress]);

	const following = useMemo(() => {
		const followeds = follows[getChecksumAddress(self || "0x0")] || [];
		return followeds.includes(getChecksumAddress(targetAddress));
	}, [follows, targetAddress, self]);

	const { followerCount, followingCount } = useMemo(() => {
		const followeds = follows[getChecksumAddress(targetAddress)] || [];
		const followingCount = followeds.length;
		const followers = Object.keys(follows).filter((key) => {
			const followeds = follows[key] || [];
			return followeds.includes(getChecksumAddress(targetAddress));
		});
		const followerCount = followers.length;
		return { followerCount, followingCount };
	}, [follows, targetAddress]);

	const name = useMemo(() => {
		return (
			usernames[targetAddress] ||
			`0x${BigInt(targetAddress).toString(16)}`.slice(0, 9)
		);
	}, [usernames, targetAddress]);

	const Icon = useMemo(() => {
		return <UserAvatar username={name} className="h-full w-full" size="xl" />;
	}, [name]);

	const onFollowers = useCallback(() => {
		// TODO: Navigate to followers screen
		console.log("Navigate to followers");
	}, []);

	const onFollowing = useCallback(() => {
		// TODO: Navigate to following screen
		console.log("Navigate to following");
	}, []);

	const onFollow = useCallback(
		(following: boolean, target: string) => {
			if (!account) return;
			const process = async () => {
				setLoading(true);
				try {
					// TODO: Implement actual follow/unfollow functionality
					console.log(`${following ? "Unfollow" : "Follow"} ${target}`);
					// Simulate API call
					await new Promise((resolve) => setTimeout(resolve, 1000));
				} catch (error) {
					console.error(error);
				} finally {
					setLoading(false);
				}
			};
			process();
		},
		[account],
	);

	const compacted = isSelf;

	const rankColor = useMemo(() => {
		switch (rank) {
			case 1:
				return "text-yellow-500";
			case 2:
				return "text-gray-400";
			case 3:
				return "text-orange-600";
			default:
				return "text-foreground-300";
		}
	}, [rank]);

	return (
		<View className="relative p-3 pb-2 gap-y-2 border-b border-background-200">
			{!compacted && isConnected && (
				<View className="absolute top-3 right-3 z-10">
					{following && (
						<Button
							variant="secondary"
							onPress={() => onFollow(following, targetAddress)}
							disabled={loading}
							isLoading={loading}
							className="bg-background-200 hover:opacity-80 disabled:bg-background-125 normal-case font-normal tracking-normal font-sans text-sm transition-opacity h-9 px-2 py-2 rounded-full"
						>
							<Text className="text-sm">Follow</Text>
						</Button>
					)}
					<Button
						variant="secondary"
						onPress={() => onFollow(following, targetAddress)}
						disabled={loading}
						isLoading={loading}
						className="group bg-background-125 border border-background-200 disabled:bg-background-125 normal-case font-normal tracking-normal font-sans text-sm transition-colors h-9 px-2 py-2 rounded-full flex items-center justify-center text-foreground-300 hover:text-destructive-100 hover:bg-background-200"
					>
						<Text className="text-center text-sm">Following</Text>
					</Button>
				</View>
			)}

			<View className="flex-row items-center gap-3 pr-20">
				<Thumbnail icon={Icon} size="xl" variant="default" rounded />
				<View className="flex-1 gap-1">
					<View className="flex-row items-center gap-2">
						<Text className="text-lg font-semibold" numberOfLines={1}>
							{name}
						</Text>
						{rank !== 0 && (
							<Text className={cn("text-xs font-medium", rankColor)}>
								#{rank}
							</Text>
						)}
					</View>
					<Text className="text-sm text-foreground-300" numberOfLines={1}>
						{targetAddress.slice(0, 9)}...
					</Text>
				</View>
			</View>

			<View className="flex-row items-center gap-2">
				<SvgClassContext.Provider value="fill-foreground-300">
					<Text className="text-sm font-medium">{points} points</Text>
				</SvgClassContext.Provider>
			</View>

			{!compacted && (
				<View className="flex-row gap-4">
					<Button variant="link" onPress={onFollowers} className="p-0 h-auto">
						<Text className="text-sm text-foreground-300">
							{followerCount} followers
						</Text>
					</Button>
					<Button variant="link" onPress={onFollowing} className="p-0 h-auto">
						<Text className="text-sm text-foreground-300">
							{followingCount} following
						</Text>
					</Button>
				</View>
			)}
		</View>
	);
}

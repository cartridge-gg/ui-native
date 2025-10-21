import { useAccount } from "@starknet-react/core";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { getChecksumAddress } from "starknet";
import { useArcade } from "#clone/arcade";
import { useAchievements } from "#clone/arcade/hooks/achievements";
import { useAddress } from "#clone/arcade/hooks/address";
import {
	AchievementPlayerAvatar,
	Badge,
	BronzeIcon,
	BronzeTagIcon,
	Button,
	CopyAddress,
	DefaultIcon,
	FollowerTag,
	GoldIcon,
	GoldTagIcon,
	SilverIcon,
	SilverTagIcon,
	Text,
} from "#components";
import { cn } from "#utils";
import { formatAddress } from "#utils/account";
import { safeGetChecksumAddress } from "#utils/address";

type StatProps = {
	label: string;
	value: string;
	onPress?: () => void;
};

function Stat({ label, value, onPress }: StatProps) {
	return (
		<Button
			variant="ghost"
			onPress={onPress}
			className={cn(
				"px-2 py-1 rounded-full border border-transparent bg-transparent",
				onPress ? "active:bg-background-125" : "",
			)}
			accessibilityRole={onPress ? "button" : undefined}
		>
			<Text className="text-xs text-foreground-300">
				<Text className="text-xs font-medium text-foreground-100">{value}</Text>
				{label}
			</Text>
		</Button>
	);
}

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

	const { follower, followerCount, followingCount, followerUsernames } =
		useMemo(() => {
			const followeds = follows[getChecksumAddress(targetAddress)] || [];
			const followingCount = followeds.length;
			const followersMap = Object.keys(follows).filter((key) => {
				const followedsAddress = follows[key] || [];
				return followedsAddress.includes(getChecksumAddress(targetAddress));
			});
			const followerCount = followersMap.length;
			const addresses = follows[getChecksumAddress(self || "0x0")] || [];
			const intersection = addresses.filter((addr) =>
				followersMap.includes(addr),
			);
			return {
				follower: followersMap.includes(getChecksumAddress(self || "0x0")),
				followerCount,
				followingCount,
				followerUsernames: intersection.map(
					(addr) =>
						usernames[addr] || formatAddress(addr, { first: 2, last: 4 }),
				),
			};
		}, [follows, targetAddress, self, usernames]);

	const name = useMemo(() => {
		return (
			usernames[targetAddress] ||
			`0x${BigInt(targetAddress).toString(16)}`.slice(0, 9)
		);
	}, [usernames, targetAddress]);

	const onFollowers = useCallback(() => {
		// TODO: navigate to followers list once implemented
		console.log("Navigate to followers");
	}, []);

	const onFollowing = useCallback(() => {
		// TODO: navigate to following list once implemented
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

	const rankVariant = useMemo(() => {
		switch (rank) {
			case 1:
				return "gold" as const;
			case 2:
				return "silver" as const;
			case 3:
				return "bronze" as const;
			default:
				return "default" as const;
		}
	}, [rank]);

	const { BadgeSvg, badgeColor } = useMemo(() => {
		switch (rankVariant) {
			case "gold":
				return { BadgeSvg: GoldIcon, badgeColor: "#FDB836" } as const;
			case "silver":
				return { BadgeSvg: SilverIcon, badgeColor: "#C7CBD2" } as const;
			case "bronze":
				return { BadgeSvg: BronzeIcon, badgeColor: "#E39A5F" } as const;
			default:
				return { BadgeSvg: DefaultIcon, badgeColor: "#262A28" } as const;
		}
	}, [rankVariant]);

	const badgeDimensions = useMemo(() => {
		const ranked = rankVariant !== "default";
		return {
			outer: ranked ? 98 : 94,
			inner: ranked ? 76 : 72,
		};
	}, [rankVariant]);

	const avatarSize = useMemo(
		() => (rankVariant !== "default" ? "3xl" : "2xl"),
		[rankVariant],
	);

	const followerDescription = useMemo(() => {
		const names = followerUsernames.slice(0, 2);
		if (followerUsernames.length > 3) {
			return `Followed by ${names.join(", ")} and ${followerUsernames.length - 2} others you follow`;
		}
		if (followerUsernames.length === 3) {
			return `Followed by ${names.join(", ")} and ${followerUsernames.length - 2} other you follow`;
		}
		if (followerUsernames.length > 0) {
			return `Followed by ${names.join(" and ")}`;
		}
		return "Followed by no one you follow";
	}, [followerUsernames]);

	return (
		<View className="relative px-3 py-4 gap-y-3 border-b border-background-200">
			<View className="flex-row items-start gap-3 pr-16">
				<View
					className="relative items-center justify-center"
					style={{
						width: badgeDimensions.outer,
						height: badgeDimensions.outer,
					}}
				>
					<BadgeSvg
						width={badgeDimensions.outer}
						height={badgeDimensions.outer}
						color={badgeColor}
					/>
					<View
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-background-200 bg-background-125 shadow-[0px_16px_32px_rgba(0,0,0,0.45)]"
						style={{
							width: badgeDimensions.inner,
							height: badgeDimensions.inner,
						}}
					>
						<AchievementPlayerAvatar
							username={name}
							size={avatarSize}
							className="fill-primary"
						/>
					</View>
					{rankVariant !== "default" && (
						<View className="absolute -top-1 -right-1">
							{rankVariant === "gold" && (
								<GoldTagIcon size="lg" color={badgeColor} />
							)}
							{rankVariant === "silver" && (
								<SilverTagIcon size="lg" color={badgeColor} />
							)}
							{rankVariant === "bronze" && (
								<BronzeTagIcon size="lg" color={badgeColor} />
							)}
						</View>
					)}
				</View>
				<View className="flex-1 gap-1">
					<View className="flex-row items-center gap-2">
						<Text className="text-xl font-semibold" numberOfLines={1}>
							{name}
						</Text>
						{rank > 0 && (
							<Badge
								variant="outline"
								className="border-background-300 bg-background-150"
							>
								<Text className="text-xs font-medium text-foreground-100">
									#{rank}
								</Text>
							</Badge>
						)}
					</View>
					<CopyAddress
						address={getChecksumAddress(targetAddress)}
						first={4}
						last={4}
						className="self-start"
					/>
				</View>
			</View>

			<View className="flex-row items-center flex-wrap gap-2">
				<Stat
					label=" Followers"
					value={followerCount.toLocaleString()}
					onPress={onFollowers}
				/>
				<Stat
					label=" Following"
					value={followingCount.toLocaleString()}
					onPress={onFollowing}
				/>
				<Stat label=" Points" value={points.toLocaleString()} />
				{follower && <FollowerTag variant="default" />}
			</View>

			{!compacted && (
				<Text className="text-xs text-foreground-300">
					{followerDescription}
				</Text>
			)}

			{!compacted && isConnected && (
				<View className="absolute top-4 right-3 z-10 flex-row gap-2">
					<Button
						variant="secondary"
						onPress={() => onFollow(following, targetAddress)}
						disabled={loading}
						isLoading={loading}
						className="normal-case font-normal tracking-normal text-sm rounded-full px-4"
					>
						<Text className="text-sm text-foreground-100">
							{following ? "Following" : "Follow"}
						</Text>
					</Button>
				</View>
			)}
		</View>
	);
}

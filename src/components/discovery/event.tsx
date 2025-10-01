import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { getChecksumAddress } from "starknet";
import type { Discover } from "#clone/arcade";
import { useArcade, useDiscovers } from "#clone/arcade";
import {
	Badge,
	JoystickIcon,
	PulseIcon,
	SparklesIcon,
	Text,
	Thumbnail,
	TrophyIcon,
	UserIcon,
} from "#components";
import { formatAge } from "#utils";

export type DiscoveryEventProps = Discover;

export function DiscoveryEvent({
	identifier,
	project,
	callerAddress,
	end,
	count,
	achievements,
}: DiscoveryEventProps) {
	const router = useRouter();
	const { games, editions } = useArcade();
	const { usernames } = useDiscovers();
	const address = getChecksumAddress(callerAddress);
	const name =
		usernames[address] ?? `${address.slice(0, 6)}…${address.slice(-4)}`;
	const timestamp = Math.floor(end / 1000);
	const edition = editions.find((ed) => ed?.config?.project === project);
	const game = games.find((g) => g.id === edition?.gameId);
	const color = edition?.color ?? game?.color;
	const logo = edition?.properties?.icon ?? game?.properties?.icon;
	const age = useMemo(() => formatAge(timestamp), [timestamp]);
	const points = useMemo(
		() => achievements.reduce((acc, a) => acc + (a.points || 0), 0),
		[achievements],
	);
	// const duration = end - start;
	const onClick = useMemo(
		() => () => {
			router.push(`/player/${address}/inventory`);
		},
		[address, router],
	);

	return (
		<View
			className="flex-row items-center justify-between px-3 py-2 bg-background-200"
			key={identifier}
			onTouchEnd={onClick}
		>
			<View className="absolute h-10 left-0 right-0 top-0 opacity-10" />

			<View className="flex-1 flex-row items-center gap-1.5">
				<View>
					<UserIcon size="sm" variant="solid" />
				</View>
				<Text
					className="text-sm font-normal tracking-normal text-foreground-100"
					numberOfLines={1}
				>
					{name}
				</Text>
				<View className="flex-1 flex-row items-center gap-1 flex-wrap">
					<Badge className="size-5 items-center justify-center bg-translucent-dark-100">
						<JoystickIcon
							size="sm"
							variant="solid"
							className="fill-translucent-light-150"
						/>
					</Badge>
					<Badge className="bg-translucent-dark-100">
						<PulseIcon size="sm" variant="solid" color={color} />
						<Text style={{ color }}>{count}</Text>
					</Badge>
					{points > 0 && (
						<View className="flex-row items-center gap-1">
							{achievements.length > 0 && (
								<Badge className="bg-translucent-dark-100">
									<TrophyIcon size="sm" variant="solid" color={color} />
									<Text style={{ color }}>{achievements.length}</Text>
								</Badge>
							)}
							<Badge className="bg-translucent-dark-100">
								<SparklesIcon size="sm" variant="solid" color={color} />
								<Text style={{ color }}>{points}</Text>
							</Badge>
						</View>
					)}
				</View>
			</View>

			<View className="flex-row items-center gap-2">
				<Text className="text-xs text-translucent-light-150">{age}</Text>
				<Thumbnail icon={logo} size="sm" variant="light" rounded={false} />
			</View>
		</View>
	);
}

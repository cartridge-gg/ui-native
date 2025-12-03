import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Link } from "expo-router";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { Pressable, ScrollView, View, TouchableOpacity, TextInput, Animated, LayoutAnimation, Platform, UIManager } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useAccount, useConnect } from "@starknet-react/core";
import * as Clipboard from "expo-clipboard";
import { useArcade } from "#clone/arcade";
import { Text } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";
import { GameIcon } from "./game-icon";
import { ArcadeBrandIcon } from "./icons/brand/arcade-brand";
import { ArcadeIcon } from "./icons/brand/arcade";
import { UserAvatar } from "./user-avatar";
import { useFilterContext } from "../../../../contexts/FilterContext";
import { useGameContext } from "../../../../contexts/GameContext";
import type { TraitFilter } from "../../../../hooks/useTraitFilters";
import type { AttributeFilter } from "../../../../modules/arcade/src/generated/dojo";

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Simple chevron that rotates based on expanded state
function AnimatedChevron({ isExpanded }: { isExpanded: boolean }) {
	return (
		<View style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}>
			<Feather name="chevron-down" size={20} color="#a8a29e" />
		</View>
	);
}

export function SideDrawer({ navigation }: DrawerContentComponentProps) {
	const insets = useSafeAreaInsets();
	const arcade = useArcade();
	const { gamesList, version } = arcade;
	const { address, status, account } = useAccount();
	const { connect, connectors } = useConnect();
	const isConnected = status === "connected";
	const { currentGameColor, currentGameId } = useGameContext();
	const [username, setUsername] = useState<string | null>(null);
	
	// Use game color when in a game context, otherwise use default yellow
	const accentColor = currentGameId ? currentGameColor : '#FBCB4A';
	
	// Get username from account
	useEffect(() => {
		if (status === "connected" && account) {
			try {
				const mobileAccount = account as any;
				if (mobileAccount.getSessionInfo) {
					const info = mobileAccount.getSessionInfo();
					if (info?.username) {
						setUsername(info.username);
					}
				}
			} catch (e) {
				// Ignore error
			}
		} else {
			setUsername(null);
		}
	}, [status, account]);
	
	// Copy address to clipboard
	const handleCopyAddress = async () => {
		if (address) {
			await Clipboard.setStringAsync(address);
		}
	};
	
	const connector = useMemo(
		() => connectors.find(c => c.id === "controller_mobile") || connectors[0],
		[connectors],
	);
	const [expandedTraits, setExpandedTraits] = useState<Set<string>>(new Set());
	
	const {
		isFilterMode,
		availableFilters,
		selectedFilters,
		onFilterToggle,
		onClearAll,
	} = useFilterContext();

	// Use the pre-processed lightweight list
	const filteredGames = useMemo(() => {
		return gamesList;
	}, [version]); // Depend on version, not gamesList!

	// Group filters by trait name
	const groupedFilters = useMemo(() => {
		return availableFilters.reduce((acc, filter) => {
			if (!acc[filter.traitName]) {
				acc[filter.traitName] = [];
			}
			acc[filter.traitName].push(filter);
			return acc;
		}, {} as Record<string, TraitFilter[]>);
	}, [availableFilters]);

	const traitNames = Object.keys(groupedFilters).sort();

	const toggleTrait = useCallback((traitName: string) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpandedTraits((prev) => {
			const next = new Set(prev);
			if (next.has(traitName)) {
				next.delete(traitName);
			} else {
				next.add(traitName);
			}
			return next;
		});
	}, []);

	const isFilterSelected = (traitName: string, traitValue: string) => {
		return selectedFilters.some(
			(f) => f.traitName === traitName && f.traitValue === traitValue
		);
	};

	const handleClearAll = () => {
		onClearAll?.();
		setExpandedTraits(new Set());
	};

	// Render filter mode content
	if (isFilterMode) {
		return (
			<View className="flex-1 bg-background/100" style={{ paddingTop: insets.top }}>
				<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
					{/* Traits Section */}
					<View className="p-4">
						<View className="flex-row items-center justify-between px-2 py-3">
							<Text className="font-semibold text-2xs tracking-wider text-foreground-400">
								Traits
							</Text>
							{selectedFilters.length > 0 && (
								<TouchableOpacity onPress={handleClearAll}>
									<Text className="text-primary text-sm font-medium">
										Clear All
									</Text>
								</TouchableOpacity>
							)}
						</View>

						{traitNames.map((traitName) => {
							const traitFilters = groupedFilters[traitName];
							const isExpanded = expandedTraits.has(traitName);
							const totalCount = traitFilters.reduce(
								(sum, f) => sum + f.count,
								0
							);

							return (
								<View key={traitName} className="mb-2">
									{/* Trait Header */}
									<Pressable
										className="flex-row items-center justify-between bg-background-400 rounded-sm px-4 py-3"
										onPress={() => toggleTrait(traitName)}
									>
										<Text className="text-foreground text-base font-medium">
											{traitName}
										</Text>
										<View className="flex-row items-center">
											<Text className="text-foreground-400 text-sm mr-2">
												{totalCount}
											</Text>
											<AnimatedChevron isExpanded={isExpanded} />
										</View>
									</Pressable>

									{/* Trait Values */}
									{isExpanded && (
										<View className="mt-1 ml-4">
											{traitFilters.map((filter) => {
												const isSelected = isFilterSelected(
													filter.traitName,
													filter.traitValue
												);
												return (
													<Pressable
														key={`${filter.traitName}-${filter.traitValue}`}
														className="flex-row items-center justify-between py-2"
														onPress={() =>
															onFilterToggle?.({
																traitName: filter.traitName,
																traitValue: filter.traitValue,
															})
														}
													>
														<View className="flex-row items-center flex-1">
															<View
																className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
																	isSelected
																		? 'border-primary bg-primary'
																		: 'border-foreground-400'
																}`}
															>
																{isSelected && (
																	<Feather
																		name="check"
																		size={14}
																		color="#ffffff"
																	/>
																)}
															</View>
															<Text className="text-foreground-300 text-sm">
																{filter.traitValue}
															</Text>
														</View>
														<Text className="text-foreground-400 text-sm">
															{filter.count}
														</Text>
													</Pressable>
												);
											})}
										</View>
									)}
								</View>
							);
						})}
					</View>
				</ScrollView>
			</View>
		);
	}

	// Render normal game list mode
	return (
		<View className="flex-1 bg-background/100" style={{ paddingTop: insets.top }}>
			{/* Fixed Header Section */}
			<View>
				{/* Header Logo */}
				<View className="flex-row items-center px-4 py-4">
					<ArcadeBrandIcon style={{ width: 127, height: 32 }} color={accentColor} />
				</View>
				
				{/* Separator line */}
				<View className="mb-4" style={{ height: 1, backgroundColor: '#2a2a2a' }} />

				{/* User Profile Card - Only show when connected */}
				{isConnected && address && (
					<View className="mx-4 mb-4 p-4 rounded-lg border border-foreground-400/20">
						<View className="flex-row items-center">
							{/* Avatar */}
							<View className="mr-4">
								<UserAvatar username={username || 'User'} size={64} color={accentColor} />
							</View>
							
							{/* User Info */}
							<View className="flex-1">
								<Text className="text-foreground text-lg font-semibold mb-2">
									{username || 'User'}
								</Text>
								<Pressable 
									className="flex-row items-center bg-background-300 px-2 py-1.5 rounded self-start active:opacity-70"
									onPress={handleCopyAddress}
								>
									<Text className="text-foreground-400 text-xs font-mono">
										{`${address.slice(0, 6)}...${address.slice(-4)}`}
									</Text>
									<Feather name="copy" size={12} color="#a8a29e" style={{ marginLeft: 6 }} />
								</Pressable>
							</View>
						</View>
					</View>
				)}

				{/* Connect Button - Only show when not connected */}
				{!isConnected && (
					<Pressable 
						className="mx-4 mb-4 p-4 rounded-lg"
						style={{ borderWidth: 2, borderColor: `${accentColor}80` }}
						onPress={() => {
							if (connector) {
								connect({ connector });
							}
						}}
					>
						<View className="flex-row items-center">
							{/* Controller Icon */}
							<View className="w-16 h-16 rounded-lg bg-background-300 items-center justify-center mr-4">
								<Feather name="link" size={24} color={accentColor} />
							</View>
							
							{/* Connect Info */}
							<View className="flex-1">
								<Text className="text-foreground text-base font-semibold mb-2">Connect Controller</Text>
								<View className="flex-row items-center">
									<Feather name="gift" size={16} color="#a8a29e" />
									<Text className="text-foreground-200 text-sm ml-2">Access your inventory</Text>
								</View>
							</View>
						</View>
					</Pressable>
				)}

				{/* Connect X Account Card - Commented out for now */}
				{/* <View className="mx-4 mb-4 p-4 rounded-lg border-2 border-primary/50">
					<View className="flex-row items-center">
						<View className="w-16 h-16 rounded-lg bg-background-300 items-center justify-center mr-4">
							<Text className="text-foreground text-2xl font-bold">𝕏</Text>
						</View>
						<View className="flex-1">
							<Text className="text-foreground text-base font-semibold mb-2">Connect X Account</Text>
							<View className="flex-row items-center">
								<Feather name="gift" size={16} color="#a8a29e" />
								<View 
									className="ml-2 px-3 py-1 rounded-full flex-row items-center"
									style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', borderWidth: 1, borderColor: '#EAB308' }}
								>
									<Text className="text-primary text-sm font-semibold">Ⓒ 100</Text>
								</View>
							</View>
						</View>
					</View>
				</View> */}
			</View>

			{/* Scrollable Games List */}
			<ScrollView 
				className="flex-1" 
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
			>
				<View className="px-3">
					{/* Arcade Home Row */}
					<Link
						href="/(drawer)/(tabs)"
						replace
						asChild
					>
						<Pressable 
							className="flex-row items-center px-3 py-3 active:bg-background-100"
							onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
						>
							<View className="size-8 rounded bg-background-200 items-center justify-center">
								<ArcadeIcon style={{ width: 20, height: 20 }} color="#FBCB4A" />
							</View>
							<Text className="text-foreground text-sm flex-1 font-medium ml-3">
								Arcade
							</Text>
						</Pressable>
					</Link>
					
					{/* Game Items */}
					{filteredGames.map((g) => (
						<GameItem
							key={g.id}
							id={g.id.toString()}
							icon={g.icon}
							title={g.name}
							points={400}
							navigation={navigation}
							isSelected={currentGameId?.toString() === g.id.toString()}
							gameColor={g.color || '#FBCB4A'}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

function GameItem({
	id,
	icon,
	title,
	points,
	navigation,
	isSelected,
	gameColor,
}: {
	id: string;
	icon?: string;
	title: string;
	points?: number;
	navigation: DrawerContentComponentProps["navigation"];
	isSelected?: boolean;
	gameColor?: string;
}) {
	return (
		<Link
			href={`/game/${id}/marketplace`}
			replace
			asChild
		>
			<Pressable 
				className="flex-row items-center px-3 py-3 rounded-lg active:bg-background-100"
				style={isSelected ? { backgroundColor: `${gameColor}10` } : undefined}
				onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
			>
				<GameIcon 
					icon={icon} 
					title={title} 
					size="md" 
					variant="default"
				/>
				<Text 
					className="text-sm flex-1 font-medium ml-3"
					style={{ color: isSelected ? gameColor : '#ffffff' }}
				>
					{title}
				</Text>
				{/* Stars commented out for now */}
				{/* {points !== undefined && points > 0 && (
					<View className="flex-row items-center">
						<Feather name="star" size={14} color="#a8a29e" />
						<Text className="text-foreground-400 text-sm ml-1">{points}</Text>
					</View>
				)} */}
			</Pressable>
		</Link>
	);
}

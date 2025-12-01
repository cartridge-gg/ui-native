import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View, TouchableOpacity, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useArcade } from "#clone/arcade";
import { Input, Text } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";
import { GameIcon } from "./game-icon";
import { useFilterContext } from "../../../../contexts/FilterContext";
import type { TraitFilter } from "../../../../hooks/useTraitFilters";
import type { AttributeFilter } from "../../../../modules/arcade/src/generated/dojo";

export function SideDrawer({ navigation }: DrawerContentComponentProps) {
	const insets = useSafeAreaInsets();
	const arcade = useArcade();
	const { gamesList, version } = arcade;
	const [search, setSearch] = useState("");
	const [expandedTraits, setExpandedTraits] = useState<Set<string>>(new Set());
	
	const {
		isFilterMode,
		availableFilters,
		selectedFilters,
		onFilterToggle,
		onClearAll,
	} = useFilterContext();

	// Filter the pre-processed lightweight list
	const filteredGames = useMemo(() => {
		if (!search) {
			return gamesList; // Already lightweight!
		}
		
		// Filter by search
		const searchLower = search.toLowerCase();
		return gamesList.filter(g => g.name.toLowerCase().includes(searchLower));
	}, [version, search]); // Depend on version, not gamesList!

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

	const toggleTrait = (traitName: string) => {
		setExpandedTraits((prev) => {
			const next = new Set(prev);
			if (next.has(traitName)) {
				next.delete(traitName);
			} else {
				next.add(traitName);
			}
			return next;
		});
	};

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
			<View className="flex-1 bg-background-200" style={{ paddingTop: insets.top }}>
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
											<Feather
												name={isExpanded ? 'chevron-up' : 'chevron-down'}
												size={20}
												color="#a8a29e"
											/>
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
		<View className="flex-1" style={{ paddingTop: insets.top }}>
			<View className="flex-1 flex-col">
				<View className="p-4">
					<Input
						placeholder="Search"
						value={search}
						onChangeText={setSearch}
						className="border-background-300 hover:border-background-300 focus-visible:border-background-300 focus-visible:bg-background-200 bg-spacer"
					/>
				</View>

				<ScrollView 
					className="flex-1" 
					showsVerticalScrollIndicator={false}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
					updateCellsBatchingPeriod={50}
					initialNumToRender={10}
					windowSize={10}
				>
					<View className="px-3">
						<Text className="font-semibold text-2xs tracking-wider text-foreground-400 px-2 py-3">
							Arcade
						</Text>
						{/* biome-ignore lint/nursery/useUniqueElementIds: this is static */}
						<Item 
							id="arcade" 
							title="Arcade" 
							navigation={navigation}
							icon={undefined}
						/>

						<Text className="font-semibold text-2xs tracking-wider text-foreground-400 px-2 py-3">
							Games
						</Text>
						<View className="gap-1">
							{filteredGames.map((g) => (
								<Item
									key={g.id}
									id={g.id.toString()}
									icon={g.icon}
									title={g.name}
									navigation={navigation}
								/>
							))}
						</View>
					</View>
				</ScrollView>
				<View
					className="p-3 border-t border-background-100 bg-background-100"
					style={{
						height: TAB_BAR_HEIGHT + insets.bottom,
						paddingBottom: insets.bottom,
					}}
				>
					<Pressable className="bg-background-100 flex-row items-center justify-center p-3 rounded-lg">
						<Text className="text-foreground-300 mr-2">+</Text>
						<Text className="text-foreground-300 text-sm font-medium">
							Register Game
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

function Item({
	id,
	icon,
	title,
	navigation,
}: {
	id: string;
	icon?: string;
	title: string;
	navigation: DrawerContentComponentProps["navigation"];
}) {
	return (
		<Link
			href={id === "arcade" ? "/marketplace" : `/game/${id}/marketplace`}
			replace
			asChild
		>
			<Pressable 
				className="flex-row items-center p-3 active:bg-background-100 gap-2"
				onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
			>
				<GameIcon 
					icon={icon} 
					title={title} 
					size="md" 
					variant={id === "arcade" ? "primary" : "default"}
				/>
				<Text className="text-foreground text-sm flex-1 font-medium">
					{title}
				</Text>
			</Pressable>
		</Link>
	);
}

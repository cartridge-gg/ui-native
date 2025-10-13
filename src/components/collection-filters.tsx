import { useCallback, useState } from "react";
import { Modal, Pressable, ScrollView, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	ArrowIcon,
	Button,
	CaratIcon,
	Separator,
	SliderIcon,
	Text,
} from "#components";

type FilterStatus = "buy_now" | "show_all";

type PropertyFilter = {
	attribute: string;
	property: string;
};

interface CollectionFiltersProps {
	visible: boolean;
	onClose: () => void;
	status: FilterStatus;
	onStatusChange: (status: FilterStatus) => void;
	selectedFilters: PropertyFilter[];
	onFiltersChange: (filters: PropertyFilter[]) => void;
	attributes: { [key: string]: { property: string; count: number }[] };
}

export function CollectionFilters({
	visible,
	onClose,
	status,
	onStatusChange,
	selectedFilters,
	onFiltersChange,
	attributes,
}: CollectionFiltersProps) {
	const insets = useSafeAreaInsets();
	const [expandedSections, setExpandedSections] = useState<Set<string>>(
		new Set(Object.keys(attributes)),
	);
	const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});

	const toggleSection = (attribute: string) => {
		setExpandedSections((prev) => {
			const next = new Set(prev);
			if (next.has(attribute)) {
				next.delete(attribute);
			} else {
				next.add(attribute);
			}
			return next;
		});
	};

	const isFilterActive = useCallback(
		(attribute: string, property: string) => {
			return selectedFilters.some(
				(f) => f.attribute === attribute && f.property === property,
			);
		},
		[selectedFilters],
	);

	const toggleFilter = useCallback(
		(attribute: string, property: string) => {
			if (isFilterActive(attribute, property)) {
				onFiltersChange(
					selectedFilters.filter(
						(f) => !(f.attribute === attribute && f.property === property),
					),
				);
			} else {
				onFiltersChange([...selectedFilters, { attribute, property }]);
			}
		},
		[isFilterActive, selectedFilters, onFiltersChange],
	);

	const clearFilters = useCallback(() => {
		onFiltersChange([]);
		setSearchTerms({});
	}, [onFiltersChange]);

	const hasActiveFilters = selectedFilters.length > 0;

	const getFilteredProperties = useCallback(
		(attribute: string) => {
			const properties = attributes[attribute] || [];
			const searchTerm = searchTerms[attribute]?.toLowerCase() || "";
			if (!searchTerm) return properties;
			return properties.filter((p) =>
				p.property.toLowerCase().includes(searchTerm),
			);
		},
		[attributes, searchTerms],
	);

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}
		>
			<View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
				{/* Header */}
				<View className="flex-row items-center gap-4 p-4 border-b border-spacer-100">
					<Pressable
						onPress={onClose}
						className="w-9 h-9 items-center justify-center active:opacity-60"
					>
						<ArrowIcon variant="left" />
					</Pressable>
					<View className="flex-row items-center gap-2 flex-1">
						<SliderIcon size="md" />
						<Text className="text-lg font-semibold">Filters</Text>
					</View>
				</View>

				<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
					{/* Status Section */}
					<View className="p-4">
						<Text className="text-sm font-semibold text-foreground-200 mb-3">
							Status
						</Text>
						<View className="gap-2">
							<RadioItem
								label="Buy Now"
								selected={status === "buy_now"}
								onPress={() => onStatusChange("buy_now")}
							/>
							<RadioItem
								label="Show All"
								selected={status === "show_all"}
								onPress={() => onStatusChange("show_all")}
							/>
						</View>
					</View>

					<Separator />

					{/* Properties Section */}
					<View className="p-4">
						<View className="flex-row items-center justify-between mb-3">
							<Text className="text-sm font-semibold text-foreground-200">
								Properties
							</Text>
							{hasActiveFilters && (
								<Pressable onPress={clearFilters}>
									<Text className="text-sm text-primary">Clear All</Text>
								</Pressable>
							)}
						</View>

						<View className="gap-2">
							{Object.keys(attributes).map((attribute) => {
								const isExpanded = expandedSections.has(attribute);
								const properties = getFilteredProperties(attribute);
								const activeCount = selectedFilters.filter(
									(f) => f.attribute === attribute,
								).length;

								return (
									<View
										key={attribute}
										className="bg-background-200 rounded-lg"
									>
										<Pressable
											onPress={() => toggleSection(attribute)}
											className="flex-row items-center justify-between p-3 active:opacity-80"
										>
											<View className="flex-row items-center gap-2 flex-1">
												<Text className="text-sm font-medium flex-1">
													{attribute}
												</Text>
												{activeCount > 0 && (
													<View className="bg-primary rounded-full px-2 py-0.5">
														<Text className="text-xs font-semibold text-background">
															{activeCount}
														</Text>
													</View>
												)}
											</View>
											<CaratIcon
												size="sm"
												className={isExpanded ? "rotate-180" : ""}
											/>
										</Pressable>

										{isExpanded && (
											<View className="px-3 pb-3">
												{/* Search */}
												<View className="mb-2">
													<TextInput
														placeholder="Search..."
														value={searchTerms[attribute] || ""}
														onChangeText={(text) =>
															setSearchTerms((prev) => ({
																...prev,
																[attribute]: text,
															}))
														}
														className="bg-background-100 border border-background-300 rounded-lg px-3 py-2 text-sm text-foreground"
														placeholderTextColor="#666"
													/>
												</View>

												{/* Property checkboxes */}
												<View className="gap-1">
													{properties.map(({ property, count }) => (
														<CheckboxItem
															key={`${attribute}-${property}`}
															label={property}
															count={count}
															checked={isFilterActive(attribute, property)}
															disabled={count === 0}
															onPress={() => toggleFilter(attribute, property)}
														/>
													))}
													{properties.length === 0 && (
														<Text className="text-sm text-foreground-400 py-2 text-center">
															No properties found
														</Text>
													)}
												</View>
											</View>
										)}
									</View>
								);
							})}
						</View>
					</View>
				</ScrollView>

				{/* Footer */}
				<View
					className="p-4 border-t border-spacer-100"
					style={{ paddingBottom: insets.bottom + 16 }}
				>
					<Button onPress={onClose} className="w-full">
						<Text className="text-background font-semibold">Apply Filters</Text>
					</Button>
				</View>
			</View>
		</Modal>
	);
}

function RadioItem({
	label,
	selected,
	onPress,
}: {
	label: string;
	selected: boolean;
	onPress: () => void;
}) {
	return (
		<Pressable
			onPress={onPress}
			className="flex-row items-center gap-3 p-3 bg-background-200 rounded-lg active:bg-background-300"
		>
			<View
				className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
					selected ? "border-primary" : "border-foreground-400"
				}`}
			>
				{selected && <View className="w-3 h-3 rounded-full bg-primary" />}
			</View>
			<Text className="text-sm font-medium">{label}</Text>
		</Pressable>
	);
}

function CheckboxItem({
	label,
	count,
	checked,
	disabled,
	onPress,
}: {
	label: string;
	count: number;
	checked: boolean;
	disabled: boolean;
	onPress: () => void;
}) {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			className={`flex-row items-center justify-between p-2 rounded active:bg-background-100 ${
				disabled ? "opacity-50" : ""
			}`}
		>
			<View className="flex-row items-center gap-2 flex-1">
				<View
					className={`w-5 h-5 rounded border-2 items-center justify-center ${
						checked ? "bg-primary border-primary" : "border-foreground-400"
					}`}
				>
					{checked && <Text className="text-background text-xs">✓</Text>}
				</View>
				<Text className="text-sm flex-1" numberOfLines={1}>
					{label}
				</Text>
			</View>
			<Text className="text-xs text-foreground-400">{count}</Text>
		</Pressable>
	);
}

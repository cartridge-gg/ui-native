import { useMemo } from "react";
import { FlatList, View } from "react-native";

type ItemWithPlaceholder<T> = T | { __placeholder: true };

interface ItemGridProps<T> {
	data: T[];
	numColumns?: number;
	gap?: number;
	renderItem: (item: T) => React.ReactElement;
	keyExtractor: (item: T, index: number) => string;
	ListEmptyComponent?: React.ReactElement;
	maintainColumnWidth?: boolean;
}

function isPlaceholder<T>(
	item: ItemWithPlaceholder<T>,
): item is { __placeholder: true } {
	return (
		typeof item === "object" &&
		item !== null &&
		"__placeholder" in item &&
		item.__placeholder === true
	);
}

export function ItemGrid<T>({
	data,
	numColumns = 2,
	gap = 12,
	renderItem,
	keyExtractor,
	ListEmptyComponent,
	maintainColumnWidth = true,
}: ItemGridProps<T>) {
	const paddedData = useMemo<ItemWithPlaceholder<T>[]>(() => {
		if (!maintainColumnWidth) return data;

		const items: ItemWithPlaceholder<T>[] = [...data];
		const remainder = items.length % numColumns;
		if (remainder !== 0) {
			const placeholdersNeeded = numColumns - remainder;
			for (let i = 0; i < placeholdersNeeded; i++) {
				items.push({ __placeholder: true });
			}
		}
		return items;
	}, [data, numColumns, maintainColumnWidth]);

	return (
		<FlatList
			data={paddedData}
			numColumns={numColumns}
			scrollEnabled={false}
			columnWrapperStyle={{ gap }}
			contentContainerStyle={{ gap }}
			keyExtractor={keyExtractor}
			renderItem={({ item }) => {
				if (isPlaceholder(item)) {
					return <View className="flex-1" />;
				}
				return <View className="flex-1">{renderItem(item)}</View>;
			}}
			ListEmptyComponent={ListEmptyComponent}
		/>
	);
}

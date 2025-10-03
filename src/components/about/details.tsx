import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "#components";
import { cn } from "#utils";

export function AboutDetails({ content }: { content: string }) {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!content) return null;

	return (
		<View className="flex-col gap-2">
			<View className="h-10 flex items-center justify-start">
				<Text className="text-xs tracking-wider font-semibold text-foreground-400 uppercase">
					Details
				</Text>
			</View>
			<View>
				<Text
					className={cn(
						"text-xs font-normal text-foreground-100",
						!isExpanded && "line-clamp-3",
					)}
				>
					{content}
				</Text>
				{content.length > 150 && (
					<Pressable onPress={() => setIsExpanded(!isExpanded)}>
						<Text className="text-xs font-medium text-foreground-100 mt-1">
							{`Read ${isExpanded ? "less" : "more"}`}
						</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}

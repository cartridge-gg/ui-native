import { useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "#components";
import { cn } from "#utils";

export function AboutDetails({ content }: { content: string }) {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!content) return null;

	return (
		<View className="flex-col gap-2 w-full">
			<View className="h-10 flex-row items-center justify-start w-full">
				<Text className="text-xs tracking-wider font-semibold text-foreground-400 uppercase">
					Details
				</Text>
			</View>
			<View className="w-full">
				<Text
					className={cn(
						"text-xs font-normal text-foreground-100 w-full",
						!isExpanded && "line-clamp-3",
					)}
					style={{ textAlign: 'left', width: '100%' }}
				>
					{content}
				</Text>
				{content.length > 150 && (
					<Pressable onPress={() => setIsExpanded(!isExpanded)}>
						<Text 
							className="text-xs font-medium text-foreground-100 mt-1"
							style={{ textAlign: 'left' }}
						>
							{`Read ${isExpanded ? "less" : "more"}`}
						</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}

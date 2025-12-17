import { Image } from "expo-image";
import { Link, type Href } from "expo-router";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Thumbnail } from "#components";
import { sanitizeImageUri } from "#utils";

export interface GameCardProps {
	href: string;
	name: string;
	coverUri: string | undefined;
	logoUri: string | undefined;
	variant?: "default" | "featured";
}

export function GameCard({
	href,
	name,
	coverUri,
	logoUri,
	variant = "default",
}: GameCardProps) {
	const coverSource = useMemo(() => {
		return sanitizeImageUri(coverUri, `GameCard: ${name}`);
	}, [coverUri, name]);

	const isFeatured = variant === "featured";

	return (
		<Link href={href as Href} asChild>
			<Pressable className="flex-1 relative rounded-lg overflow-hidden">
				<View 
					className="relative overflow-hidden"
					style={{ height: isFeatured ? 200 : 192 }}
				>
					{/* Background cover image */}
					<View className="absolute inset-0 z-0">
						<Image
							className="size-full"
							source={coverSource}
							contentFit="cover"
							placeholder={require("#assets/placeholder.png")}
							cachePolicy="memory-disk"
							transition={150}
						/>
					</View>
					
					{/* Gradient overlay from dark at bottom to transparent */}
					<LinearGradient
						colors={["rgba(0, 0, 0, 0.95)", "rgba(0, 0, 0, 0.4)", "transparent"]}
						start={{ x: 0, y: 1 }}
						end={{ x: 0, y: 0 }}
						locations={[0, 0.5, 1]}
						className="absolute inset-0 z-10"
						pointerEvents="none"
					/>
					
					{/* Logo and name at bottom */}
					<View className={`absolute bottom-0 left-0 right-0 z-20 flex-row items-center gap-3 ${isFeatured ? 'p-4' : 'p-3'}`}>
						{/* Game Logo */}
						<Thumbnail
							icon={logoUri}
							size={isFeatured ? "xl" : "lg"}
							variant="default"
							rounded={false}
						/>
						
						{/* Game Name */}
						<Text
							className={`font-semibold flex-1 ${isFeatured ? 'text-xl' : 'text-lg'}`}
							numberOfLines={1}
							style={{ 
								color: '#ffffff',
								textShadowColor: 'rgba(0, 0, 0, 0.8)', 
								textShadowOffset: { width: 0, height: 1 }, 
								textShadowRadius: 3 
							}}
						>
							{name}
						</Text>
					</View>
				</View>
			</Pressable>
		</Link>
	);
}


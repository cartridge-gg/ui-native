import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { Image, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
	title: "Primitives/AspectRatio",
	component: AspectRatio,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Placeholder component for demonstration
const PlaceholderContent: React.FC<{ label: string }> = ({ label }) => {
	const { colors } = useTheme();

	return (
		<View className="flex-1 justify-center items-center bg-theme-background rounded-lg">
			<Text
				variant="sans-semibold-14"
				className="text-center text-theme-foreground-muted"
			>
				{label}
			</Text>
		</View>
	);
};

export const Default: Story = {
	render: () => (
		<View className="w-75">
			<AspectRatio ratio={16 / 9}>
				<PlaceholderContent label="16:9 Aspect Ratio" />
			</AspectRatio>
		</View>
	),
};

export const Square: Story = {
	render: () => (
		<View className="w-50">
			<AspectRatio ratio={1}>
				<PlaceholderContent label="1:1 Square" />
			</AspectRatio>
		</View>
	),
};

export const Portrait: Story = {
	render: () => (
		<View className="w-[150px]">
			<AspectRatio ratio={9 / 16}>
				<PlaceholderContent label="9:16 Portrait" />
			</AspectRatio>
		</View>
	),
};

export const WithImage: Story = {
	render: () => (
		<View className="w-75">
			<AspectRatio ratio={16 / 9}>
				<Image
					source={{ uri: "https://via.placeholder.com/800x450" }}
					className="w-full h-full rounded-lg"
					resizeMode="cover"
				/>
			</AspectRatio>
		</View>
	),
};

export const MultipleRatios: Story = {
	render: () => (
		<View className="gap-4 w-75">
			<AspectRatio ratio={21 / 9}>
				<PlaceholderContent label="21:9 Ultra Wide" />
			</AspectRatio>
			<AspectRatio ratio={16 / 9}>
				<PlaceholderContent label="16:9 Widescreen" />
			</AspectRatio>
			<AspectRatio ratio={4 / 3}>
				<PlaceholderContent label="4:3 Standard" />
			</AspectRatio>
			<AspectRatio ratio={1}>
				<PlaceholderContent label="1:1 Square" />
			</AspectRatio>
			<AspectRatio ratio={9 / 16}>
				<PlaceholderContent label="9:16 Portrait" />
			</AspectRatio>
		</View>
	),
};

export const VideoPlayer: Story = {
	render: () => {
		const { colors } = useTheme();

		return (
			<View className="w-[350px]">
				<AspectRatio ratio={16 / 9}>
					<View className="flex-1 bg-gray-900 rounded-lg justify-center items-center">
						<View className="w-15 h-15 bg-white/20 rounded-full justify-center items-center">
							<View className="w-0 h-0 ml-1 border-l-[10px] border-r-0 border-t-[6px] border-b-[6px] border-l-white border-t-transparent border-b-transparent" />
						</View>

						<View className="absolute bottom-4 left-4 right-4">
							<View className="flex-row items-center gap-2">
								<View className="h-1 bg-white/40 flex-1 rounded-full">
									<View className="h-1 bg-white w-1/3 rounded-full" />
								</View>
								<Text variant="caption" className="text-white opacity-80">
									2:45 / 8:30
								</Text>
							</View>
						</View>
					</View>
				</AspectRatio>
			</View>
		);
	},
};

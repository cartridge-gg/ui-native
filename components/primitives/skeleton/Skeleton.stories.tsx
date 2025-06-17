import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import {
	Skeleton,
	SkeletonAvatar,
	SkeletonCard,
	SkeletonText,
} from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
	title: "Primitives/Skeleton",
	component: Skeleton,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		width: 200,
		height: 20,
	},
};

export const Basic: Story = {
	render: () => (
		<View className="gap-4">
			<Skeleton width={100} height={16} />
			<Skeleton width={200} height={16} />
			<Skeleton width={150} height={16} />
		</View>
	),
};

export const Text: Story = {
	render: () => (
		<View className="gap-4">
			<SkeletonText lines={1} />
			<SkeletonText lines={3} />
			<SkeletonText lines={2} />
		</View>
	),
};

export const Avatar: Story = {
	render: () => (
		<View className="flex-row gap-4 items-center">
			<SkeletonAvatar size={32} />
			<SkeletonAvatar size={48} />
			<SkeletonAvatar size={64} />
		</View>
	),
};

export const Card: Story = {
	render: () => (
		<View className="gap-4">
			<SkeletonCard />
			<SkeletonCard />
		</View>
	),
};

export const Complex: Story = {
	render: () => (
		<View className="gap-4">
			<Skeleton width={300} height={200} borderRadius={12} />
			<Skeleton width="100%" height={8} borderRadius={4} />
			<View className="flex-row gap-2">
				<Skeleton width={60} height={60} borderRadius={8} />
				<View className="flex-1 gap-2">
					<Skeleton width="100%" height={16} />
					<Skeleton width="80%" height={16} />
					<Skeleton width="60%" height={16} />
				</View>
			</View>
		</View>
	),
};

export const Loading: Story = {
	render: () => (
		<View className="gap-6">
			{/* Profile loading */}
			<View className="flex-row gap-3 items-center">
				<SkeletonAvatar size={56} />
				<View className="flex-1 gap-1.5">
					<Skeleton width="40%" height={18} />
					<Skeleton width="60%" height={14} />
				</View>
			</View>

			{/* Content loading */}
			<View className="gap-3">
				<Skeleton width="90%" height={20} />
				<Skeleton width="95%" height={16} />
				<Skeleton width="85%" height={16} />
				<Skeleton width="75%" height={16} />
			</View>

			{/* List loading */}
			<View className="gap-2">
				{Array.from({ length: 3 }, (_, i) => (
					<View key={i} className="flex-row gap-3 items-center">
						<SkeletonAvatar size={40} />
						<View className="flex-1 gap-1">
							<Skeleton width="70%" height={16} />
							<Skeleton width="50%" height={12} />
						</View>
					</View>
				))}
			</View>
		</View>
	),
};

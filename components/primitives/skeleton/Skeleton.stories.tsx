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

export const Variants: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			<Skeleton width={100} height={16} />
			<Skeleton width={200} height={20} />
			<Skeleton width={150} height={24} />
			<Skeleton width="100%" height={32} />
		</View>
	),
};

export const Text: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			<SkeletonText lines={1} />
			<SkeletonText lines={3} />
			<SkeletonText lines={5} />
		</View>
	),
};

export const Avatar: Story = {
	render: () => (
		<View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
			<SkeletonAvatar size={32} />
			<SkeletonAvatar size={48} />
			<SkeletonAvatar size={64} />
			<SkeletonAvatar size={80} />
		</View>
	),
};

export const Card: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			<SkeletonCard />
			<SkeletonCard />
		</View>
	),
};

export const CustomShapes: Story = {
	render: () => (
		<View style={{ gap: 16 }}>
			<Skeleton width={300} height={200} borderRadius={12} />
			<Skeleton width={100} height={100} borderRadius={50} />
			<Skeleton width="100%" height={8} borderRadius={4} />
			<View style={{ flexDirection: "row", gap: 8 }}>
				<Skeleton width={60} height={60} borderRadius={8} />
				<View style={{ flex: 1, gap: 8 }}>
					<Skeleton width="100%" height={16} />
					<Skeleton width="80%" height={14} />
					<Skeleton width="60%" height={14} />
				</View>
			</View>
		</View>
	),
};

export const LoadingStates: Story = {
	render: () => (
		<View style={{ gap: 24 }}>
			{/* Profile loading */}
			<View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
				<SkeletonAvatar size={56} />
				<View style={{ flex: 1, gap: 6 }}>
					<Skeleton width="40%" height={18} />
					<Skeleton width="60%" height={14} />
				</View>
			</View>

			{/* Content loading */}
			<View style={{ gap: 12 }}>
				<Skeleton width="90%" height={20} />
				<SkeletonText lines={4} />
				<Skeleton width="100%" height={200} borderRadius={8} />
			</View>

			{/* List loading */}
			<View style={{ gap: 8 }}>
				{Array.from({ length: 3 }, (_, i) => (
					<View
						key={i}
						style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
					>
						<SkeletonAvatar size={40} />
						<View style={{ flex: 1, gap: 4 }}>
							<Skeleton width="70%" height={16} />
							<Skeleton width="50%" height={12} />
						</View>
					</View>
				))}
			</View>
		</View>
	),
};

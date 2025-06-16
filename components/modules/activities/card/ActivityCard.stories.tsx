import type { Meta, StoryObj } from "@storybook/react";
import { Image, View } from "react-native";
import { Text } from "../../../typography/Text";
import { ActivityAchievementCard, ActivityCard, ActivityGameCard } from "./";

const meta: Meta<typeof ActivityCard> = {
	title: "Modules/Activities/Card",
	component: ActivityCard,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock logo component
const MockLogo = ({ size = 48 }: { size?: number }) => (
	<View
		style={{
			width: size,
			height: size,
			borderRadius: size / 2,
			backgroundColor: "#fbcb4a",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<Text style={{ fontSize: 16, fontWeight: "bold" }}>🎮</Text>
	</View>
);

const MockTokenLogo = () => (
	<Image
		source={{
			uri: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/a3bfe959-50c4-4f89-0aef-b19207d82a00/logo",
		}}
		style={{ width: 48, height: 48, borderRadius: 24 }}
	/>
);

export const Game: Story = {
	render: () => (
		<View style={{ gap: 12 }}>
			<ActivityGameCard
				title="Attack"
				website="https://lootsurvivor.io"
				image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/icon.png"
			/>
			<ActivityGameCard
				title="Attack"
				website="https://lootsurvivor.io"
				image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/icon.png"
				certified
			/>
			<ActivityGameCard
				title="Attack"
				website="https://lootsurvivor.io"
				image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/icon.png"
				loading
			/>
			<ActivityGameCard
				title="Attack"
				website="https://lootsurvivor.io"
				image="https://raw.githubusercontent.com/cartridge-gg/presets/refs/heads/main/configs/loot-survivor/icon.png"
				error
			/>
		</View>
	),
};

export const Token: Story = {
	args: {
		Logo: <MockTokenLogo />,
		title: "Received",
		subTitle: "From 0x041a...123b",
		topic: "100 LORDS",
		subTopic: "$6.04",
	},
};

export const Achievement: Story = {
	render: () => (
		<View style={{ gap: 9 }}>
			<ActivityAchievementCard
				title="Achievement"
				website="https://lootsurvivor.io"
				topic="Squire"
				points={20}
				image="fa-seedling"
			/>
			<ActivityAchievementCard
				title="Achievement"
				website="https://lootsurvivor.io"
				topic="Squire"
				points={20}
				image="fa-seedling"
				certified
			/>
			<ActivityAchievementCard
				title="Achievement"
				website="https://lootsurvivor.io"
				topic="Squire"
				points={20}
				image="fa-seedling"
				loading
			/>
			<ActivityAchievementCard
				title="Achievement"
				website="https://lootsurvivor.io"
				topic="Squire"
				points={20}
				image="fa-seedling"
				error
			/>
		</View>
	),
};

export const Loading: Story = {
	args: {
		Logo: <MockLogo />,
		title: "Sending",
		subTitle: "To 0x041a...123b",
		topic: "100 LORDS",
		subTopic: "$6.04",
		loading: true,
	},
};

export const ErrorState: Story = {
	args: {
		Logo: <MockLogo />,
		title: "Failed",
		subTitle: "Transaction failed",
		topic: "100 LORDS",
		subTopic: "$6.04",
		error: true,
	},
};

export const Interactive: Story = {
	args: {
		Logo: <MockLogo />,
		title: "Attack",
		subTitle: "lootsurvivor.io",
		onPress: () => console.log("Activity card pressed"),
	},
};

export const AllStates: Story = {
	render: () => (
		<View style={{ gap: 12 }}>
			<ActivityCard
				Logo={<MockLogo />}
				title="Game Action"
				subTitle="lootsurvivor.io"
			/>
			<ActivityCard
				Logo={<MockTokenLogo />}
				title="Token Transfer"
				subTitle="From 0x041a...123b"
				topic="100 LORDS"
				subTopic="$6.04"
			/>
			<ActivityCard
				Logo={<MockLogo />}
				title="Loading"
				subTitle="Processing..."
				loading
			/>
			<ActivityCard
				Logo={<MockLogo />}
				title="Error"
				subTitle="Transaction failed"
				error
			/>
		</View>
	),
};

import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	CircleIcon,
	InfoIcon,
	Text,
} from "#components";

const meta: Meta<typeof Accordion> = {
	title: "Primitives/Accordion",
	component: Accordion,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
	render: () => (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger className="gap-1">
					<View className="flex flex-row items-center gap-1">
						<Text>Approve</Text>
						<Text className="text-foreground-200 font-bold">2 methods</Text>
					</View>
				</AccordionTrigger>
				<AccordionContent>
					{Array.from({ length: 3 }).map((_, i) => (
						<View
							key={`method-${i + 1}`}
							className="flex flex-row items-center gap-1"
						>
							<CircleIcon size="sm" className="text-foreground-400" />
							<View className="flex flex-row items-center gap-2">
								<Text>Method {i + 1}</Text>
								<InfoIcon size="sm" className="text-foreground-400" />
							</View>
						</View>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const TriggerColor: Story = {
	render: () => (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger className="gap-1 text-destructive-100">
					<View className="flex flex-row items-center gap-1">
						<Text>Approve</Text>
						<Text className="text-foreground-200 font-bold">2 methods</Text>
					</View>
				</AccordionTrigger>
				<AccordionContent>
					{Array.from({ length: 3 }).map((_, i) => (
						<View
							key={`method-${i + 1}`}
							className="flex flex-row items-center gap-1"
						>
							<CircleIcon size="sm" className="text-foreground-400" />
							<View className="flex flex-row items-center gap-2">
								<Text>Method {i + 1}</Text>
								<InfoIcon size="sm" className="text-foreground-400" />
							</View>
						</View>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentType } from "react";
import { ScrollView, View } from "react-native";
import {
	badgeIcons,
	brandColorIcons,
	brandIcons,
	directionalIcons,
	stateIcons,
	utilityIcons,
} from "#components/icons";
import type {
	DirectionalIconProps,
	IconProps,
	StateIconProps,
} from "#components/icons/types";
import { size } from "#components/icons/utils";
import { Text } from "#components/primitives/text";
import { cn } from "#utils";

const iconsByCategory = {
	badge: badgeIcons,
	brand: brandIcons,
	"brand-color": brandColorIcons,
	directional: directionalIcons,
	state: stateIcons,
	utility: utilityIcons,
};

const meta: Meta<typeof Icons> = {
	title: "Primitives/Icons",
	component: Icons,
	tags: ["autodocs"],
	argTypes: {
		category: {
			control: "select",
			options: Object.keys(iconsByCategory),
		},
		className: {
			control: "text",
			description: "Apply icon color by `text-<color-name>`.",
			table: {
				defaultValue: { summary: "text-current" },
			},
		},
		size: {
			control: "radio",
			options: Object.keys(size),
			table: {
				defaultValue: { summary: "default" },
			},
		},
		directionalVariant: {
			control: "radio",
			options: ["up", "right", "down", "left"],
			description: "Directional icons only.",
		},
		stateVariant: {
			control: "radio",
			options: ["solid", "line"],
			defaultValue: "solid",
			description: "State icons only.",
			table: {
				defaultValue: { summary: "solid" },
			},
		},
	},
	args: {
		category: "state",
		className: "text-foreground",
		size: "default",
		directionalVariant: "up",
		stateVariant: "solid",
	},
};

export default meta;

type Story = StoryObj<typeof Icons>;

export const Badge: Story = {
	args: {
		category: "badge",
	},
};

export const Brand: Story = {
	args: {
		category: "brand",
	},
};

export const BrandColor: Story = {
	args: {
		category: "brand-color",
	},
};

export const Directional: Story = {
	args: {
		category: "directional",
	},
};

export const State: Story = {
	args: {
		category: "state",
	},
};

export const Utility: Story = {
	args: {
		category: "utility",
	},
};

function Icons({
	className,
	category,
	size,
	directionalVariant,
	stateVariant,
}: {
	className: string;
	category: keyof typeof iconsByCategory;
	size?: IconProps["size"];
	directionalVariant: DirectionalIconProps["variant"];
	stateVariant: StateIconProps["variant"];
}) {
	return (
		<ScrollView>
			<View className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
				{Object.entries(iconsByCategory[category]).map(([, icon]) => (
					<View
						key={icon.displayName}
						className={cn(
							"border-background-200 border rounded flex flex-col items-center py-4 px-2 gap-2 overflow-hidden",
							className,
						)}
					>
						{(() => {
							switch (category) {
								case "directional": {
									const DirectionalIcon =
										icon as ComponentType<DirectionalIconProps>;
									return (
										<DirectionalIcon size={size} variant={directionalVariant} />
									);
								}
								case "state": {
									const StateIcon = icon as ComponentType<StateIconProps>;
									return <StateIcon size={size} variant={stateVariant} />;
								}
								default: {
									const Icon = icon as ComponentType<IconProps>;
									return <Icon size={size} />;
								}
							}
						})()}
						<Text className="text-[10px] md:text-xs text-foreground-400">
							{icon.displayName}
						</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
}

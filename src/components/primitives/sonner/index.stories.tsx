import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { SonnerToaster, toast } from ".";

const meta: Meta<typeof SonnerDemo> = {
	title: "Primitives/Sonner",
	component: SonnerDemo,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<>
				<Story />
				{/* Make sure to have this at the end of the story */}
				<SonnerToaster />
			</>
		),
	],
};

export default meta;

type Story = StoryObj<typeof SonnerDemo>;

export const Default: Story = {};

export const Success: Story = {
	render: () => (
		<Button onPress={() => toast.success("Success! Operation completed.")}>
			Success Toast
		</Button>
	),
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: Error is used as a type name in stories
export const Error: Story = {
	render: () => (
		<Button onPress={() => toast.error("Error! Something went wrong.")}>
			Error Toast
		</Button>
	),
};

export const Warning: Story = {
	render: () => (
		<Button onPress={() => toast.warning("Warning! Please check your input.")}>
			Warning Toast
		</Button>
	),
};

export const PromiseToast: Story = {
	render: () => (
		<Button
			onPress={() =>
				toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
					loading: "Loading...",
					success: () => "Success!",
					error: () => "Error occurred!",
				})
			}
		>
			Promise Toast
		</Button>
	),
};

function SonnerDemo() {
	return (
		<Button onPress={() => toast("Event has been created.")}>Show Toast</Button>
	);
}

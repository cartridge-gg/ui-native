import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "../button/Button";
import { Toast, ToastProvider, useToast } from "./Toast";

const meta: Meta<typeof Toast> = {
	title: "Primitives/Toast",
	component: Toast,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const ToastExample = () => {
			const { showToast } = useToast();

			return (
				<Button
					onPress={() =>
						showToast({
							title: "Scheduled: Catch up",
							description: "Friday, February 10, 2023 at 5:57 PM",
						})
					}
				>
					Show Toast
				</Button>
			);
		};

		return (
			<ToastProvider>
				<ToastExample />
			</ToastProvider>
		);
	},
};

export const Variants: Story = {
	render: () => {
		const [visibleDefault, setVisibleDefault] = useState(false);
		const [visibleSuccess, setVisibleSuccess] = useState(false);
		const [visibleError, setVisibleError] = useState(false);
		const [visibleWarning, setVisibleWarning] = useState(false);

		return (
			<View style={{ padding: 20, gap: 12 }}>
				<Button onPress={() => setVisibleDefault(true)}>Default Toast</Button>
				<Button onPress={() => setVisibleSuccess(true)}>Success Toast</Button>
				<Button onPress={() => setVisibleError(true)}>Error Toast</Button>
				<Button onPress={() => setVisibleWarning(true)}>Warning Toast</Button>

				<Toast
					title="Default"
					description="This is a default toast."
					visible={visibleDefault}
					onClose={() => setVisibleDefault(false)}
				/>

				<Toast
					title="Success"
					description="Operation completed successfully!"
					variant="success"
					visible={visibleSuccess}
					onClose={() => setVisibleSuccess(false)}
				/>

				<Toast
					title="Error"
					description="Something went wrong. Please try again."
					variant="error"
					visible={visibleError}
					onClose={() => setVisibleError(false)}
				/>

				<Toast
					title="Warning"
					description="Please check your input and try again."
					variant="warning"
					visible={visibleWarning}
					onClose={() => setVisibleWarning(false)}
				/>
			</View>
		);
	},
};

export const WithoutTitle: Story = {
	render: () => {
		const [visible, setVisible] = useState(false);

		return (
			<View style={{ padding: 20 }}>
				<Button onPress={() => setVisible(true)}>Show Toast</Button>
				<Toast
					description="This toast only has a description."
					visible={visible}
					onClose={() => setVisible(false)}
				/>
			</View>
		);
	},
};

export const AutoDismiss: Story = {
	render: () => {
		const [visible, setVisible] = useState(false);

		return (
			<View style={{ padding: 20 }}>
				<Button onPress={() => setVisible(true)}>Auto Dismiss (2s)</Button>
				<Toast
					title="Auto Dismiss"
					description="This toast will disappear in 2 seconds."
					visible={visible}
					duration={2000}
					onClose={() => setVisible(false)}
				/>
			</View>
		);
	},
};

// Toast Provider Example
const ToastExample = () => {
	const { showToast } = useToast();

	return (
		<View style={{ padding: 20, gap: 12 }}>
			<Button
				onPress={() =>
					showToast({
						title: "Success!",
						description: "Your action was completed successfully.",
						variant: "success",
					})
				}
			>
				Show Success Toast
			</Button>
			<Button
				onPress={() =>
					showToast({
						title: "Error!",
						description: "Something went wrong.",
						variant: "error",
					})
				}
			>
				Show Error Toast
			</Button>
			<Button
				onPress={() =>
					showToast({
						title: "Warning!",
						description: "Please be careful.",
						variant: "warning",
					})
				}
			>
				Show Warning Toast
			</Button>
		</View>
	);
};

export const WithProvider: Story = {
	render: () => (
		<ToastProvider>
			<ToastExample />
		</ToastProvider>
	),
};

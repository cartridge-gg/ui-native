import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../../typography/Text";
import { Button } from "../button/Button";
import { CircularProgress, ProgressBar, StepProgress } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
	title: "Primitives/ProgressBar",
	component: ProgressBar,
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <ProgressBar value={65} showLabel label="Loading..." />,
};

export const Variants: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Default</Text>
				<ProgressBar value={75} />
			</View>

			<View className="gap-2">
				<Text variant="label">Success</Text>
				<ProgressBar
					value={100}
					variant="success"
					fillColor="#10b981"
					trackColor="#dcfce7"
				/>
			</View>

			<View className="gap-2">
				<Text variant="label">Warning</Text>
				<ProgressBar
					value={60}
					variant="warning"
					fillColor="#f59e0b"
					trackColor="#fef3c7"
				/>
			</View>

			<View className="gap-2">
				<Text variant="label">Error</Text>
				<ProgressBar
					value={25}
					variant="error"
					fillColor="#ef4444"
					trackColor="#fee2e2"
				/>
			</View>
		</View>
	),
};

export const Sizes: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Small</Text>
				<ProgressBar value={75} size="sm" />
			</View>

			<View className="gap-2">
				<Text variant="label">Medium (Default)</Text>
				<ProgressBar value={75} />
			</View>

			<View className="gap-2">
				<Text variant="label">Large</Text>
				<ProgressBar value={75} size="lg" />
			</View>
		</View>
	),
};

export const CustomColors: Story = {
	render: () => (
		<View className="gap-6">
			<View className="gap-2">
				<Text variant="label">Custom Blue</Text>
				<ProgressBar value={75} fillColor="#3b82f6" trackColor="#dbeafe" />
			</View>

			<View className="gap-2">
				<Text variant="label">Custom Purple</Text>
				<ProgressBar value={60} fillColor="#8b5cf6" trackColor="#e9d5ff" />
			</View>

			<View className="gap-2">
				<Text variant="label">Custom Pink</Text>
				<ProgressBar value={90} fillColor="#ec4899" trackColor="#fce7f3" />
			</View>
		</View>
	),
};

export const Animated: Story = {
	render: () => {
		const [progress, setProgress] = useState(0);

		useEffect(() => {
			const timer = setInterval(() => {
				setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
			}, 500);

			return () => clearInterval(timer);
		}, []);

		return (
			<View className="gap-4">
				<Text variant="label">Animated Progress: {progress}%</Text>
				<ProgressBar value={progress} />
			</View>
		);
	},
};

export const CircularVariants: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<View className="gap-2 items-center">
				<Text variant="label">Default Circular</Text>
				<CircularProgress value={75} />
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">Success Circular</Text>
				<CircularProgress value={100} variant="success" />
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">Warning Circular</Text>
				<CircularProgress value={60} variant="warning" />
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">Error Circular</Text>
				<CircularProgress value={25} variant="error" />
			</View>
		</View>
	),
};

export const CircularSizes: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<View className="flex-row gap-6 items-center">
				<View className="gap-2 items-center">
					<Text variant="label">Small</Text>
					<CircularProgress value={75} size={60} />
				</View>

				<View className="gap-2 items-center">
					<Text variant="label">Medium</Text>
					<CircularProgress value={75} size={80} />
				</View>

				<View className="gap-2 items-center">
					<Text variant="label">Large</Text>
					<CircularProgress value={75} size={120} />
				</View>
			</View>
		</View>
	),
};

export const WithCustomContent: Story = {
	render: () => (
		<View className="gap-6 items-center">
			<View className="gap-2 items-center">
				<Text variant="label">Custom Content</Text>
				<CircularProgress value={85} showLabel={false}>
					<View className="items-center">
						<Text className="text-2xl font-bold">85</Text>
						<Text className="text-xs">Complete</Text>
					</View>
				</CircularProgress>
			</View>

			<View className="gap-2 items-center">
				<Text variant="label">With Icon</Text>
				<CircularProgress value={100} variant="success" showLabel={false}>
					<Text className="text-2xl">✓</Text>
				</CircularProgress>
			</View>
		</View>
	),
};

export const StepProgressExample: Story = {
	render: () => {
		return (
			<View className="gap-6">
				<View className="gap-2">
					<Text variant="label">Step 1 of 4</Text>
					<ProgressBar value={25} variant="default" />
				</View>

				<View className="gap-2">
					<Text variant="label">Step 2 of 4</Text>
					<ProgressBar value={50} variant="default" />
				</View>

				<View className="gap-2">
					<Text variant="label">Step 3 of 4</Text>
					<ProgressBar value={75} variant="warning" />
				</View>

				<View className="gap-2">
					<Text variant="label">Completed</Text>
					<ProgressBar value={100} variant="success" />
				</View>
			</View>
		);
	},
};

export const Interactive: Story = {
	render: () => {
		const [linearProgress, setLinearProgress] = useState(45);
		const [circularProgress, setCircularProgress] = useState(65);

		return (
			<View className="gap-6">
				<Text variant="heading-lg">Interactive Progress Controls</Text>

				<View className="gap-4">
					<Text variant="label">Linear Progress: {linearProgress}%</Text>
					<ProgressBar
						value={linearProgress}
						variant="default"
						animated
						showLabel
					/>
					<View className="flex-row gap-3">
						<Button
							variant="secondary"
							onPress={() =>
								setLinearProgress(Math.max(0, linearProgress - 10))
							}
						>
							-10%
						</Button>
						<Button
							variant="secondary"
							onPress={() =>
								setLinearProgress(Math.min(100, linearProgress + 10))
							}
						>
							+10%
						</Button>
						<Button variant="secondary" onPress={() => setLinearProgress(0)}>
							Reset
						</Button>
					</View>
				</View>

				<View className="gap-4 items-center">
					<Text variant="label">Circular Progress: {circularProgress}%</Text>
					<CircularProgress value={circularProgress} />
					<View className="flex-row gap-3">
						<Button
							variant="secondary"
							onPress={() =>
								setCircularProgress(Math.max(0, circularProgress - 10))
							}
						>
							-10%
						</Button>
						<Button
							variant="secondary"
							onPress={() =>
								setCircularProgress(Math.min(100, circularProgress + 10))
							}
						>
							+10%
						</Button>
						<Button variant="secondary" onPress={() => setCircularProgress(0)}>
							Reset
						</Button>
					</View>
				</View>
			</View>
		);
	},
};

export const FileUploadProgress: Story = {
	render: () => {
		const [uploadProgress, setUploadProgress] = useState(0);
		const [isUploading, setIsUploading] = useState(false);

		const startUpload = () => {
			setIsUploading(true);
			setUploadProgress(0);

			const interval = setInterval(() => {
				setUploadProgress((prev) => {
					if (prev >= 100) {
						clearInterval(interval);
						setIsUploading(false);
						return 100;
					}
					return prev + Math.random() * 10;
				});
			}, 200);
		};

		return (
			<View className="gap-4">
				<Text variant="heading-lg">File Upload Progress</Text>

				<View className="gap-2">
					<Text variant="label">
						{isUploading
							? "Uploading..."
							: uploadProgress === 100
								? "Upload Complete!"
								: "Ready to Upload"}
					</Text>
					<ProgressBar
						value={uploadProgress}
						variant={uploadProgress === 100 ? "success" : "default"}
						showLabel
						label="document.pdf"
					/>
				</View>

				<Button onPress={startUpload} disabled={isUploading}>
					{isUploading ? "Uploading..." : "Start Upload"}
				</Button>
			</View>
		);
	},
};

export const SkillLevels: Story = {
	render: () => {
		const skills = [
			{ name: "React Native", level: 90 },
			{ name: "TypeScript", level: 85 },
			{ name: "JavaScript", level: 95 },
			{ name: "Node.js", level: 80 },
			{ name: "GraphQL", level: 70 },
		];

		return (
			<View className="gap-4">
				<Text variant="heading-lg">Skill Levels</Text>

				{skills.map((skill, index) => (
					<View key={index} className="gap-1">
						<ProgressBar
							value={skill.level}
							showLabel
							label={skill.name}
							variant={
								skill.level >= 90
									? "success"
									: skill.level >= 70
										? "default"
										: "warning"
							}
						/>
					</View>
				))}
			</View>
		);
	},
};

export const OnboardingFlow: Story = {
	render: () => {
		const [currentStep, setCurrentStep] = useState(1);
		const steps = [
			"Welcome",
			"Account Setup",
			"Profile Info",
			"Preferences",
			"Complete",
		];

		return (
			<View className="gap-6">
				<Text variant="heading-lg">Onboarding Flow</Text>

				<StepProgress
					steps={steps}
					currentStep={currentStep}
					variant={currentStep >= steps.length ? "success" : "default"}
				/>

				<View className="gap-3">
					<Text variant="label">
						{currentStep < steps.length
							? `Step ${currentStep + 1}: ${steps[currentStep]}`
							: "Onboarding Complete!"}
					</Text>

					<View className="flex-row gap-3">
						<Button
							onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
							disabled={currentStep === 0}
							variant="secondary"
						>
							Previous
						</Button>
						<Button
							onPress={() =>
								setCurrentStep(Math.min(steps.length, currentStep + 1))
							}
							disabled={currentStep >= steps.length}
						>
							{currentStep >= steps.length - 1 ? "Finish" : "Next"}
						</Button>
					</View>
				</View>
			</View>
		);
	},
};

export const HealthDashboard: Story = {
	render: () => (
		<View className="gap-6">
			<Text variant="heading-lg">Health Dashboard</Text>

			<View className="flex-row gap-6 justify-around">
				<View className="items-center gap-2">
					<Text variant="label">Steps</Text>
					<CircularProgress
						value={75}
						variant="success"
						showLabel={false}
						size={100}
					>
						<View className="items-center">
							<Text className="text-base font-bold">7.5K</Text>
							<Text className="text-[10px] text-gray-600">/ 10K</Text>
						</View>
					</CircularProgress>
				</View>

				<View className="items-center gap-2">
					<Text variant="label">Calories</Text>
					<CircularProgress
						value={60}
						variant="warning"
						showLabel={false}
						size={100}
					>
						<View className="items-center">
							<Text className="text-base font-bold">1.2K</Text>
							<Text className="text-[10px] text-gray-600">/ 2K</Text>
						</View>
					</CircularProgress>
				</View>

				<View className="items-center gap-2">
					<Text variant="label">Water</Text>
					<CircularProgress
						value={40}
						variant="default"
						showLabel={false}
						size={100}
					>
						<View className="items-center">
							<Text className="text-base font-bold">3</Text>
							<Text className="text-[10px] text-gray-600">/ 8 cups</Text>
						</View>
					</CircularProgress>
				</View>
			</View>
		</View>
	),
};

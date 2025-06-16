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
		<View style={{ gap: 24 }}>
			<View style={{ gap: 8 }}>
				<Text variant="label">Default</Text>
				<ProgressBar value={75} showLabel label="Default Progress" />
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Success</Text>
				<ProgressBar
					value={100}
					variant="success"
					showLabel
					label="Completed"
				/>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Warning</Text>
				<ProgressBar
					value={45}
					variant="warning"
					showLabel
					label="Warning State"
				/>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Error</Text>
				<ProgressBar value={25} variant="error" showLabel label="Error State" />
			</View>
		</View>
	),
};

export const Sizes: Story = {
	render: () => (
		<View style={{ gap: 24 }}>
			<View style={{ gap: 8 }}>
				<Text variant="label">Small</Text>
				<ProgressBar value={60} size="sm" showLabel label="Small Progress" />
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Medium (Default)</Text>
				<ProgressBar value={60} size="md" showLabel label="Medium Progress" />
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Large</Text>
				<ProgressBar value={60} size="lg" showLabel label="Large Progress" />
			</View>
		</View>
	),
};

export const CustomColors: Story = {
	render: () => (
		<View style={{ gap: 24 }}>
			<View style={{ gap: 8 }}>
				<Text variant="label">Custom Blue</Text>
				<ProgressBar
					value={70}
					fillColor="#3b82f6"
					trackColor="#dbeafe"
					showLabel
					label="Custom Blue"
				/>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Custom Purple</Text>
				<ProgressBar
					value={85}
					fillColor="#8b5cf6"
					trackColor="#ede9fe"
					showLabel
					label="Custom Purple"
				/>
			</View>

			<View style={{ gap: 8 }}>
				<Text variant="label">Custom Pink</Text>
				<ProgressBar
					value={40}
					fillColor="#ec4899"
					trackColor="#fce7f3"
					showLabel
					label="Custom Pink"
				/>
			</View>
		</View>
	),
};

export const AnimatedProgress: Story = {
	render: () => {
		const [progress, setProgress] = useState(0);

		useEffect(() => {
			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) return 0;
					return prev + 1;
				});
			}, 50);

			return () => clearInterval(interval);
		}, []);

		return (
			<View style={{ gap: 16 }}>
				<Text variant="label">Animated Progress: {progress}%</Text>
				<ProgressBar value={progress} showLabel label="Loading..." />
			</View>
		);
	},
};

export const CircularProgressDefault: Story = {
	render: () => (
		<View style={{ gap: 24, alignItems: "center" }}>
			<View style={{ gap: 8, alignItems: "center" }}>
				<Text variant="label">Default Circular</Text>
				<CircularProgress value={75} />
			</View>

			<View style={{ gap: 8, alignItems: "center" }}>
				<Text variant="label">Success Circular</Text>
				<CircularProgress value={100} variant="success" />
			</View>

			<View style={{ gap: 8, alignItems: "center" }}>
				<Text variant="label">Warning Circular</Text>
				<CircularProgress value={45} variant="warning" />
			</View>

			<View style={{ gap: 8, alignItems: "center" }}>
				<Text variant="label">Error Circular</Text>
				<CircularProgress value={25} variant="error" />
			</View>
		</View>
	),
};

export const CircularSizes: Story = {
	render: () => (
		<View style={{ gap: 24, alignItems: "center" }}>
			<View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
				<View style={{ gap: 8, alignItems: "center" }}>
					<Text variant="label">Small</Text>
					<CircularProgress value={65} size={80} strokeWidth={6} />
				</View>

				<View style={{ gap: 8, alignItems: "center" }}>
					<Text variant="label">Medium</Text>
					<CircularProgress value={65} size={120} strokeWidth={8} />
				</View>

				<View style={{ gap: 8, alignItems: "center" }}>
					<Text variant="label">Large</Text>
					<CircularProgress value={65} size={160} strokeWidth={10} />
				</View>
			</View>
		</View>
	),
};

export const CircularWithCustomContent: Story = {
	render: () => (
		<View style={{ gap: 24, alignItems: "center" }}>
			<View style={{ gap: 8, alignItems: "center" }}>
				<Text variant="label">Custom Content</Text>
				<CircularProgress value={85} showLabel={false}>
					<View style={{ alignItems: "center" }}>
						<Text style={{ fontSize: 24, fontWeight: "bold" }}>85</Text>
						<Text style={{ fontSize: 12, color: "#666" }}>Score</Text>
					</View>
				</CircularProgress>
			</View>

			<View style={{ gap: 8, alignItems: "center" }}>
				<Text variant="label">With Icon</Text>
				<CircularProgress value={100} variant="success" showLabel={false}>
					<Text style={{ fontSize: 32 }}>✓</Text>
				</CircularProgress>
			</View>
		</View>
	),
};

export const StepProgressDefault: Story = {
	render: () => {
		const steps = ["Account", "Profile", "Preferences", "Complete"];

		return (
			<View style={{ gap: 24 }}>
				<View style={{ gap: 8 }}>
					<Text variant="label">Step 1 of 4</Text>
					<StepProgress steps={steps} currentStep={0} />
				</View>

				<View style={{ gap: 8 }}>
					<Text variant="label">Step 2 of 4</Text>
					<StepProgress steps={steps} currentStep={1} />
				</View>

				<View style={{ gap: 8 }}>
					<Text variant="label">Step 3 of 4</Text>
					<StepProgress steps={steps} currentStep={2} />
				</View>

				<View style={{ gap: 8 }}>
					<Text variant="label">Completed</Text>
					<StepProgress steps={steps} currentStep={4} variant="success" />
				</View>
			</View>
		);
	},
};

export const InteractiveProgress: Story = {
	render: () => {
		const [linearProgress, setLinearProgress] = useState(50);
		const [circularProgress, setCircularProgress] = useState(75);

		return (
			<View style={{ gap: 24 }}>
				<Text variant="heading-lg">Interactive Progress Controls</Text>

				<View style={{ gap: 16 }}>
					<Text variant="label">Linear Progress: {linearProgress}%</Text>
					<ProgressBar
						value={linearProgress}
						showLabel
						label="Linear Progress"
					/>
					<View style={{ flexDirection: "row", gap: 12 }}>
						<Button
							title="-10"
							onPress={() =>
								setLinearProgress(Math.max(0, linearProgress - 10))
							}
							variant="secondary"
						/>
						<Button
							title="+10"
							onPress={() =>
								setLinearProgress(Math.min(100, linearProgress + 10))
							}
							variant="secondary"
						/>
						<Button
							title="Reset"
							onPress={() => setLinearProgress(50)}
							variant="secondary"
						/>
					</View>
				</View>

				<View style={{ gap: 16, alignItems: "center" }}>
					<Text variant="label">Circular Progress: {circularProgress}%</Text>
					<CircularProgress value={circularProgress} />
					<View style={{ flexDirection: "row", gap: 12 }}>
						<Button
							title="-10"
							onPress={() =>
								setCircularProgress(Math.max(0, circularProgress - 10))
							}
							variant="secondary"
						/>
						<Button
							title="+10"
							onPress={() =>
								setCircularProgress(Math.min(100, circularProgress + 10))
							}
							variant="secondary"
						/>
						<Button
							title="Reset"
							onPress={() => setCircularProgress(75)}
							variant="secondary"
						/>
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
			<View style={{ gap: 16 }}>
				<Text variant="heading-lg">File Upload Progress</Text>

				<View style={{ gap: 8 }}>
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

				<Button
					title={isUploading ? "Uploading..." : "Start Upload"}
					onPress={startUpload}
					disabled={isUploading}
				/>
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
			<View style={{ gap: 16 }}>
				<Text variant="heading-lg">Skill Levels</Text>

				{skills.map((skill, index) => (
					<View key={index} style={{ gap: 4 }}>
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
			<View style={{ gap: 24 }}>
				<Text variant="heading-lg">Onboarding Flow</Text>

				<StepProgress
					steps={steps}
					currentStep={currentStep}
					variant={currentStep >= steps.length ? "success" : "default"}
				/>

				<View style={{ gap: 12 }}>
					<Text variant="label">
						{currentStep < steps.length
							? `Step ${currentStep + 1}: ${steps[currentStep]}`
							: "Onboarding Complete!"}
					</Text>

					<View style={{ flexDirection: "row", gap: 12 }}>
						<Button
							title="Previous"
							onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
							disabled={currentStep === 0}
							variant="secondary"
						/>
						<Button
							title={currentStep >= steps.length - 1 ? "Finish" : "Next"}
							onPress={() =>
								setCurrentStep(Math.min(steps.length, currentStep + 1))
							}
							disabled={currentStep >= steps.length}
						/>
					</View>
				</View>
			</View>
		);
	},
};

export const HealthDashboard: Story = {
	render: () => (
		<View style={{ gap: 24 }}>
			<Text variant="heading-lg">Health Dashboard</Text>

			<View
				style={{
					flexDirection: "row",
					gap: 24,
					justifyContent: "space-around",
				}}
			>
				<View style={{ alignItems: "center", gap: 8 }}>
					<Text variant="label">Steps</Text>
					<CircularProgress
						value={75}
						variant="success"
						showLabel={false}
						size={100}
					>
						<View style={{ alignItems: "center" }}>
							<Text style={{ fontSize: 16, fontWeight: "bold" }}>7.5K</Text>
							<Text style={{ fontSize: 10, color: "#666" }}>/ 10K</Text>
						</View>
					</CircularProgress>
				</View>

				<View style={{ alignItems: "center", gap: 8 }}>
					<Text variant="label">Calories</Text>
					<CircularProgress
						value={60}
						variant="warning"
						showLabel={false}
						size={100}
					>
						<View style={{ alignItems: "center" }}>
							<Text style={{ fontSize: 16, fontWeight: "bold" }}>1.2K</Text>
							<Text style={{ fontSize: 10, color: "#666" }}>/ 2K</Text>
						</View>
					</CircularProgress>
				</View>

				<View style={{ alignItems: "center", gap: 8 }}>
					<Text variant="label">Water</Text>
					<CircularProgress
						value={40}
						variant="default"
						showLabel={false}
						size={100}
					>
						<View style={{ alignItems: "center" }}>
							<Text style={{ fontSize: 16, fontWeight: "bold" }}>3</Text>
							<Text style={{ fontSize: 10, color: "#666" }}>/ 8 cups</Text>
						</View>
					</CircularProgress>
				</View>
			</View>
		</View>
	),
};

import type React from "react";
import { useEffect, useState } from "react";
import {
	Dimensions,
	Modal,
	SafeAreaView,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { cn } from "../utils/cn";
import { LayoutProvider, useLayoutContext } from "./context";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Custom hook for media queries (simplified for React Native)
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		// For React Native, we'll use screen dimensions
		// This is a simplified version - in a real app you might want more sophisticated breakpoint logic
		if (query.includes("min-width: 768px")) {
			setMatches(screenWidth >= 768);
		}
	}, [query]);

	return matches;
}

// Responsive Wrapper Component
interface ResponsiveWrapperProps {
	children: React.ReactNode;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<View
				className="flex-1 justify-center items-center bg-theme-background"
				style={{ width: screenWidth, height: screenHeight }}
			>
				<View
					className="border border-theme-border rounded-xl overflow-hidden bg-theme-background"
					style={{
						width: Math.min(432, screenWidth - 32),
						maxHeight: Math.min(600, screenHeight - 32),
					}}
				>
					{children}
				</View>
			</View>
		);
	}

	return (
		<SafeAreaView
			className="flex-1 bg-theme-background"
			style={{ width: screenWidth, height: screenHeight }}
		>
			{children}
		</SafeAreaView>
	);
};

// Main LayoutContainer Component
interface LayoutContainerProps {
	children: React.ReactNode;
	className?: string;
	modal?: boolean;
	onModalClick?: () => void;
}

const LayoutContainerInner: React.FC<LayoutContainerProps> = ({
	children,
	className,
	modal,
	onModalClick,
}) => {
	const { withBackground, setWithBackground } = useLayoutContext();

	return (
		<ResponsiveWrapper>
			{/* Background overlay for modal states */}
			{withBackground && (
				<Modal
					visible={withBackground}
					transparent
					animationType="fade"
					onRequestClose={() => setWithBackground(false)}
				>
					<TouchableWithoutFeedback onPress={() => setWithBackground(false)}>
						<View className="absolute inset-0 bg-black/50 z-50" />
					</TouchableWithoutFeedback>
				</Modal>
			)}

			<View className={cn("flex-1 flex-col min-h-0", className)}>
				{children}
			</View>
		</ResponsiveWrapper>
	);
};

// Main export with provider wrapper
export const LayoutContainer: React.FC<LayoutContainerProps> = (props) => {
	return (
		<LayoutProvider>
			<LayoutContainerInner {...props} />
		</LayoutProvider>
	);
};

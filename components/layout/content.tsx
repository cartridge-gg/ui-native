import type React from "react";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { Spinner } from "../primitives/spinner/Spinner";
import { Text } from "../typography/Text";
import { cn } from "../utils/cn";
import { useLayoutContext } from "./context";

// Main LayoutContent Component
interface LayoutContentProps {
	children: React.ReactNode;
	className?: string;
}

export const LayoutContent: React.FC<LayoutContentProps> = ({
	children,
	className,
}) => {
	const { withBottomTabs, withFooter } = useLayoutContext();

	// Error handling for conflicting layout states
	if (withBottomTabs && withFooter) {
		throw new Error("BottomTabs and Footer cannot be used at the same time");
	}

	// Calculate bottom margin compensation for tabs/footer
	const bottomMargin = useMemo(() => {
		if (withBottomTabs) return 72; // Height of bottom tabs
		if (withFooter) return 200; // Approximate footer height
		return 0;
	}, [withBottomTabs, withFooter]);

	return (
		<ScrollView
			className={cn("flex-1 w-full p-6", className)}
			contentContainerStyle={{
				flexGrow: 1,
				gap: 12,
				paddingBottom: bottomMargin,
			}}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
		>
			{children}
		</ScrollView>
	);
};

// LayoutContent Loader Component
export const LayoutContentLoader: React.FC = () => {
	return (
		<LayoutContent className="justify-center items-center p-4">
			<View className="w-full flex-1 justify-center items-center border border-dashed border-theme-background-muted rounded-md mb-4">
				<Spinner size="lg" className="text-theme-foreground-muted" />
			</View>
		</LayoutContent>
	);
};

// LayoutContent Error Component
interface LayoutContentErrorProps {
	children?: React.ReactNode;
}

export const LayoutContentError: React.FC<LayoutContentErrorProps> = ({
	children = "Oops! Something went wrong.",
}) => {
	return (
		<LayoutContent className="justify-center items-center gap-8 p-8">
			<Text
				variant="sans-semibold-14"
				className="text-theme-foreground text-center"
			>
				{children}
			</Text>
			<View className="w-30 h-30 bg-theme-border rounded-lg justify-center items-center">
				<Text variant="caption" className="text-theme-foreground-muted">
					Error
				</Text>
			</View>
		</LayoutContent>
	);
};

import React from "react";
import { Switch as RNSwitch, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

export interface SwitchProps {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	className?: string;
	testID?: string;
}

export const Switch = React.forwardRef<View, SwitchProps>(
	(
		{
			checked = false,
			onCheckedChange,
			disabled = false,
			className,
			testID,
			...props
		},
		ref,
	) => {
		const { colors } = useTheme();

		const handleValueChange = (value: boolean) => {
			if (!disabled && onCheckedChange) {
				onCheckedChange(value);
			}
		};

		return (
			<View ref={ref} className={cn("self-start", className)}>
				<RNSwitch
					value={checked}
					onValueChange={handleValueChange}
					disabled={disabled}
					testID={testID}
					// iOS styling to match web dimensions (h-5 w-9 = 20x36px)
					ios_backgroundColor={colors.background[400]}
					trackColor={{
						false: colors.background[400],
						true: colors.primary[100],
					}}
					thumbColor={colors["translucent-dark"][300]}
					// Android styling - scale to match web size
					style={{
						transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], // Scale down to match web size
						width: 36, // Match web w-9
						height: 20, // Match web h-5
					}}
					{...props}
				/>
			</View>
		);
	},
);

Switch.displayName = "Switch";

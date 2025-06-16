import type React from "react";
import { Circle, Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { StateIconProps } from "../types";

export const InfoIcon: React.FC<StateIconProps> = ({
	variant = "solid",
	...props
}) => {
	return (
		<BaseIcon {...props}>
			{variant === "solid" ? (
				<>
					<Circle cx="12" cy="12" r="10" fill="currentColor" />
					<Path
						d="M12 16V12M12 8H12.01"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</>
			) : (
				<>
					<Circle
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
					/>
					<Path
						d="M12 16V12M12 8H12.01"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</>
			)}
		</BaseIcon>
	);
};

InfoIcon.displayName = "InfoIcon";

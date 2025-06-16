import type React from "react";
import { Circle, Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const BranchIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path
				d="M6 3V15"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
			<Circle
				cx="18"
				cy="6"
				r="3"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Circle
				cx="6"
				cy="18"
				r="3"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Path
				d="M18 9C18 11.5 15.5 12 13 12H11C8.5 12 6 11.5 6 9"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</BaseIcon>
	);
};

BranchIcon.displayName = "BranchIcon";

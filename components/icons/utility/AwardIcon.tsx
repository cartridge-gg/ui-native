import type React from "react";
import { Circle, Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const AwardIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Circle
				cx="12"
				cy="8"
				r="7"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Path
				d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</BaseIcon>
	);
};

AwardIcon.displayName = "AwardIcon";

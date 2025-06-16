import type React from "react";
import { Circle, Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const MagnifyingGlassIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Circle
				cx="11"
				cy="11"
				r="8"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
			/>
			<Path
				d="M21 21L16.65 16.65"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</BaseIcon>
	);
};

MagnifyingGlassIcon.displayName = "MagnifyingGlassIcon";

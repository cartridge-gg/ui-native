import type React from "react";
import { Circle, Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const PacmanIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path
				d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12L12 12L12 2Z"
				fill="currentColor"
			/>
			<Circle cx="15" cy="9" r="1" fill="white" />
		</BaseIcon>
	);
};

PacmanIcon.displayName = "PacmanIcon";

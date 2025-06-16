import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const PlayIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
		</BaseIcon>
	);
};

PlayIcon.displayName = "PlayIcon";

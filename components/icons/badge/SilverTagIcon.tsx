import type React from "react";
import { Rect } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const SilverTagIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Rect x="2" y="8" width="20" height="8" rx="4" fill="#C0C0C0" />
		</BaseIcon>
	);
};

SilverTagIcon.displayName = "SilverTagIcon";

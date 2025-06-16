import type React from "react";
import { Circle } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const DefaultIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Circle cx="12" cy="12" r="10" fill="#6B7280" />
		</BaseIcon>
	);
};

DefaultIcon.displayName = "DefaultIcon";

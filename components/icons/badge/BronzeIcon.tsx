import type React from "react";
import { Circle } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const BronzeIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Circle cx="12" cy="12" r="10" fill="#CD7F32" />
		</BaseIcon>
	);
};

BronzeIcon.displayName = "BronzeIcon";

import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const CheckIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path
				d="M8.364 18.546 4 14.182l1.454-1.454 2.91 2.91L18.546 5.453 20 6.91 8.364 18.546Z"
				fill="currentColor"
			/>
		</BaseIcon>
	);
};

CheckIcon.displayName = "CheckIcon";

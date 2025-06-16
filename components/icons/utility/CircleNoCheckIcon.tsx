import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const CircleNoCheckIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path
				d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
			/>
		</BaseIcon>
	);
};

CircleNoCheckIcon.displayName = "CircleNoCheckIcon";

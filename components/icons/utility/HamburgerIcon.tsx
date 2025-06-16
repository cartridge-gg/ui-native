import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const HamburgerIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path
				d="M3 12H21M3 6H21M3 18H21"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</BaseIcon>
	);
};

HamburgerIcon.displayName = "HamburgerIcon";

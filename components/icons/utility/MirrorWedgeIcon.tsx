import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const MirrorWedgeIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path
				d="M12 2L22 20H2L12 2Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
			<Path
				d="M12 2V20"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</BaseIcon>
	);
};

MirrorWedgeIcon.displayName = "MirrorWedgeIcon";

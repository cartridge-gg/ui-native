import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const ChessIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path
				d="M9 3H15M9 3V6H15V3M9 6L7 18H17L15 6M9 6H15M12 9V12M10 12H14"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</BaseIcon>
	);
};

ChessIcon.displayName = "ChessIcon";

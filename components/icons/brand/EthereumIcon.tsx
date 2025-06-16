import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { IconProps } from "../types";

export const EthereumIcon: React.FC<IconProps> = (props) => {
	return (
		<BaseIcon {...props}>
			<Path
				d="M16.7469 12.15L12 15.05L7.25 12.15L12 4L16.7469 12.15ZM12 15.9812L7.25 13.0813L12 20L16.75 13.0813L12 15.9812Z"
				fill="currentColor"
			/>
		</BaseIcon>
	);
};

EthereumIcon.displayName = "EthereumIcon";

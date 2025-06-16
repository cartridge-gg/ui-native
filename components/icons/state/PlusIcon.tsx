import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { StateIconProps } from "../types";

export const PlusIcon: React.FC<StateIconProps> = ({ variant, ...props }) => {
	const getPath = () => {
		switch (variant) {
			case "solid":
				return "M13.9227 20V13.7119H20V10.321H13.9227V4H10.0773V10.321H4V13.7119H10.0773V20H13.9227Z";
			case "line":
				return "M11 20H13V13H20V11H13V4H11V11H4V13H11V20Z";
			default:
				return "M11 20H13V13H20V11H13V4H11V11H4V13H11V20Z";
		}
	};

	return (
		<BaseIcon {...props}>
			<Path d={getPath()} />
		</BaseIcon>
	);
};

PlusIcon.displayName = "PlusIcon";

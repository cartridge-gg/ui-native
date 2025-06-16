import type React from "react";
import { Path } from "react-native-svg";
import { BaseIcon } from "../BaseIcon";
import type { StateIconProps } from "../types";

export const ListIcon: React.FC<StateIconProps> = ({
	variant = "solid",
	...props
}) => {
	return (
		<BaseIcon {...props}>
			{variant === "solid" ? (
				<>
					<Path d="M3 6H21V8H3V6Z" fill="currentColor" />
					<Path d="M3 11H21V13H3V11Z" fill="currentColor" />
					<Path d="M3 16H21V18H3V16Z" fill="currentColor" />
				</>
			) : (
				<>
					<Path
						d="M3 6H21"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<Path
						d="M3 12H21"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<Path
						d="M3 18H21"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</>
			)}
		</BaseIcon>
	);
};

ListIcon.displayName = "ListIcon";

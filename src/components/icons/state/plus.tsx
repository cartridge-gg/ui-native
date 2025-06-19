import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const PlusIcon = memo<StateIconProps>(
	({ className, size, variant, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size, className })}
				ref={ref}
				{...props}
			>
				{(() => {
					switch (variant) {
						case "solid":
							return (
								<Path
									d="M13.9227 20V13.7119H20V10.321H13.9227V4H10.0773V10.321H4V13.7119H10.0773V20H13.9227Z"
									fill="currentColor"
								/>
							);
						case "line":
							return (
								<Path
									d="M11 20H13V13H20V11H13V4H11V11H4V13H11V20Z"
									fill="currentColor"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const ChestIcon = memo<StateIconProps>(
	({ className, size: sizeProp, variant, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				{(() => {
					switch (variant) {
						case "solid":
							return (
								<Path
									fill="currentColor"
									d="M3 9V12H7V5C4.79063 5 3 6.79063 3 9ZM3 17.5C3 18.3281 3.67188 19 4.5 19H7V13H3V17.5ZM16 13H14V14C14 14.5531 13.5531 15 13 15H11C10.4469 15 10 14.5531 10 14V13H8V19H16V13ZM19.5 19C20.3281 19 21 18.3281 21 17.5V13H17V19H19.5ZM21 9C21 6.79063 19.2094 5 17 5V12H21V9ZM16 12V5H8V12H10V11C10 10.4469 10.4469 10 11 10H13C13.5531 10 14 10.4469 14 11V12H16ZM12.5 11.5C12.5 11.225 12.275 11 12 11C11.725 11 11.5 11.225 11.5 11.5V13.5C11.5 13.775 11.725 14 12 14C12.275 14 12.5 13.775 12.5 13.5V11.5Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

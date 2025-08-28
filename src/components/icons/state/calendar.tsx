import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const CalendarIcon = memo<StateIconProps>(
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
									d="M8 5V6H6.5C5.67188 6 5 6.67188 5 7.5V9H19V7.5C19 6.67188 18.3281 6 17.5 6H16V5C16 4.44687 15.5531 4 15 4C14.4469 4 14 4.44687 14 5V6H10V5C10 4.44687 9.55312 4 9 4C8.44688 4 8 4.44687 8 5ZM19 10H5V18.5C5 19.3281 5.67188 20 6.5 20H17.5C18.3281 20 19 19.3281 19 18.5V10Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

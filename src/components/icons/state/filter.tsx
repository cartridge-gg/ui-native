import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const FilterIcon = memo<StateIconProps>(
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
									d="M4.122 5.715A1.245 1.245 0 0 1 5.25 5h13.502a1.253 1.253 0 0 1 .966 2.044L14 14.029V18a.998.998 0 0 1-1.6.8l-2-1.5a.993.993 0 0 1-.4-.8v-2.472L4.28 7.04a1.247 1.247 0 0 1-.16-1.325Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const OlmechIcon = memo<StateIconProps>(
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
						case "one":
							return (
								<>
									<Path
										d="M10 4H8V6H6V8H8V10H10V12H14V10H16V8H18V6H16V4H14V6H16V8H14V10H10V8H8V6H10V4Z"
										fill="currentColor"
									/>
									<Path d="M18 12H20V16H18V12Z" fill="currentColor" />
									<Path
										d="M16 14H14V16H10V14H8V16H10V20H14V16H16V14Z"
										fill="currentColor"
									/>
									<Path d="M6 16V12H4V16H6Z" fill="currentColor" />
								</>
							);
					}
				})()}
			</Svg>
		);
	},
);

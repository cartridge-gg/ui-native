import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const ScrollIcon = memo<StateIconProps>(
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
									d="M3 6.5V8c0 .553.447 1 1 1h2V6.5a1.5 1.5 0 0 0-3 0ZM6.5 5c.313.419.5.938.5 1.5V16c0 1.103.897 2 2 2s2-.897 2-2v-.166c0-1.012.822-1.834 1.834-1.834H18V8a3 3 0 0 0-3-3H6.5Zm11 14c1.934 0 3.5-1.566 3.5-3.5 0-.275-.225-.5-.5-.5h-7.666a.834.834 0 0 0-.834.834V16a3 3 0 0 1-3 3h8.5Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

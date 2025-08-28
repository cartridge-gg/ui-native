import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const DetailsIcon = memo<StateIconProps>(
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
									d="M9.333 4A2.135 2.135 0 0 0 7.2 6.133v8.534c0 1.176.957 2.133 2.133 2.133h5.974c.143 0 .286-.013.426-.043V13.6c0-.59.477-1.067 1.067-1.067h3.157c.03-.14.043-.283.043-.426V6.133A2.135 2.135 0 0 0 17.867 4H9.333ZM16.8 14.667V16.8l3.2-3.2h-3.2v1.067ZM13.867 18.4H8.533A2.933 2.933 0 0 1 5.6 15.467V8c0-.443-.357-.8-.8-.8-.443 0-.8.357-.8.8v7.467A4.534 4.534 0 0 0 8.533 20h5.334c.443 0 .8-.357.8-.8 0-.443-.357-.8-.8-.8Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

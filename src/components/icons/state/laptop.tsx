import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const LaptopIcon = memo<StateIconProps>(
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
									d="M7.2 6.40039C6.3175 6.40039 5.6 7.11789 5.6 8.00039V14.4004H7.2V8.00039H16.8V14.4004H18.4V8.00039C18.4 7.11789 17.6825 6.40039 16.8 6.40039H7.2ZM4.48 15.2004C4.215 15.2004 4 15.4154 4 15.6804C4 16.7404 4.86 17.6004 5.92 17.6004H18.08C19.14 17.6004 20 16.7404 20 15.6804C20 15.4154 19.785 15.2004 19.52 15.2004H4.48Z"
									fill="currentColor"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

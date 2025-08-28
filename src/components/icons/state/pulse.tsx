import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const PulseIcon = memo<StateIconProps>(
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
									d="M11.9775 6.0003C12.3475 5.9903 12.675 6.2328 12.7725 6.5903L14.6225 13.3703L15.065 12.4853C15.335 11.9428 15.89 11.6003 16.495 11.6003H19.2C19.6425 11.6003 20 11.9578 20 12.4003C20 12.8428 19.6425 13.2003 19.2 13.2003H16.495L15.115 15.9578C14.9675 16.2553 14.65 16.4278 14.32 16.3953C13.99 16.3628 13.715 16.1303 13.6275 15.8103L12.0925 10.1828L10.3825 18.1678C10.305 18.5278 9.995 18.7878 9.6275 18.8003C9.26 18.8128 8.9325 18.5728 8.8325 18.2203L7.3975 13.2003H4.8C4.3575 13.2003 4 12.8428 4 12.4003C4 11.9578 4.3575 11.6003 4.8 11.6003H7.3975C8.1125 11.6003 8.74 12.0728 8.935 12.7603L9.49 14.7003L11.2175 6.6328C11.295 6.2728 11.61 6.0103 11.9775 6.0003Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

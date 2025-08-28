import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const SunIcon = memo<StateIconProps>(
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
									d="M15.296 4.039a.506.506 0 0 1 .3.371l.622 3.372 3.372.619a.505.505 0 0 1 .371.3.496.496 0 0 1-.05.474L17.965 12l1.946 2.822c.097.14.116.318.05.474a.505.505 0 0 1-.371.3l-3.372.622-.622 3.372a.505.505 0 0 1-.3.371.496.496 0 0 1-.474-.05L12 17.965 9.179 19.91a.496.496 0 0 1-.475.05.505.505 0 0 1-.3-.371l-.622-3.372-3.372-.622a.506.506 0 0 1-.371-.3.496.496 0 0 1 .05-.474L6.035 12 4.09 9.179a.496.496 0 0 1-.05-.475.505.505 0 0 1 .371-.3l3.372-.622.622-3.372a.505.505 0 0 1 .3-.371.496.496 0 0 1 .475.05L12 6.035l2.822-1.946a.496.496 0 0 1 .474-.05ZM9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm7 0A4 4 0 1 0 8 12a4 4 0 0 0 7.998 0Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

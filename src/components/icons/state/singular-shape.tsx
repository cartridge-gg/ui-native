import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const SingularShapeIcon = memo<StateIconProps>(
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
									fill="currentColor"
									d="M4.11 7.682a1 1 0 0 1 1-1h13.36a1 1 0 0 1 1 1v4.941a1 1 0 0 1-.455.838l-6.728 4.38a2 2 0 0 1-1.092.324H5.11a1 1 0 0 1-1-1V7.682Z"
								/>
							);
						case "line":
							return (
								<Path
									fill="currentColor"
									fillRule="evenodd"
									d="M5.31 7.882v9.083h5.885a.8.8 0 0 0 .437-.13l6.637-4.32V7.882H5.31Zm-.2-1.2a1 1 0 0 0-1 1v9.483a1 1 0 0 0 1 1h6.085a2 2 0 0 0 1.092-.324l6.728-4.38a1 1 0 0 0 .454-.838V7.682a1 1 0 0 0-1-1H5.11Z"
									clipRule="evenodd"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const MinusIcon = memo<IconProps>(
	({ className, size, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size, className })}
				ref={ref}
				{...props}
			>
				<Path fill="currentColor" d="M20 13.712v-3.391H4v3.391h16Z" />
			</Svg>
		);
	},
);

MinusIcon.displayName = "MinusIcon";

import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const DotsIcon = memo<IconProps>(
	({ className, size, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size, className })}
				ref={ref}
				{...props}
			>
				<Path
					fill="currentColor"
					d="M16.308 12A1.847 1.847 0 1 1 20 12a1.847 1.847 0 0 1-3.693 0Zm-6.154 0a1.847 1.847 0 1 1 3.693.001A1.847 1.847 0 0 1 10.154 12Zm-2.462 0A1.846 1.846 0 1 1 4 12a1.846 1.846 0 0 1 3.692 0Z"
				/>
			</Svg>
		);
	},
);

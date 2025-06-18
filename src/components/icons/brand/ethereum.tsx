import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const EthereumIcon = memo<IconProps>(
	({ className, size, ref, ...props }) => {
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size, className })}
				ref={ref}
				{...props}
			>
				<Path
					d="M16.7469 12.15L12 15.05L7.25 12.15L12 4L16.7469 12.15ZM12 15.9812L7.25 13.0813L12 20L16.75 13.0813L12 15.9812Z"
					fill="currentColor"
				/>
			</Svg>
		);
	},
);

EthereumIcon.displayName = "EthereumIcon";

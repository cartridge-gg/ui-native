import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { DirectionalIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const CaratIcon = memo<DirectionalIconProps>(
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
						case "up":
							return <Path fill="currentColor" d="m8 13.6 4-4 4 4v.8H8v-.8Z" />;
						case "right":
							return <Path fill="currentColor" d="m10.4 8 4 4-4 4h-.8V8h.8Z" />;
						case "down":
							return (
								<Path fill="currentColor" d="m16 10.4-4 4-4-4v-.8h8v.8Z" />
							);
						case "left":
							return (
								<Path fill="currentColor" d="m13.6 16-4-4 4-4h.8v8h-.8Z" />
							);
					}
				})()}
			</Svg>
		);
	},
);

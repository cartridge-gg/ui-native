import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const GearIcon = memo<IconProps>(
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
					d="M19.5 9.207c.1.272.016.575-.2.77l-1.353 1.23a6.044 6.044 0 0 1 0 1.588l1.353 1.232c.216.194.3.497.2.769a7.752 7.752 0 0 1-.494 1.072l-.147.253a7.953 7.953 0 0 1-.69.975.708.708 0 0 1-.766.213l-1.741-.553c-.419.322-.882.59-1.375.793l-.391 1.785a.706.706 0 0 1-.569.557 8.074 8.074 0 0 1-2.657 0 .706.706 0 0 1-.569-.557l-.39-1.785a6.01 6.01 0 0 1-1.376-.793l-1.737.556a.713.713 0 0 1-.766-.213 7.946 7.946 0 0 1-.69-.975l-.148-.253c-.19-.344-.356-.7-.494-1.072a.708.708 0 0 1 .2-.769L6.054 12.8a6.048 6.048 0 0 1 0-1.59L4.7 9.975a.708.708 0 0 1-.2-.769c.138-.372.303-.728.494-1.072l.147-.253c.206-.344.438-.669.69-.975.185-.225.492-.3.767-.213l1.74.554c.42-.322.882-.591 1.376-.794l.39-1.785a.706.706 0 0 1 .57-.556 8.077 8.077 0 0 1 2.657-.003.706.706 0 0 1 .568.556l.39 1.784c.495.204.957.472 1.376.794l1.741-.553a.713.713 0 0 1 .766.213c.253.306.484.631.69.975l.147.253c.191.344.357.7.494 1.072l-.003.003Zm-7.498 5.295a2.5 2.5 0 1 0 .001-5 2.5 2.5 0 0 0-.001 5Z"
				/>
			</Svg>
		);
	},
);

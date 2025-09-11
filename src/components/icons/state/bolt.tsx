import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const BoltIcon = memo<StateIconProps>(
	({ className, size: sizeProp, variant, color, ref, ...props }) => {
		const hookSvgClass = useSvgClass();
		const svgClass = className ?? hookSvgClass ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp })}
				ref={ref}
				{...props}
			>
				{(() => {
					switch (variant) {
						case "solid":
							return (
								<Path
									// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

									className={color ? undefined : svgClass}
									fill={color}
									d="M15.919 5.394a1 1 0 0 0-1.578-1.147l-8 7A1 1 0 0 0 7 13h3.484l-2.403 5.606a1 1 0 0 0 1.578 1.147l8-7a1 1 0 0 0 .277-1.103 1.002 1.002 0 0 0-.937-.647h-3.484l2.403-5.609Z"
								/>
							);
						case "line":
							return (
								<Path
									// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

									className={color ? undefined : svgClass}
									fill={color}
									d="M14.588 4.197a.777.777 0 0 1 1.25.843L13.709 11h3.42c.493 0 .871.378.871.844a.843.843 0 0 1-.284.634l-8.307 7.328a.779.779 0 0 1-1.247-.847L10.29 13H6.807a.807.807 0 0 1-.536-1.41l8.317-7.393Zm.018 1.323L7.315 12H11a.498.498 0 0 1 .472.669l-2.078 5.819L16.744 12H13a.498.498 0 0 1-.41-.213c-.093-.159-.115-.303-.062-.456l2.078-5.81Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const PlusIcon = memo<StateIconProps>(
	({ className, size: sizeProp, variant, ref, ...props }) => {
		const svgClass = useSvgClass() ?? "fill-foreground";
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
									d="M13.9227 20V13.7119H20V10.321H13.9227V4H10.0773V10.321H4V13.7119H10.0773V20H13.9227Z"
									// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

									className={svgClass}
								/>
							);
						case "line":
							return (
								<Path
									d="M11 20H13V13H20V11H13V4H11V11H4V13H11V20Z"
									// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

									className={svgClass}
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

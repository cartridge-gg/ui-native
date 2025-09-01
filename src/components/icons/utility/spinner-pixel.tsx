import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const SpinnerPixelIcon = memo<IconProps>(
	({ className, size: sizeProp, ref, ...props }) => {
		const svgClass = useSvgClass() ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				<Path // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
					className={svgClass}
					d="M13 5h2v2h-2z"
					opacity=".75"
				/>
				<Path
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={svgClass}
					d="M9 5h2v2H9V5ZM11 5h2v2h-2V5ZM7 7h2v2H7V7ZM5 9h2v2H5V9ZM5 11h2v2H5v-2ZM5 13h2v2H5v-2ZM7 15h2v2H7v-2Z"
				/>
				<Path // @ts-expect-error TODO: className prop type issue with cssInterop-ed component
					className={svgClass}
					d="M9 17h2v2H9z"
					opacity=".5"
				/>
			</Svg>
		);
	},
);

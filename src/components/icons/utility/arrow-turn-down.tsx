import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const ArrowTurnDownIcon = memo<IconProps>(
	({ className, size: sizeProp, ref, ...props }) => {
		const svgClass = useSvgClass() ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				<Path
					d="M5.92826 6.70261V6H4.52304V6.70261V13.4945V14.1971H5.22565H16.7865L14.4738 16.5099L13.9761 17.0076L14.9685 18L15.4662 17.5023L18.9792 13.9893L19.4769 13.4916L18.9792 12.9939L15.4662 9.48085L14.9685 8.98317L13.9761 9.98146L14.4738 10.4791L16.7865 12.7919H5.92826V6.70261Z"
					// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

					className={svgClass}
				/>
			</Svg>
		);
	},
);

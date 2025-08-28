import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const ShieldIcon = memo<StateIconProps>(
	({ className, size: sizeProp, variant, ref, ...props }) => {
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
									d="M12 4C12.1437 4 12.2875 4.03125 12.4187 4.09063L18.3031 6.5875C18.9906 6.87813 19.5031 7.55625 19.5 8.375C19.4844 11.475 18.2094 17.1469 12.825 19.725C12.3031 19.975 11.6969 19.975 11.175 19.725C5.79062 17.1469 4.51562 11.475 4.5 8.375C4.49687 7.55625 5.00937 6.87813 5.69687 6.5875L11.5844 4.09063C11.7125 4.03125 11.8562 4 12 4Z"
									fill="currentColor"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

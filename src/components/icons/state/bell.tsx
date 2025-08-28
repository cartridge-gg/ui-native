import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const BellIcon = memo<StateIconProps>(
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
									fill="currentColor"
									d="M12 4C11.4469 4 11 4.44687 11 5V5.6C8.71876 6.0625 7.00001 8.08125 7.00001 10.5V11.0875C7.00001 12.5562 6.45939 13.975 5.48439 15.075L5.25314 15.3344C4.99064 15.6281 4.92814 16.05 5.08751 16.4094C5.24689 16.7688 5.60626 17 6.00001 17H18C18.3938 17 18.75 16.7688 18.9125 16.4094C19.075 16.05 19.0094 15.6281 18.7469 15.3344L18.5156 15.075C17.5406 13.975 17 12.5594 17 11.0875V10.5C17 8.08125 15.2813 6.0625 13 5.6V5C13 4.44687 12.5531 4 12 4ZM13.4156 19.4156C13.7906 19.0406 14 18.5312 14 18H12H10C10 18.5312 10.2094 19.0406 10.5844 19.4156C10.9594 19.7906 11.4688 20 12 20C12.5313 20 13.0406 19.7906 13.4156 19.4156Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

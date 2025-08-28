import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const CreditCardIcon = memo<StateIconProps>(
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
									d="M3 7C3 5.89688 3.89688 5 5 5H19C20.1031 5 21 5.89688 21 7V17C21 18.1031 20.1031 19 19 19H5C3.89688 19 3 18.1031 3 17V7ZM6.5 13C6.225 13 6 13.225 6 13.5C6 13.775 6.225 14 6.5 14H17.5C17.775 14 18 13.775 18 13.5C18 13.225 17.775 13 17.5 13H6.5ZM6 15.5C6 15.775 6.225 16 6.5 16H8.5C8.775 16 9 15.775 9 15.5C9 15.225 8.775 15 8.5 15H6.5C6.225 15 6 15.225 6 15.5ZM10 15.5C10 15.775 10.225 16 10.5 16H14.5C14.775 16 15 15.775 15 15.5C15 15.225 14.775 15 14.5 15H10.5C10.225 15 10 15.225 10 15.5ZM15.75 7C15.3344 7 15 7.33437 15 7.75V9.25C15 9.66563 15.3344 10 15.75 10H18.25C18.6656 10 19 9.66563 19 9.25V7.75C19 7.33437 18.6656 7 18.25 7H15.75Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

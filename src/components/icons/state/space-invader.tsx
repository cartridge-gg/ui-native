import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const SpaceInvaderIcon = memo<StateIconProps>(
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
									d="M6 5.5C6 5.225 6.225 5 6.5 5H7.5C7.775 5 8 5.225 8 5.5V6H9.5C9.775 6 10 6.225 10 6.5V8H14V6.5C14 6.225 14.225 6 14.5 6H16V5.5C16 5.225 16.225 5 16.5 5H17.5C17.775 5 18 5.225 18 5.5V6.5C18 6.775 17.775 7 17.5 7H16V8V9H17.5C17.775 9 18 9.225 18 9.5V11H19V8.5C19 8.225 19.225 8 19.5 8H20.5C20.775 8 21 8.225 21 8.5V12.5C21 12.775 20.775 13 20.5 13H19V15.5C19 15.775 18.775 16 18.5 16H17V18.5C17 18.775 16.775 19 16.5 19H15H13.5C13.225 19 13 18.775 13 18.5V17.5C13 17.225 13.225 17 13.5 17H15V16H9V17H10.5C10.775 17 11 17.225 11 17.5V18.5C11 18.775 10.775 19 10.5 19H9H7.5C7.225 19 7 18.775 7 18.5V16H5.5C5.225 16 5 15.775 5 15.5V13H3.5C3.225 13 3 12.775 3 12.5V8.5C3 8.225 3.225 8 3.5 8H4.5C4.775 8 5 8.225 5 8.5V11H6V9.5C6 9.225 6.225 9 6.5 9H8V8V7H6.5C6.225 7 6 6.775 6 6.5V5.5ZM8 11.5V13.5C8 13.775 8.225 14 8.5 14H9.5C9.775 14 10 13.775 10 13.5V11.5C10 11.225 9.775 11 9.5 11H8.5C8.225 11 8 11.225 8 11.5ZM14 11.5V13.5C14 13.775 14.225 14 14.5 14H15.5C15.775 14 16 13.775 16 13.5V11.5C16 11.225 15.775 11 15.5 11H14.5C14.225 11 14 11.225 14 11.5Z"
									fill="currentColor"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

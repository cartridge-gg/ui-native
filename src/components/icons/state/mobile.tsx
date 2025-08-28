import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const MobileIcon = memo<StateIconProps>(
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
									xmlns="http://www.w3.org/2000/svg"
									d="M6.5 6C6.5 4.89688 7.39688 4 8.5 4H15.5C16.6031 4 17.5 4.89688 17.5 6V18C17.5 19.1031 16.6031 20 15.5 20H8.5C7.39688 20 6.5 19.1031 6.5 18V6ZM13 18C13 17.7348 12.8946 17.4804 12.7071 17.2929C12.5196 17.1054 12.2652 17 12 17C11.7348 17 11.4804 17.1054 11.2929 17.2929C11.1054 17.4804 11 17.7348 11 18C11 18.2652 11.1054 18.5196 11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19C12.2652 19 12.5196 18.8946 12.7071 18.7071C12.8946 18.5196 13 18.2652 13 18ZM15.5 6H8.5V16H15.5V6Z"
									fill="currentColor"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

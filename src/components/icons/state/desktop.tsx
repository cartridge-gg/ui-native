import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const DesktopIcon = memo<StateIconProps>(
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
									d="M5.77778 5.22266C4.79722 5.22266 4 6.01988 4 7.00043V15.0004C4 15.981 4.79722 16.7782 5.77778 16.7782H10.6667L10.3694 17.6671H8.44444C7.95278 17.6671 7.55556 18.0643 7.55556 18.556C7.55556 19.0477 7.95278 19.4449 8.44444 19.4449H15.5556C16.0472 19.4449 16.4444 19.0477 16.4444 18.556C16.4444 18.0643 16.0472 17.6671 15.5556 17.6671H13.6306L13.3333 16.7782H18.2222C19.2028 16.7782 20 15.981 20 15.0004V7.00043C20 6.01988 19.2028 5.22266 18.2222 5.22266H5.77778ZM18.2222 7.00043V13.2227H5.77778V7.00043H18.2222Z"
									fill="currentColor"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

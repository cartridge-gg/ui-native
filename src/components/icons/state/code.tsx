import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const CodeIcon = memo<StateIconProps>(
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
									d="M4 7c0-1.103.897-2 2-2h12c1.103 0 2 .897 2 2v10c0 1.103-.897 2-2 2H6c-1.103 0-2-.897-2-2V7Zm9.194 2.247a.748.748 0 0 0 .056 1.06L15.128 12l-1.881 1.694a.748.748 0 0 0-.056 1.06c.278.309.75.334 1.059.055l2.5-2.25a.75.75 0 0 0 0-1.113l-2.5-2.25a.748.748 0 0 0-1.06.057l.004-.006Zm-2.44 1.06a.748.748 0 0 0 .055-1.06.748.748 0 0 0-1.059-.056l-2.5 2.25a.75.75 0 0 0 0 1.113l2.5 2.25a.748.748 0 0 0 1.06-.057.748.748 0 0 0-.057-1.06L8.872 12l1.881-1.694Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

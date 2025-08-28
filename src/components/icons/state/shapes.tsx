import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const ShapesIcon = memo<StateIconProps>(
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
									d="M13.8562 4.48438C13.6781 4.18437 13.35 4 13 4C12.65 4 12.3219 4.18437 12.1438 4.48438L9.14375 9.48438C8.95938 9.79375 8.95312 10.1781 9.13125 10.4906C9.30937 10.8031 9.64062 10.9969 10 10.9969H16C16.3594 10.9969 16.6937 10.8031 16.8687 10.4906C17.0437 10.1781 17.0406 9.79375 16.8562 9.48438L13.8562 4.48438ZM13 13.75V18.25C13 18.9406 13.5594 19.5 14.25 19.5H18.75C19.4406 19.5 20 18.9406 20 18.25V13.75C20 13.0594 19.4406 12.5 18.75 12.5H14.25C13.5594 12.5 13 13.0594 13 13.75ZM8 20C9.06087 20 10.0783 19.5786 10.8284 18.8284C11.5786 18.0783 12 17.0609 12 16C12 14.9391 11.5786 13.9217 10.8284 13.1716C10.0783 12.4214 9.06087 12 8 12C6.93913 12 5.92172 12.4214 5.17157 13.1716C4.42143 13.9217 4 14.9391 4 16C4 17.0609 4.42143 18.0783 5.17157 18.8284C5.92172 19.5786 6.93913 20 8 20Z"
									fill="currentColor"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

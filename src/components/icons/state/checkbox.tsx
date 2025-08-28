import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const CheckboxIcon = memo<StateIconProps>(
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
									d="M6.28571 4C5.025 4 4 5.025 4 6.28571V17.7143C4 18.975 5.025 20 6.28571 20H17.7143C18.975 20 20 18.975 20 17.7143V6.28571C20 5.025 18.975 4 17.7143 4H6.28571ZM16.0357 10.3214L11.4643 14.8929C11.1286 15.2286 10.5857 15.2286 10.2536 14.8929L7.96786 12.6071C7.63214 12.2714 7.63214 11.7286 7.96786 11.3964C8.30357 11.0643 8.84643 11.0607 9.17857 11.3964L10.8571 13.075L14.8214 9.10714C15.1571 8.77143 15.7 8.77143 16.0321 9.10714C16.3643 9.44286 16.3679 9.98571 16.0321 10.3179L16.0357 10.3214Z"
									fill="currentColor"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

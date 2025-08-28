import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const SparklesIcon = memo<StateIconProps>(
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
									d="M14.234 6.662A.362.362 0 0 0 14 7c0 .15.094.284.234.338L16 8l.663 1.766a.362.362 0 0 0 .674 0L18 8l1.766-.662A.362.362 0 0 0 20 7a.362.362 0 0 0-.234-.338L18 6l-.663-1.766a.362.362 0 0 0-.674 0L16 6l-1.766.662Zm-3.825-.371a.498.498 0 0 0-.906 0l-1.65 3.562L4.291 11.5a.5.5 0 0 0 0 .91l3.565 1.646L9.5 17.62a.498.498 0 0 0 .906 0l1.647-3.566 3.566-1.647a.498.498 0 0 0 0-.906l-3.563-1.644-1.647-3.565ZM16 16l-1.766.663A.362.362 0 0 0 14 17c0 .15.094.284.234.337L16 18l.663 1.766c.053.14.187.234.337.234.15 0 .284-.094.337-.234L18 18l1.766-.663A.362.362 0 0 0 20 17a.362.362 0 0 0-.234-.337L18 16l-.663-1.766A.362.362 0 0 0 17 14a.362.362 0 0 0-.337.234L16 16Z"
								/>
							);
					}
				})()}
			</Svg>
		);
	},
);

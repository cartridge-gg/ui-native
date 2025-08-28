import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const StackOvalIcon = memo<StateIconProps>(
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
								<>
									<Path
										fill="currentColor"
										d="M19.75 8.626c0 2.18-3.47 3.947-7.75 3.947-4.28 0-7.75-1.767-7.75-3.947C4.25 6.447 7.72 4.68 12 4.68c4.28 0 7.75 1.767 7.75 3.946Z"
									/>
									<Path
										fill="currentColor"
										fillRule="evenodd"
										d="M19.669 13.347a.662.662 0 0 1-.264.897c-2.107 1.15-4.018 1.917-7.484 1.917-3.485 0-5.266-.883-7.306-1.906a.662.662 0 0 1 .593-1.183c1.976.991 3.536 1.765 6.713 1.765 3.196 0 4.89-.684 6.85-1.754a.662.662 0 0 1 .898.264Z"
										clipRule="evenodd"
									/>
									<Path
										fill="currentColor"
										fillRule="evenodd"
										d="M19.669 16.506a.662.662 0 0 1-.264.897c-2.107 1.15-4.018 1.917-7.484 1.917-3.485 0-5.266-.883-7.306-1.906a.662.662 0 1 1 .593-1.183c1.976.991 3.536 1.765 6.713 1.765 3.196 0 4.89-.684 6.85-1.754a.662.662 0 0 1 .898.264Z"
										clipRule="evenodd"
									/>
								</>
							);
					}
				})()}
			</Svg>
		);
	},
);

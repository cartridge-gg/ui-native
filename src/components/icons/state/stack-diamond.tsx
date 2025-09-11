import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants, useSvgClass } from "#components/icons/utils";

export const StackDiamondIcon = memo<StateIconProps>(
	({ className, size: sizeProp, variant, color, ref, ...props }) => {
		const hookSvgClass = useSvgClass();
		const svgClass = className ?? hookSvgClass ?? "fill-foreground";
		return (
			<Svg
				viewBox="0 0 24 24"
				className={iconVariants({ size: sizeProp })}
				ref={ref}
				{...props}
			>
				{(() => {
					switch (variant) {
						case "solid":
							return (
								<Path
									// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

									className={color ? undefined : svgClass}
									fill={color}
									d="M11.658 3a.565.565 0 0 0-.274.087l-7.11 4.447a.563.563 0 0 0 0 .957l7.11 4.446a.562.562 0 0 0 .598 0L19.09 8.49a.563.563 0 0 0 0-.957l-7.108-4.447a.56.56 0 0 0-.324-.086Zm-7.105 8.858a.563.563 0 0 0-.278 1.041l7.11 4.452a.563.563 0 0 0 .597 0l7.109-4.452a.563.563 0 0 0-.598-.954l-6.81 4.265-6.81-4.266a.556.556 0 0 0-.32-.086Zm0 3.563a.563.563 0 0 0-.278 1.046l7.11 4.448a.565.565 0 0 0 .597 0l7.109-4.448a.564.564 0 0 0-.598-.955l-6.81 4.264-6.81-4.264a.559.559 0 0 0-.32-.091Z"
								/>
							);
						case "line":
							return (
								<>
									<Path
										// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

										className={color ? undefined : svgClass}
										fill={color}
										fillRule="evenodd"
										d="m19.09 7.534-7.108-4.447a.56.56 0 0 0-.598 0l-7.11 4.447a.563.563 0 0 0 0 .957l7.11 4.446a.562.562 0 0 0 .598 0L19.09 8.49a.563.563 0 0 0 0-.957Zm-7.407-3.218 5.91 3.696-5.91 3.696-5.91-3.696 5.91-3.696Z"
										clipRule="evenodd"
									/>
									<Path
										// @ts-expect-error TODO: className prop type issue with cssInterop-ed component

										className={color ? undefined : svgClass}
										fill={color}
										d="M4.553 11.858a.563.563 0 0 0-.278 1.041l7.11 4.452a.563.563 0 0 0 .597 0l7.109-4.452a.563.563 0 0 0-.598-.954l-6.81 4.265-6.81-4.266a.556.556 0 0 0-.32-.086Zm0 3.563a.563.563 0 0 0-.278 1.046l7.11 4.448a.565.565 0 0 0 .597 0l7.109-4.448a.564.564 0 0 0-.598-.955l-6.81 4.264-6.81-4.264a.559.559 0 0 0-.32-.091Z"
									/>
								</>
							);
					}
				})()}
			</Svg>
		);
	},
);

import { memo } from "react";
import Svg, { Path } from "react-native-svg";

import type { StateIconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const StackShapeIcon = memo<StateIconProps>(
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
										d="M4.10913 4.70703C4.10913 4.15475 4.55685 3.70703 5.10913 3.70703H18.4691C19.0214 3.70703 19.4691 4.15475 19.4691 4.70703V7.66482C19.4691 8.00303 19.2982 8.31833 19.0147 8.50286L12.2867 12.8831C11.962 13.0945 11.5829 13.207 11.1955 13.207H5.10913C4.55685 13.207 4.10913 12.7593 4.10913 12.207V4.70703Z"
										fill="currentColor"
									/>
									<Path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M19.3828 12.0034C19.5475 12.2837 19.4695 12.6542 19.2085 12.8311L13.3787 16.5114C13.2894 16.5719 13.186 16.604 13.0804 16.604H4.66799C4.35934 16.604 4.10913 16.3354 4.10913 16.004C4.10913 15.6727 4.35934 15.404 4.66799 15.404H12.63C12.8186 15.404 13.0035 15.3507 13.1631 15.2501L18.6119 11.8163C18.8729 11.6395 19.218 11.7232 19.3828 12.0034Z"
										fill="currentColor"
									/>
									<Path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M19.3828 15.7427C19.5475 16.0229 19.4695 16.3935 19.2085 16.5703L13.5795 20.2507C13.4902 20.3112 13.3868 20.3433 13.2812 20.3433H4.66799C4.35934 20.3433 4.10913 20.0747 4.10913 19.7433C4.10913 19.4119 4.35934 19.1433 4.66799 19.1433H12.8219C13.0161 19.1433 13.2062 19.0867 13.3688 18.9805L18.6119 15.5556C18.8729 15.3787 19.218 15.4625 19.3828 15.7427Z"
										fill="currentColor"
									/>
								</>
							);
					}
				})()}
			</Svg>
		);
	},
);

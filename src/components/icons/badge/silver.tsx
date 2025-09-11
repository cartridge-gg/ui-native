import { memo, useId } from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

import type { IconProps } from "#components/icons/types";
import { iconVariants } from "#components/icons/utils";

export const SilverIcon = memo<IconProps>(
	({ className, size: sizeProp, color, ref, ...props }) => {
		const id = useId();
		return (
			<Svg
				viewBox="0 0 48 48"
				className={iconVariants({ size: sizeProp })}
				ref={ref}
				{...props}
			>
				<Path
					d="M26.4525 3.40325C25.0393 2.19891 22.9607 2.19892 21.5475 3.40326L18.8427 5.7083C20.4826 5.24684 22.2125 5 24 5C25.7875 5 27.5174 5.24684 29.1573 5.7083L26.4525 3.40325Z"
					fill={color || "currentColor"}
				/>
				<Path
					d="M33.2839 7.41875C36.3367 9.13169 38.8683 11.6633 40.5813 14.7161L40.2983 11.1701C40.1506 9.31919 38.6808 7.84942 36.8299 7.70172L33.2839 7.41875Z"
					fill={color || "currentColor"}
				/>
				<Path
					d="M42.2917 18.8427C42.7532 20.4826 43 22.2125 43 24C43 25.7875 42.7532 27.5174 42.2917 29.1573L44.5967 26.4525C45.8011 25.0393 45.8011 22.9607 44.5967 21.5475L42.2917 18.8427Z"
					fill={color || "currentColor"}
				/>
				<Path
					d="M40.5813 33.2839C38.8683 36.3367 36.3367 38.8683 33.2839 40.5813L36.8299 40.2983C38.6808 40.1506 40.1506 38.6808 40.2983 36.8299L40.5813 33.2839Z"
					fill={color || "currentColor"}
				/>
				<Path
					d="M29.1573 42.2917C27.5174 42.7532 25.7875 43 24 43C22.2125 43 20.4826 42.7532 18.8427 42.2917L21.5475 44.5967C22.9607 45.8011 25.0393 45.8011 26.4525 44.5967L29.1573 42.2917Z"
					fill={color || "currentColor"}
				/>
				<Path
					d="M14.7161 40.5812C11.6633 38.8683 9.13169 36.3367 7.41875 33.2839L7.70172 36.8299C7.84942 38.6808 9.31919 40.1506 11.1701 40.2983L14.7161 40.5812Z"
					fill={color || "currentColor"}
				/>
				<Path
					d="M5.7083 29.1573C5.24684 27.5174 5 25.7875 5 24C5 22.2125 5.24684 20.4826 5.7083 18.8427L3.40325 21.5475C2.19891 22.9607 2.19892 25.0393 3.40326 26.4525L5.7083 29.1573Z"
					fill={color || "currentColor"}
				/>
				<Path
					d="M7.41875 14.7161C9.13169 11.6633 11.6633 9.13169 14.7161 7.41875L11.1701 7.70172C9.31919 7.84942 7.84942 9.31919 7.70172 11.1701L7.41875 14.7161Z"
					fill={color || "currentColor"}
				/>
				<Path
					d="M26.4525 3.40325C25.0393 2.19891 22.9607 2.19892 21.5475 3.40326L18.8427 5.7083C20.4826 5.24684 22.2125 5 24 5C25.7875 5 27.5174 5.24684 29.1573 5.7083L26.4525 3.40325Z"
					fill={`url(#paint0_linear_10556_64341-${id})`}
				/>
				<Path
					d="M33.2839 7.41875C36.3367 9.13169 38.8683 11.6633 40.5813 14.7161L40.2983 11.1701C40.1506 9.31919 38.6808 7.84942 36.8299 7.70172L33.2839 7.41875Z"
					fill={`url(#paint1_linear_10556_64341-${id})`}
				/>
				<Path
					d="M42.2917 18.8427C42.7532 20.4826 43 22.2125 43 24C43 25.7875 42.7532 27.5174 42.2917 29.1573L44.5967 26.4525C45.8011 25.0393 45.8011 22.9607 44.5967 21.5475L42.2917 18.8427Z"
					fill={`url(#paint2_linear_10556_64341-${id})`}
				/>
				<Path
					d="M40.5813 33.2839C38.8683 36.3367 36.3367 38.8683 33.2839 40.5813L36.8299 40.2983C38.6808 40.1506 40.1506 38.6808 40.2983 36.8299L40.5813 33.2839Z"
					fill={`url(#paint3_linear_10556_64341-${id})`}
				/>
				<Path
					d="M29.1573 42.2917C27.5174 42.7532 25.7875 43 24 43C22.2125 43 20.4826 42.7532 18.8427 42.2917L21.5475 44.5967C22.9607 45.8011 25.0393 45.8011 26.4525 44.5967L29.1573 42.2917Z"
					fill={`url(#paint4_linear_10556_64341-${id})`}
				/>
				<Path
					d="M14.7161 40.5812C11.6633 38.8683 9.13169 36.3367 7.41875 33.2839L7.70172 36.8299C7.84942 38.6808 9.31919 40.1506 11.1701 40.2983L14.7161 40.5812Z"
					fill={`url(#paint5_linear_10556_64341-${id})`}
				/>
				<Path
					d="M5.7083 29.1573C5.24684 27.5174 5 25.7875 5 24C5 22.2125 5.24684 20.4826 5.7083 18.8427L3.40325 21.5475C2.19891 22.9607 2.19892 25.0393 3.40326 26.4525L5.7083 29.1573Z"
					fill={`url(#paint6_linear_10556_64341-${id})`}
				/>
				<Path
					d="M7.41875 14.7161C9.13169 11.6633 11.6633 9.13169 14.7161 7.41875L11.1701 7.70172C9.31919 7.84942 7.84942 9.31919 7.70172 11.1701L7.41875 14.7161Z"
					fill={`url(#paint7_linear_10556_64341-${id})`}
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5 24C5 34.4934 13.5066 43 24 43C34.4934 43 43 34.4934 43 24C43 13.5066 34.4934 5 24 5C13.5066 5 5 13.5066 5 24ZM7 24C7 33.3888 14.6112 41 24 41C33.3888 41 41 33.3888 41 24C41 14.6112 33.3888 7 24 7C14.6112 7 7 14.6112 7 24Z"
					fill={color || "currentColor"}
				/>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M24 41C14.6112 41 7 33.3888 7 24C7 14.6112 14.6112 7 24 7C33.3888 7 41 14.6112 41 24C41 33.3888 33.3888 41 24 41ZM24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8Z"
					fill="black"
				/>
				<Defs>
					<LinearGradient
						id={`paint0_linear_10556_64341-${id}`}
						x1="24"
						y1="-24.7962"
						x2="24"
						y2="42.877"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#161A17" stopOpacity="0" />
						<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
					</LinearGradient>
					<LinearGradient
						id={`paint1_linear_10556_64341-${id}`}
						x1="24"
						y1="-24.7962"
						x2="24"
						y2="42.877"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#161A17" stopOpacity="0" />
						<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
					</LinearGradient>
					<LinearGradient
						id={`paint2_linear_10556_64341-${id}`}
						x1="24"
						y1="-24.7962"
						x2="24"
						y2="42.877"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#161A17" stopOpacity="0" />
						<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
					</LinearGradient>
					<LinearGradient
						id={`paint3_linear_10556_64341-${id}`}
						x1="24"
						y1="-24.7962"
						x2="24"
						y2="42.877"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#161A17" stopOpacity="0" />
						<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
					</LinearGradient>
					<LinearGradient
						id={`paint4_linear_10556_64341-${id}`}
						x1="24"
						y1="-24.7962"
						x2="24"
						y2="42.877"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#161A17" stopOpacity="0" />
						<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
					</LinearGradient>
					<LinearGradient
						id={`paint5_linear_10556_64341-${id}`}
						x1="24"
						y1="-24.7962"
						x2="24"
						y2="42.877"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#161A17" stopOpacity="0" />
						<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
					</LinearGradient>
					<LinearGradient
						id={`paint6_linear_10556_64341-${id}`}
						x1="24"
						y1="-24.7962"
						x2="24"
						y2="42.877"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#161A17" stopOpacity="0" />
						<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
					</LinearGradient>
					<LinearGradient
						id={`paint7_linear_10556_64341-${id}`}
						x1="24"
						y1="-24.7962"
						x2="24"
						y2="42.877"
						gradientUnits="userSpaceOnUse"
					>
						<Stop stopColor="#161A17" stopOpacity="0" />
						<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
					</LinearGradient>
				</Defs>
			</Svg>
		);
	},
);

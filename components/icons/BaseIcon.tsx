import React from "react";
import Svg, { SvgProps } from "react-native-svg";
import { useTheme } from "../theme/ThemeProvider";
import { cn } from "../utils/cn";
import type { IconProps } from "./types";
import { getSizeValue } from "./utils";

export interface BaseIconProps extends IconProps {
	viewBox?: string;
	children: React.ReactNode;
}

export const BaseIcon: React.FC<BaseIconProps> = ({
	size = "default",
	color,
	style,
	className,
	viewBox = "0 0 24 24",
	children,
}) => {
	const { colors } = useTheme();
	const sizeValue = getSizeValue(size);
	const iconColor = color || colors.foreground[300];

	return (
		<Svg
			width={sizeValue}
			height={sizeValue}
			viewBox={viewBox}
			style={style}
			className={className}
		>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, {
						...(child.props as any),
						fill:
							(child.props as any).fill === "currentColor"
								? iconColor
								: (child.props as any).fill || iconColor,
					});
				}
				return child;
			})}
		</Svg>
	);
};

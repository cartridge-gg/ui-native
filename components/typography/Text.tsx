import type React from "react";
import {
  Text as RNText,
  type TextProps as RNTextProps,
} from "react-native";
import { cn } from "../utils/cn";
import { type FontStyleKey } from "../theme/fonts";

export interface TextProps extends Omit<RNTextProps, "children" | "className"> {
  variant?: FontStyleKey;
  color?:
  | "primary"
  | "secondary"
  | "tertiary"
  | "muted"
  | "destructive"
  | "constructive";
  children: React.ReactNode;
  className?: string;
}

export function Text({
  variant = "body",
  color = "primary",
  className,
  children,
  ...props
}: TextProps) {
  const variantClasses = getVariantClasses(variant);
  const colorClass = getColorClass(color);

  return (
    <RNText
      className={cn(variantClasses, colorClass, className)}
      {...props}
    >
      {children}
    </RNText>
  );
}

const getVariantClasses = (variant: FontStyleKey): string => {
  const variantMap: Record<FontStyleKey, string> = {
    // Sans variants
    "sans-regular-10": "font-sans text-[10px] leading-3",
    "sans-regular-12": "font-sans text-xs leading-4",
    "sans-regular-14": "font-sans text-sm leading-5",
    "sans-regular-16": "font-sans text-base leading-6",
    "sans-medium-12": "font-sans font-medium text-xs leading-4",
    "sans-medium-14": "font-sans font-medium text-sm leading-5",
    "sans-semibold-12": "font-sans font-semibold text-xs leading-4",
    "sans-semibold-14": "font-sans font-semibold text-sm leading-5",
    "sans-semibold-18": "font-sans font-semibold text-lg leading-7",
    "sans-bold-14": "font-sans font-bold text-sm leading-5",
    "sans-bold-18": "font-sans font-bold text-lg leading-7",

    // Mono variants
    "mono-regular-14": "font-mono text-sm leading-5",
    "mono-regular-16": "font-mono text-base leading-6",
    "mono-medium-16": "font-mono font-medium text-base leading-6",
    "mono-semibold-16": "font-mono font-semibold text-base leading-6",

    // Common UI patterns
    "heading-lg": "font-sans font-semibold text-lg leading-[22px]",
    "heading-xl": "font-sans font-semibold text-2xl leading-[29px]",
    body: "font-sans text-sm leading-5",
    caption: "font-sans text-xs leading-4",
    label: "font-sans font-semibold text-xs leading-4 tracking-wider",
  };

  return variantMap[variant] || variantMap.body;
};

const getColorClass = (color: TextProps["color"]): string => {
  const colorMap = {
    primary: "text-white",
    secondary: "text-[#9c9c9c]",
    tertiary: "text-[#808080]",
    muted: "text-[#505050]",
    destructive: "text-[#e66666]",
    constructive: "text-[#6de27c]",
  };

  return colorMap[color || "primary"];
};

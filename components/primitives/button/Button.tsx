import React from "react";
import { Pressable, Text, type View } from "react-native";
import { cn } from "../../utils/cn";
import { Spinner } from "../spinner/Spinner";

export interface ButtonProps {
  children?: React.ReactNode;
  variant?:
  | "primary"
  | "secondary"
  | "tertiary"
  | "icon"
  | "link"
  | "destructive"
  | "outline"
  | "ghost";
  size?: "default" | "tall" | "icon" | "thumbnail";
  isLoading?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "default",
      isLoading = false,
      isActive = false,
      disabled = false,
      onPress,
      className,
      ...props
    },
    ref,
  ) => {
    // Base button styles
    const baseStyles = "flex-row justify-center items-center rounded-md active:opacity-80";

    // Variant styles
    const variantStyles = {
      primary: "bg-primary-100 border-primary-100",
      secondary: "bg-background-200 border-background-200",
      tertiary: "bg-background-200 border-background-200",
      icon: "bg-background-200 border-background-200",
      link: "bg-background-100 border border-background-200",
      destructive: "bg-destructive-100 border-destructive-100",
      outline: "bg-background-100 border border-border",
      ghost: "bg-transparent border-transparent",
    };

    // Active state override
    const activeStyles = isActive ? "bg-background-300 border-background-300" : "";

    // Size styles
    const sizeStyles = {
      default: cn(
        "h-10 px-6 py-2.5 gap-1.5",
        !isLoading && "min-w-[118px]"
      ),
      tall: "h-full w-9 p-2",
      icon: "h-10 w-10 p-0",
      thumbnail: "h-10 px-3 py-2.5",
    };

    // Disabled/loading opacity
    const stateStyles = (disabled || isLoading) ? "opacity-50" : "";

    // Text color based on variant and state
    const getTextColorClass = () => {
      if (disabled) {
        switch (variant) {
          case "secondary":
          case "tertiary":
          case "icon":
            return "text-foreground-300";
          default:
            return "text-foreground-400";
        }
      }

      if (isActive) {
        return "text-foreground-100";
      }

      switch (variant) {
        case "primary":
          return "text-primary-foreground";
        case "secondary":
        case "icon":
          return "text-foreground-100";
        case "tertiary":
          return "text-foreground-300";
        case "link":
          return "text-foreground-300";
        case "destructive":
          return "text-destructive-foreground";
        case "outline":
        case "ghost":
          return "text-foreground-100";
        default:
          return "text-primary-foreground";
      }
    };

    // Text styles based on variant
    const getTextStyles = () => {
      const baseTextStyles = "text-base leading-5 font-semibold uppercase tracking-wider font-mono";

      if (variant === "link") {
        return "text-base leading-5 font-normal font-sans";
      }

      if (variant === "tertiary") {
        return cn(baseTextStyles, "font-medium");
      }

      return baseTextStyles;
    };

    const textColorClass = getTextColorClass();
    const textStyles = getTextStyles();

    const handlePress = () => {
      if (!disabled && !isLoading && onPress) {
        onPress();
      }
    };

    return (
      <Pressable
        ref={ref}
        className={cn(
          baseStyles,
          activeStyles || variantStyles[variant],
          sizeStyles[size],
          stateStyles,
          className
        )}
        onPress={handlePress}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Spinner className={textColorClass} size="sm" />
        ) : (
          <>
            {typeof children === "string" ? (
              <Text className={cn(textStyles, textColorClass)}>
                {children}
              </Text>
            ) : (
              children
            )}
          </>
        )}
      </Pressable>
    );
  },
);

Button.displayName = "Button";

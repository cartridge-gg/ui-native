import type React from "react";
import { Pressable, View, type ViewStyle } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "../../typography/Text";

export type BadgeVariant =
  | "default"
  | "primary"
  | "muted"
  | "destructive"
  | "outline";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  onPress?: () => void;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  onPress,
  className,
}) => {
  const badgeVariants = {
    default: "bg-background-200",
    primary: "bg-primary-100",
    muted: "bg-background-200",
    destructive: "bg-destructive-100",
    outline: "bg-transparent border border-foreground-400",
  };

  const textVariants = {
    default: "text-foreground-100",
    primary: "text-primary-foreground",
    muted: "text-foreground-400",
    destructive: "text-destructive-foreground",
    outline: "text-foreground-100",
  };

  const content = (
    <View className={cn(
      "flex-row items-center rounded-md px-1 py-0.5",
      badgeVariants[variant],
      className
    )}>
      <Text className={cn("text-xs font-semibold", textVariants[variant])}>
        {children}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className="active:opacity-80"
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

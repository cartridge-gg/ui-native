import type React from "react";
import { Pressable, View } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "../../typography/Text";

export interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children, className }) => {
  return (
    <View
      className={className}
      // @ts-ignore - navigation is a valid role for React Native
      accessibilityRole="navigation"
      accessibilityLabel="breadcrumb"
    >
      {children}
    </View>
  );
};

export interface BreadcrumbListProps {
  children: React.ReactNode;
  className?: string;
}

export const BreadcrumbList: React.FC<BreadcrumbListProps> = ({
  children,
  className,
}) => {
  return (
    <View className={cn("flex-row flex-wrap items-center gap-0", className)}>
      {children}
    </View>
  );
};

export interface BreadcrumbItemProps {
  children: React.ReactNode;
  className?: string;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  className,
}) => {
  return (
    <View className={cn("flex-row items-center gap-1.5", className)}>
      {children}
    </View>
  );
};

export interface BreadcrumbLinkProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

export const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  children,
  onPress,
  disabled = false,
  className,
}) => {
  if (!onPress || disabled) {
    return (
      <View className={cn(disabled && "opacity-50", className)}>
        <Text className="text-sm text-foreground-400">{children}</Text>
      </View>
    );
  }

  return (
    <Pressable
      className={className}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="link"
    >
      {({ pressed }) => (
        <Text className={cn(
          "text-sm text-foreground-400",
          pressed && "text-foreground-200"
        )}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export interface BreadcrumbPageProps {
  children: React.ReactNode;
  className?: string;
}

export const BreadcrumbPage: React.FC<BreadcrumbPageProps> = ({
  children,
  className,
}) => {
  return (
    <View
      className={className}
      accessibilityRole="text"
      accessibilityState={{ disabled: true }}
      accessibilityLabel="current page"
    >
      <Text className="text-sm font-normal text-foreground-100">{children}</Text>
    </View>
  );
};

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  className,
}) => {
  return (
    <View
      className={cn("mx-1", className)}
      // @ts-ignore - presentation is a valid role for React Native
      accessibilityRole="presentation"
      accessibilityElementsHidden={true}
    >
      {children || <Text className="text-base text-foreground-400">›</Text>}
    </View>
  );
};

export interface BreadcrumbEllipsisProps {
  onPress?: () => void;
  className?: string;
}

export const BreadcrumbEllipsis: React.FC<BreadcrumbEllipsisProps> = ({
  onPress,
  className,
}) => {
  if (!onPress) {
    return (
      <View
        className={cn("w-9 h-9 justify-center items-center", className)}
        // @ts-ignore - presentation is a valid role for React Native
        accessibilityRole="presentation"
        accessibilityElementsHidden={true}
      >
        <Text className="text-base text-foreground-400">⋯</Text>
      </View>
    );
  }

  return (
    <Pressable
      className={cn("w-9 h-9 justify-center items-center", className)}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Show more breadcrumb items"
    >
      <Text className="text-base text-foreground-400">⋯</Text>
    </Pressable>
  );
};

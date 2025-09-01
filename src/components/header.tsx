import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "#utils";
import { MagnifyingGlassIcon, HamburgerIcon, SvgClassContext } from "#components/icons";
import { Button } from "#components/primitives";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: {
    icon: React.ReactNode;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  rightAction?: {
    icon: React.ReactNode;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  variant?: "default" | "transparent" | "elevated";
  className?: string;
  children?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  leftAction,
  rightAction,
  variant = "default",
  className,
  children,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  const headerVariants = {
    default: "bg-background-200 border-b border-spacer-100",
    transparent: "bg-transparent",
    elevated: "bg-background-200 border-b border-spacer-100 shadow-sm",
  };

  return (
    <View
      className={cn(
        "w-full",
        headerVariants[variant],
        className
      )}
      style={{
        paddingTop: insets.top > 0 ? insets.top : 16,
      }}
    >
      <View className="flex-row items-center justify-between px-4 py-3 min-h-14">
        {/* Left Action */}
        <View className="flex-1 items-start">
          {leftAction && (
            <Pressable
              onPress={leftAction.onPress}
              accessibilityRole="button"
              accessibilityLabel={leftAction.accessibilityLabel}
              className="p-2 -ml-2 rounded-lg active:bg-spacer-100"
            >
              {leftAction.icon}
            </Pressable>
          )}
        </View>

        {/* Center Content */}
        <View className="flex-1 items-center">
          {title && (
            <Text className="text-white text-lg font-semibold text-center">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className="text-gray-400 text-sm text-center mt-1">
              {subtitle}
            </Text>
          )}
          {children}
        </View>

        {/* Right Action */}
        <View className="flex-1 items-end">
          {rightAction && (
            <Pressable
              onPress={rightAction.onPress}
              accessibilityRole="button"
              accessibilityLabel={rightAction.accessibilityLabel}
              className="p-2 -mr-2 rounded-lg active:bg-spacer-100"
            >
              {rightAction.icon}
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

// Specialized header variants
export function TabHeader({ title, subtitle, ...props }: HeaderProps) {
  return (
    <Header
      title={title}
      subtitle={subtitle}
      variant="elevated"
      {...props}
    />
  );
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightAction,
  ...props
}: HeaderProps & { onBack?: () => void }) {
  return (
    <Header
      title={title}
      subtitle={subtitle}
      leftAction={onBack ? {
        icon: <Text className="text-white text-xl">←</Text>,
        onPress: onBack,
        accessibilityLabel: "Go back",
      } : undefined}
      rightAction={rightAction}
      variant="default"
      {...props}
    />
  );
}

// Updated Arcade Header component with themed classes only
export function ArcadeHeader({
  onMenuPress,
  onSearchPress,
  onConnectPress,
  connected = false,
  className,
}: {
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onConnectPress?: () => void;
  connected?: boolean;
  className?: string;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn("w-full bg-background", className)}
      style={{
        paddingTop: insets.top > 0 ? insets.top : 16,
      }}
    >
      <View className="flex-row items-center justify-between p-3">
        {/* Left: Game Menu Button (Hamburger) */}
        <Button
          variant="icon"
          size="icon"
          onPress={onMenuPress}
          accessibilityRole="button"
          accessibilityLabel="Menu"
          className="bg-background-200"
        >
          <HamburgerIcon size="sm" />
        </Button>

        {/* Right: Search Button + CONNECT Button */}
        <View className="flex-row gap-3 items-center">
          {/* Search Button */}
          <Button
            variant="icon"
            size="icon"
            onPress={onSearchPress}
            accessibilityRole="button"
            accessibilityLabel="Search"
            className="bg-background-200"
          >
            <MagnifyingGlassIcon size="sm" />
          </Button>

          {/* CONNECT Button - Using Button component with outline variant */}
          <Button
            variant="outline"
            size="sm"
            onPress={onConnectPress}
            accessibilityRole="button"
            accessibilityLabel="Connect"
          >
            <Text>CONNECT</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

// Utility function to create a header with custom actions
export function createHeaderWithActions(
  title: string,
  leftAction?: HeaderProps["leftAction"],
  rightAction?: HeaderProps["rightAction"],
  variant: HeaderProps["variant"] = "default"
) {
  return (
    <Header
      title={title}
      leftAction={leftAction}
      rightAction={rightAction}
      variant={variant}
    />
  );
}

// Utility function to create a header with back button
export function createBackHeader(
  title: string,
  onBack: () => void,
  rightAction?: HeaderProps["rightAction"]
) {
  return (
    <ScreenHeader
      title={title}
      onBack={onBack}
      rightAction={rightAction}
    />
  );
}

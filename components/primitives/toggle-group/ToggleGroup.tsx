import { createContext, useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "../../typography/Text";
import type { ToggleSize, ToggleVariant } from "../toggle/Toggle";

// ToggleGroup Context
interface ToggleGroupContextType {
  type: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextType | null>(null);

export interface ToggleGroupProps {
  type: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  type,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "default",
  size = "default",
  disabled = false,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue || (type === "single" ? "" : []),
  );

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string | string[]) => {
    if (disabled) return;

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <ToggleGroupContext.Provider
      value={{
        type,
        value,
        onValueChange: handleValueChange,
        variant,
        size,
        disabled,
      }}
    >
      <View className={cn("flex-row items-center justify-center gap-1", className)}>
        {children}
      </View>
    </ToggleGroupContext.Provider>
  );
};

export interface ToggleGroupItemProps {
  value: string;
  children: React.ReactNode;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  className?: string;
}

export const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  value,
  children,
  variant: itemVariant,
  size: itemSize,
  disabled: itemDisabled = false,
  className,
}) => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  }

  const {
    type,
    value: groupValue,
    onValueChange,
    variant: groupVariant,
    size: groupSize,
    disabled: groupDisabled,
  } = context;

  const variant = itemVariant || groupVariant || "default";
  const size = itemSize || groupSize || "default";
  const isDisabled = groupDisabled || itemDisabled;

  const isPressed =
    type === "single"
      ? groupValue === value
      : Array.isArray(groupValue) &&
      (groupValue as string[]).indexOf(value) !== -1;

  const handlePress = () => {
    if (isDisabled) return;

    if (type === "single") {
      const newValue = isPressed ? "" : value;
      onValueChange?.(newValue);
    } else {
      const currentArray = Array.isArray(groupValue)
        ? (groupValue as string[])
        : [];
      const newValue = isPressed
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      onValueChange?.(newValue);
    }
  };

  const baseClasses = "flex-row items-center justify-center rounded-md";

  const variantClasses = {
    default: isPressed ? "bg-background-500" : "bg-transparent",
    outline: isPressed ? "bg-background-500 border border-input" : "bg-transparent border border-input",
  };

  const sizeClasses = {
    sm: "h-8 px-2",
    default: "h-9 px-3",
    lg: "h-10 px-3",
  };

  const textColorClass = isPressed ? "text-foreground-200" : "text-foreground-400";

  return (
    <Pressable
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && "opacity-50",
        className
      )}
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{
        selected: isPressed,
        disabled: isDisabled,
      }}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm font-medium", textColorClass)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

import { createContext, useContext, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  View,
} from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "../../typography/Text";

// Accordion Context
interface AccordionContextType {
  type: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  disabled?: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export interface AccordionProps {
  type: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  type,
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = false,
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
    <AccordionContext.Provider
      value={{
        type,
        value,
        onValueChange: handleValueChange,
        collapsible,
        disabled,
      }}
    >
      <View className={cn("gap-0", className)}>{children}</View>
    </AccordionContext.Provider>
  );
};

// AccordionItem Context
interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
  onToggle: () => void;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(
  null,
);

export interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  disabled: itemDisabled = false,
  children,
  className,
}) => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("AccordionItem must be used within an Accordion");
  }

  const {
    type,
    value: accordionValue,
    onValueChange,
    collapsible,
    disabled: accordionDisabled,
  } = context;
  const isDisabled = accordionDisabled || itemDisabled;

  const isOpen =
    type === "single"
      ? accordionValue === value
      : Array.isArray(accordionValue) &&
      (accordionValue as string[]).indexOf(value) !== -1;

  const handleToggle = () => {
    if (isDisabled) return;

    if (type === "single") {
      const newValue = isOpen && collapsible ? "" : value;
      onValueChange?.(newValue);
    } else {
      const currentArray = Array.isArray(accordionValue) ? accordionValue : [];
      const newValue = isOpen
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      onValueChange?.(newValue);
    }
  };

  return (
    <AccordionItemContext.Provider
      value={{ value, isOpen, onToggle: handleToggle, disabled: isDisabled }}
    >
      <View className={cn("border-b border-white/10", className)}>{children}</View>
    </AccordionItemContext.Provider>
  );
};

export interface AccordionTriggerProps {
  hideIcon?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  hideIcon = false,
  children,
  className,
}) => {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const { isOpen, onToggle, disabled } = context;

  const handlePress = () => {
    // Configure layout animation for smooth expand/collapse
    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext({
        duration: 200,
        create: { type: "easeOut", property: "opacity" },
        update: { type: "easeOut" },
        delete: { type: "easeOut", property: "opacity" },
      });
    }
    onToggle();
  };

  return (
    <Pressable
      className={cn(
        "flex-row items-center justify-between py-3",
        disabled && "opacity-50",
        className
      )}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{
        expanded: isOpen,
        disabled,
      }}
    >
      <View className="flex-1 flex-row items-center">{children}</View>
      {!hideIcon && (
        <Text
          className={cn(
            "ml-2 text-foreground-400 transition-transform",
            isOpen && "rotate-90"
          )}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        >
          ▶
        </Text>
      )}
    </Pressable>
  );
};

export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
}) => {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const { isOpen } = context;

  if (!isOpen) return null;

  return <View className={cn("pb-3 gap-1", className)}>{children}</View>;
};

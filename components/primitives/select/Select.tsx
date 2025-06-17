import type React from "react";
import { useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "../../typography/Text";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  simplified?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  disabled = false,
  simplified = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    if (onValueChange) {
      onValueChange(optionValue);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Pressable
        className={cn(
          "h-9 w-full flex-row items-center justify-between px-3 py-2 bg-background-200 rounded-md",
          disabled && "opacity-50",
          className
        )}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <Text className={cn(
          "text-xs font-bold flex-1",
          selectedOption ? "text-foreground-100" : "text-foreground-400"
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        {simplified && (
          <View
            className="w-0 h-0 ml-2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground-400"
          />
        )}
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setIsOpen(false)}
        >
          <View className="bg-background-200 rounded-lg max-h-75 min-w-[200px] max-w-[80%]">
            <ScrollView>
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  className={cn(
                    "px-4 py-3 border-b border-background-300",
                    option.value === value && "bg-background-500",
                    option.disabled && "opacity-50"
                  )}
                  onPress={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                >
                  <Text className={cn(
                    "text-xs",
                    option.value === value ? "text-foreground-200" : "text-foreground-400"
                  )}>
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

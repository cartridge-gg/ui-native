import React, { useState, useMemo, useCallback } from "react";
import { Pressable, TextInput, View } from "react-native";
import { cn } from "../../utils/cn";
import { TimesIcon } from "../../icons/utility/TimesIcon";
import { Text } from "../../typography/Text";

export interface TextareaProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  variant?: "default" | "username";
  size?: "default" | "lg";
  disabled?: boolean;
  error?: { message: string };
  isLoading?: boolean;
  onClear?: () => void;
  className?: string;
  minHeight?: number;
  maxHeight?: number;
  testID?: string;
}

export const Textarea = React.forwardRef<TextInput, TextareaProps>(
  (
    {
      value = "",
      onChangeText,
      placeholder,
      variant = "default",
      size = "default",
      disabled = false,
      error,
      isLoading = false,
      onClear,
      className,
      minHeight,
      maxHeight,
      testID,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);

    // Calculate height only when dependencies change
    const calculatedStyle = useMemo(() => {
      const baseMinHeight = minHeight || (size === "lg" ? 48 : 40);
      const paddingVertical = size === "lg" ? 26.6 : 20.6;
      const calculatedHeight = Math.max(
        baseMinHeight,
        contentHeight + paddingVertical,
        baseMinHeight,
      );

      const finalHeight = maxHeight
        ? Math.min(calculatedHeight, maxHeight)
        : calculatedHeight;

      return {
        minHeight: baseMinHeight,
        height: finalHeight,
      };
    }, [contentHeight, minHeight, maxHeight, size]);

    const baseClasses = cn(
      "border font-mono bg-background-200 text-foreground-100 rounded-md px-4",
      // Size classes
      size === "lg" ? "text-[15px] leading-5" : "text-sm leading-[18px]",
      // Focus and error states
      isFocused && !error && "border-primary-100 bg-background-300",
      error && "border-destructive-100",
      !isFocused && !error && "border-background-300",
      // Disabled state
      disabled && "opacity-50",
      // Padding right for clear button
      value && onClear && "pr-12",
      className
    );

    const handleContentSizeChange = useCallback((event: any) => {
      const newHeight = event.nativeEvent.contentSize.height;
      // Only update if height changed by more than 1px to prevent micro-adjustments
      setContentHeight(prevHeight => {
        if (Math.abs(newHeight - prevHeight) > 1) {
          return newHeight;
        }
        return prevHeight;
      });
    }, []);

    const handleClear = useCallback(() => {
      if (onClear) {
        onClear();
      }
    }, [onClear]);

    return (
      <View className="gap-3">
        <View className="relative">
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#505050" // foreground-400
            multiline
            editable={!disabled && !isLoading}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onContentSizeChange={handleContentSizeChange}
            className={baseClasses}
            style={{
              ...calculatedStyle,
              textAlignVertical: "top",
              paddingTop: size === "lg" ? 13.3 : 10.3,
              paddingBottom: size === "lg" ? 13.3 : 10.3,
            }}
            testID={testID}
            {...props}
          />

          {/* Clear button */}
          {(isFocused || value) &&
            value &&
            onClear &&
            !disabled &&
            !isLoading && (
              <Pressable
                onPress={handleClear}
                className="absolute right-1.5 top-1.5 w-8 h-8 rounded bg-background-200 justify-center items-center"
              >
                <TimesIcon size="xs" color="#808080" />
              </Pressable>
            )}
        </View>

        {/* Error message */}
        {error && (
          <Text className="text-xs text-destructive-100 -mt-2">
            {error.message}
          </Text>
        )}
      </View>
    );
  },
);

Textarea.displayName = "Textarea";

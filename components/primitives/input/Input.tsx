import React, { useState } from "react";
import { 
  TextInput, 
  View, 
  StyleSheet, 
  Pressable,
  type TextInputProps as RNTextInputProps 
} from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "../../typography/Text";

const inputVariants = cva("", {
  variants: {
    variant: {
      default: "default",
      username: "username",
    },
    size: {
      default: "default",
      lg: "lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface InputProps 
  extends Omit<RNTextInputProps, 'style'>, 
    VariantProps<typeof inputVariants> {
  error?: { message: string };
  isLoading?: boolean;
  onClear?: () => void;
  label?: string;
  style?: any;
}

// Error Message Component
interface ErrorMessageProps {
  label?: string;
}

function ErrorMessage({ label }: ErrorMessageProps) {
  if (!label) return null;
  
  return (
    <View style={styles.errorContainer}>
      <Text color="destructive" variant="sans-regular-14">
        ⚠️ {label}
      </Text>
    </View>
  );
}

// Clear Button Component
interface ClearButtonProps {
  onClear: () => void;
  isLoading?: boolean;
}

function ClearButton({ onClear, isLoading }: ClearButtonProps) {
  if (isLoading) {
    return (
      <View style={styles.clearButton}>
        <Text color="tertiary">⏳</Text>
      </View>
    );
  }

  return (
    <Pressable style={styles.clearButton} onPress={onClear}>
      <Text color="tertiary">✕</Text>
    </Pressable>
  );
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      error,
      isLoading,
      onClear,
      variant = "default",
      size = "default",
      label,
      value,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const getInputStyle = () => {
      const baseStyles = [
        styles.input,
        // Variant styles
        variant === "username" ? styles.usernameVariant : styles.defaultVariant,
        // Size styles
        size === "lg" ? styles.lgSize : styles.defaultSize,
        // State styles
        isFocused && styles.focused,
        error && styles.error,
        // Add padding for clear button if needed
        value && onClear && styles.withClearButton,
      ].filter(Boolean);
      
      return baseStyles;
    };

    return (
      <View style={styles.container}>
        {label && (
          <Text variant="label" color="muted" style={styles.label}>
            {label}
          </Text>
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            value={value}
            style={[getInputStyle(), style]}
            placeholderTextColor="#505050" // foreground-400
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {value && onClear && (
            <View style={styles.clearButtonContainer}>
              <ClearButton onClear={onClear} isLoading={isLoading} />
            </View>
          )}
        </View>
        
        {error && <ErrorMessage label={error.message} />}
      </View>
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    marginBottom: 4,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontFamily: 'IBMPlexMono', // mono font
    fontSize: 14,
    lineHeight: 18,
    color: '#ffffff', // foreground-100
  },
  defaultVariant: {
    backgroundColor: '#1e221f', // background-200
    borderColor: '#242824', // background-300
  },
  usernameVariant: {
    backgroundColor: '#1e221f', // background-200
    borderColor: '#242824', // background-300
  },
  defaultSize: {
    height: 40,
  },
  lgSize: {
    height: 48,
    fontSize: 15,
    lineHeight: 20,
  },
  focused: {
    borderColor: '#fbcb4a', // primary
    backgroundColor: '#242824', // background-300
  },
  error: {
    borderColor: '#e66666', // destructive-100
  },
  withClearButton: {
    paddingRight: 48,
  },
  clearButtonContainer: {
    position: 'absolute',
    right: 6,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  clearButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#242824', // background-300
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
}); 
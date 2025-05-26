import { Pressable, Text, ActivityIndicator, View, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({ 
  title, 
  onPress, 
  variant = "primary", 
  isLoading = false, 
  disabled = false 
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    variant === "primary" ? styles.primary : styles.secondary,
    (disabled || isLoading) && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    variant === "primary" ? styles.primaryText : styles.secondaryText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === "primary" ? "#0f1410" : "#ffffff"} 
          />
        ) : (
          <Text style={textStyle}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#fbcb4a',
  },
  secondary: {
    backgroundColor: '#1e221f',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: '#0f1410',
  },
  secondaryText: {
    color: '#ffffff',
  },
}); 
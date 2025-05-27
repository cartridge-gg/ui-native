import { createContext, useContext, useState } from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../../typography/Text';
import { ToggleVariant, ToggleSize } from '../toggle/Toggle';

// ToggleGroup Context
interface ToggleGroupContextType {
  type: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextType | null>(null);

export interface ToggleGroupProps {
  type: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  type,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = 'default',
  size = 'default',
  disabled = false,
  children,
  style,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || (type === 'single' ? '' : []));
  
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
        disabled 
      }}
    >
      <View style={[styles.container, style]}>
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
  style?: ViewStyle;
}

export const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  value,
  children,
  variant: itemVariant,
  size: itemSize,
  disabled: itemDisabled = false,
  style,
}) => {
  const context = useContext(ToggleGroupContext);
  const { colors } = useTheme();
  
  if (!context) {
    throw new Error('ToggleGroupItem must be used within a ToggleGroup');
  }
  
  const { 
    type, 
    value: groupValue, 
    onValueChange, 
    variant: groupVariant, 
    size: groupSize, 
    disabled: groupDisabled 
  } = context;
  
  const variant = itemVariant || groupVariant || 'default';
  const size = itemSize || groupSize || 'default';
  const isDisabled = groupDisabled || itemDisabled;
  
  const isPressed = type === 'single' 
    ? groupValue === value
    : Array.isArray(groupValue) && (groupValue as string[]).indexOf(value) !== -1;
  
  const handlePress = () => {
    if (isDisabled) return;
    
    if (type === 'single') {
      const newValue = isPressed ? '' : value;
      onValueChange?.(newValue);
    } else {
      const currentArray = Array.isArray(groupValue) ? groupValue as string[] : [];
      const newValue = isPressed 
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value];
      onValueChange?.(newValue);
    }
  };

  const getVariantStyles = (variant: ToggleVariant, pressed: boolean) => {
    const baseStyles = {
      backgroundColor: 'transparent',
      borderWidth: 0,
    };

    if (pressed) {
      return {
        ...baseStyles,
        backgroundColor: colors.background[500],
      };
    }

    switch (variant) {
      case 'outline':
        return {
          ...baseStyles,
          borderWidth: 1,
          borderColor: colors.input,
        };
      default:
        return baseStyles;
    }
  };

  const getSizeStyles = (size: ToggleSize) => {
    switch (size) {
      case 'sm':
        return {
          height: 32,
          paddingHorizontal: 8,
        };
      case 'lg':
        return {
          height: 40,
          paddingHorizontal: 12,
        };
      default:
        return {
          height: 36,
          paddingHorizontal: 12,
        };
    }
  };

  const variantStyles = getVariantStyles(variant, isPressed);
  const sizeStyles = getSizeStyles(size);

  const itemStyles = StyleSheet.create({
    toggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      opacity: isDisabled ? 0.5 : 1,
      ...variantStyles,
      ...sizeStyles,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
      color: isPressed ? colors.foreground[200] : colors.foreground[400],
    },
  });

  return (
    <Pressable
      style={[itemStyles.toggle, style]}
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ 
        selected: isPressed,
        disabled: isDisabled 
      }}
    >
      <Text style={itemStyles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
}); 
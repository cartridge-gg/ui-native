import React, { createContext, useContext, useState } from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Modal, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../../typography/Text';

// DropdownMenu Context
interface DropdownMenuContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

// RadioGroup Context for DropdownMenuRadioGroup
interface DropdownMenuRadioGroupContextType {
  value?: string;
  onValueChange?: (value: string) => void;
}

const DropdownMenuRadioGroupContext = createContext<DropdownMenuRadioGroupContextType | null>(null);

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DropdownMenuContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  style,
}) => {
  const context = useContext(DropdownMenuContext);
  
  if (!context) {
    throw new Error('DropdownMenuTrigger must be used within a DropdownMenu');
  }
  
  const { onOpenChange } = context;
  
  return (
    <Pressable
      style={style}
      onPress={() => onOpenChange(true)}
    >
      {children}
    </Pressable>
  );
};

export interface DropdownMenuContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  style,
}) => {
  const context = useContext(DropdownMenuContext);
  const { colors } = useTheme();
  
  if (!context) {
    throw new Error('DropdownMenuContent must be used within a DropdownMenu');
  }
  
  const { open, onOpenChange } = context;

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    content: {
      backgroundColor: colors.background[200],
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.background[300],
      padding: 4,
      minWidth: 128,
      maxWidth: 300,
      maxHeight: 400,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable 
        style={styles.overlay}
        onPress={() => onOpenChange(false)}
      >
        <Pressable 
          style={[styles.content, style]}
          onPress={(e) => e.stopPropagation()}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export interface DropdownMenuItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  inset?: boolean;
  style?: ViewStyle;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  onPress,
  disabled = false,
  inset = false,
  style,
}) => {
  const context = useContext(DropdownMenuContext);
  const { colors } = useTheme();
  
  if (!context) {
    throw new Error('DropdownMenuItem must be used within a DropdownMenu');
  }
  
  const { onOpenChange } = context;
  
  const handlePress = () => {
    if (disabled) return;
    onPress?.();
    onOpenChange(false);
  };

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: inset ? 32 : 8,
      paddingVertical: 6,
      borderRadius: 4,
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      fontSize: 14,
      color: colors.foreground[200],
    },
  });

  return (
    <Pressable
      style={[styles.item, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export interface DropdownMenuCheckboxItemProps {
  children: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const DropdownMenuCheckboxItem: React.FC<DropdownMenuCheckboxItemProps> = ({
  children,
  checked = false,
  onCheckedChange,
  disabled = false,
  style,
}) => {
  const { colors } = useTheme();
  
  const handlePress = () => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  };

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 32,
      paddingRight: 8,
      paddingVertical: 6,
      borderRadius: 4,
      opacity: disabled ? 0.5 : 1,
    },
    indicator: {
      position: 'absolute',
      left: 8,
      width: 14,
      height: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmark: {
      fontSize: 12,
      color: colors.foreground[200],
    },
    text: {
      fontSize: 14,
      color: colors.foreground[200],
    },
  });

  return (
    <Pressable
      style={[styles.item, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ 
        checked,
        disabled 
      }}
    >
      <View style={styles.indicator}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export interface DropdownMenuRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const DropdownMenuRadioGroup: React.FC<DropdownMenuRadioGroupProps> = ({
  value,
  onValueChange,
  children,
}) => {
  return (
    <DropdownMenuRadioGroupContext.Provider value={{ value, onValueChange }}>
      {children}
    </DropdownMenuRadioGroupContext.Provider>
  );
};

export interface DropdownMenuRadioItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

export const DropdownMenuRadioItem: React.FC<DropdownMenuRadioItemProps> = ({
  value,
  children,
  disabled = false,
  style,
}) => {
  const radioContext = useContext(DropdownMenuRadioGroupContext);
  const { colors } = useTheme();
  
  if (!radioContext) {
    throw new Error('DropdownMenuRadioItem must be used within a DropdownMenuRadioGroup');
  }
  
  const { value: selectedValue, onValueChange } = radioContext;
  const isSelected = selectedValue === value;
  
  const handlePress = () => {
    if (disabled) return;
    onValueChange?.(value);
  };

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 32,
      paddingRight: 8,
      paddingVertical: 6,
      borderRadius: 4,
      opacity: disabled ? 0.5 : 1,
    },
    indicator: {
      position: 'absolute',
      left: 8,
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: colors.foreground[300],
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.foreground[200],
    },
    text: {
      fontSize: 14,
      color: colors.foreground[200],
    },
  });

  return (
    <Pressable
      style={[styles.item, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ 
        selected: isSelected,
        disabled 
      }}
    >
      <View style={styles.indicator}>
        {isSelected && <View style={styles.dot} />}
      </View>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export interface DropdownMenuLabelProps {
  children: React.ReactNode;
  inset?: boolean;
  style?: ViewStyle;
}

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({
  children,
  inset = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    label: {
      paddingHorizontal: inset ? 32 : 8,
      paddingVertical: 6,
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.foreground[100],
    },
  });

  return (
    <View style={[styles.label, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export interface DropdownMenuSeparatorProps {
  style?: ViewStyle;
}

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: colors.background[300],
      marginHorizontal: -4,
      marginVertical: 4,
    },
  });

  return <View style={[styles.separator, style]} />;
};

export interface DropdownMenuShortcutProps {
  children: React.ReactNode;
  style?: any;
}

export const DropdownMenuShortcut: React.FC<DropdownMenuShortcutProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <Text 
      style={[
        { 
          marginLeft: 'auto',
          fontSize: 12,
          color: colors.foreground[400],
          opacity: 0.6
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
};

export interface DropdownMenuGroupProps {
  children: React.ReactNode;
}

export const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({
  children,
}) => {
  return <View>{children}</View>;
}; 
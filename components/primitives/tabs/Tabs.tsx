import React, { useState } from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  style?: any;
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  style?: any;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onValueChange,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.background[200],
      borderRadius: 8,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: colors.background[500],
    },
    tabText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.foreground[400],
    },
    activeTabText: {
      color: colors.foreground[100],
    },
    disabledTab: {
      opacity: 0.5,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {items.map((item) => (
        <Pressable
          key={item.value}
          style={[
            styles.tab,
            value === item.value && styles.activeTab,
            item.disabled && styles.disabledTab,
          ]}
          onPress={() => {
            if (!item.disabled && onValueChange) {
              onValueChange(item.value);
            }
          }}
          disabled={item.disabled}
        >
          <Text
            style={[
              styles.tabText,
              value === item.value && styles.activeTabText,
            ]}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  style,
}) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};

// Compound component pattern
export const TabsRoot: React.FC<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  style?: any;
}> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  style,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <View style={style}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            value,
            onValueChange: handleValueChange,
          });
        }
        return child;
      })}
    </View>
  );
}; 
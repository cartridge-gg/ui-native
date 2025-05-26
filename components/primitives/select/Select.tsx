import React, { useState } from 'react';
import { View, Pressable, Modal, ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';

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
  style?: any;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option...',
  disabled = false,
  simplified = false,
  style,
}) => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const styles = StyleSheet.create({
    trigger: {
      height: 36,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.background[200],
      borderRadius: 6,
      opacity: disabled ? 0.5 : 1,
    },
    triggerText: {
      fontSize: 12,
      fontWeight: '700',
      color: selectedOption ? colors.foreground[100] : colors.foreground[400],
      flex: 1,
    },
    chevron: {
      width: 0,
      height: 0,
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderTopWidth: 4,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: colors.foreground[400],
      marginLeft: 8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.background[200],
      borderRadius: 8,
      maxHeight: 300,
      minWidth: 200,
      maxWidth: '80%',
    },
    optionItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.background[300],
    },
    optionText: {
      fontSize: 12,
      color: colors.foreground[400],
    },
    selectedOption: {
      backgroundColor: colors.background[500],
    },
    selectedOptionText: {
      color: colors.foreground[200],
    },
    disabledOption: {
      opacity: 0.5,
    },
  });

  const handleSelect = (optionValue: string) => {
    if (onValueChange) {
      onValueChange(optionValue);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Pressable
        style={[styles.trigger, style]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <Text style={styles.triggerText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        {simplified && <View style={styles.chevron} />}
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView>
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.optionItem,
                    option.value === value && styles.selectedOption,
                    option.disabled && styles.disabledOption,
                  ]}
                  onPress={() => !option.disabled && handleSelect(option.value)}
                  disabled={option.disabled}
                >
                  <Text
                    style={[
                      styles.optionText,
                      option.value === value && styles.selectedOptionText,
                    ]}
                  >
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
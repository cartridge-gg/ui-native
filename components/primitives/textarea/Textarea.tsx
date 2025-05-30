import React, { useState } from 'react';
import { TextInput, View, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { ViewStyleProp, TextStyleProp } from '../../utils/types';
import { Text } from '../../typography/Text';
import { TimesIcon } from '../../icons/utility/TimesIcon';

export interface TextareaProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  variant?: 'default' | 'username';
  size?: 'default' | 'lg';
  disabled?: boolean;
  error?: { message: string };
  isLoading?: boolean;
  onClear?: () => void;
  style?: ViewStyleProp;
  textStyle?: TextStyleProp;
  minHeight?: number;
  maxHeight?: number;
  testID?: string;
}

export const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({
    value = '',
    onChangeText,
    placeholder,
    variant = 'default',
    size = 'default',
    disabled = false,
    error,
    isLoading = false,
    onClear,
    style,
    textStyle,
    minHeight,
    maxHeight,
    testID,
    ...props
  }, ref) => {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);

    // Get variant styles
    const getVariantStyles = () => {
      const baseStyles = {
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 16,
        fontFamily: 'monospace',
        backgroundColor: colors.background[200],
        borderColor: error ? colors.destructive[100] : colors.background[300],
        color: colors.foreground[100],
      };

      if (isFocused) {
        baseStyles.borderColor = error ? colors.destructive[100] : colors.primary[100];
        baseStyles.backgroundColor = colors.background[300];
      }

      return baseStyles;
    };

    // Get size styles
    const getSizeStyles = () => {
      const calculatedHeight = Math.max(
        minHeight || (size === 'lg' ? 48 : 40),
        contentHeight + (size === 'lg' ? 26.6 : 20.6), // padding top + bottom
        size === 'lg' ? 48 : 40
      );

      const finalHeight = maxHeight ? Math.min(calculatedHeight, maxHeight) : calculatedHeight;

      return {
        minHeight: minHeight || (size === 'lg' ? 48 : 40),
        height: finalHeight,
        paddingTop: size === 'lg' ? 13.3 : 10.3,
        paddingBottom: size === 'lg' ? 13.3 : 10.3,
        fontSize: size === 'lg' ? 15 : 14,
        lineHeight: size === 'lg' ? 20 : 18,
      };
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const textInputStyles = {
      ...variantStyles,
      ...sizeStyles,
      textAlignVertical: 'top' as const,
      opacity: disabled ? 0.5 : 1,
      paddingRight: (value && onClear) ? 48 : 16, // Space for clear button
    };

    const handleContentSizeChange = (event: any) => {
      setContentHeight(event.nativeEvent.contentSize.height);
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    return (
      <View style={[{ gap: 12 }, style]}>
        <View style={{ position: 'relative' }}>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.foreground[400]}
            multiline
            editable={!disabled && !isLoading}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onContentSizeChange={handleContentSizeChange}
            style={[textInputStyles, textStyle]}
            testID={testID}
            {...props}
          />
          
          {/* Clear button */}
          {(isFocused || value) && value && onClear && !disabled && !isLoading && (
            <Pressable
              onPress={handleClear}
              style={{
                position: 'absolute',
                right: 6,
                top: 6,
                width: 32,
                height: 32,
                borderRadius: 4,
                backgroundColor: colors.background[200],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TimesIcon size="xs" color={colors.foreground[300]} />
            </Pressable>
          )}
        </View>
        
        {/* Error message */}
        {error && (
          <Text style={{ 
            fontSize: 12, 
            color: colors.destructive[100],
            marginTop: -8 // Reduce gap when error is shown
          }}>
            {error.message}
          </Text>
        )}
      </View>
    );
  }
);

Textarea.displayName = 'Textarea'; 
import React from 'react';
import { Text } from '../../typography/Text';
import { useTheme } from '../../theme/ThemeProvider';
import { TextStyleProp } from '../../utils/types';

export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string; // For web compatibility, but not used in React Native
  style?: TextStyleProp;
  disabled?: boolean;
  required?: boolean;
  testID?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  style,
  disabled = false,
  required = false,
  testID,
  ...props
}) => {
  const { colors } = useTheme();

  const labelStyles = {
    fontSize: 12, // text-xs
    color: disabled ? colors.foreground[400] : colors.foreground[400],
    fontWeight: '500' as const, // font-medium
    lineHeight: 16, // leading-none equivalent
    textTransform: 'uppercase' as const,
    opacity: disabled ? 0.7 : 1,
  };

  return (
    <Text
      style={[labelStyles, style]}
      testID={testID}
      {...props}
    >
      {children}
      {required && (
        <Text style={{ color: colors.destructive[100] }}> *</Text>
      )}
    </Text>
  );
};

Label.displayName = 'Label'; 
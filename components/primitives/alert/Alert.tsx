import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../../typography/Text';

export type AlertVariant = 'default' | 'destructive' | 'constructive';

export interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  children,
  style,
}) => {
  const { colors } = useTheme();

  const getVariantStyles = (variant: AlertVariant) => {
    switch (variant) {
      case 'destructive':
        return {
          backgroundColor: colors.background[200],
          borderColor: colors.destructive[100],
          borderWidth: 1,
        };
      case 'constructive':
        return {
          backgroundColor: colors.background[200],
          borderColor: colors.constructive[100],
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: colors.background[200],
          borderColor: colors.background[300],
          borderWidth: 1,
        };
    }
  };

  const variantStyles = getVariantStyles(variant);

  const styles = StyleSheet.create({
    alert: {
      borderRadius: 8,
      padding: 16,
      ...variantStyles,
    },
  });

  return (
    <View 
      style={[styles.alert, style]}
      accessibilityRole="alert"
    >
      {children}
    </View>
  );
};

export interface AlertTitleProps {
  children: React.ReactNode;
  style?: any;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <Text 
      variant="body" 
      style={[
        { 
          fontWeight: '600', 
          marginBottom: 4,
          color: colors.foreground[100]
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
};

export interface AlertDescriptionProps {
  children: React.ReactNode;
  style?: any;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <Text 
      variant="body" 
      style={[
        { 
          color: colors.foreground[400],
          lineHeight: 20
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
}; 
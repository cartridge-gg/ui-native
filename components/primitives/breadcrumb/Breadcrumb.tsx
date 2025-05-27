import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../../typography/Text';

export interface BreadcrumbProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  style,
}) => {
  return (
    <View 
      style={style}
      accessibilityRole="navigation"
      accessibilityLabel="breadcrumb"
    >
      {children}
    </View>
  );
};

export interface BreadcrumbListProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const BreadcrumbList: React.FC<BreadcrumbListProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 0,
    },
  });

  return (
    <View style={[styles.list, style]}>
      {children}
    </View>
  );
};

export interface BreadcrumbItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  style,
}) => {
  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
  });

  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  );
};

export interface BreadcrumbLinkProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  children,
  onPress,
  disabled = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    link: {
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      fontSize: 14,
      color: colors.foreground[400],
    },
    pressedText: {
      color: colors.foreground[200],
    },
  });

  if (!onPress || disabled) {
    return (
      <View style={[styles.link, style]}>
        <Text style={styles.text}>{children}</Text>
      </View>
    );
  }

  return (
    <Pressable
      style={[styles.link, style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="link"
    >
      {({ pressed }) => (
        <Text style={[styles.text, pressed && styles.pressedText]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export interface BreadcrumbPageProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const BreadcrumbPage: React.FC<BreadcrumbPageProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    page: {
      // Current page styling
    },
    text: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.foreground[100],
    },
  });

  return (
    <View 
      style={[styles.page, style]}
      accessibilityRole="text"
      accessibilityState={{ disabled: true }}
      accessibilityLabel="current page"
    >
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    separator: {
      marginHorizontal: 4,
    },
    defaultIcon: {
      fontSize: 16,
      color: colors.foreground[400],
    },
  });

  return (
    <View 
      style={[styles.separator, style]}
      accessibilityRole="presentation"
      accessibilityElementsHidden={true}
    >
      {children || <Text style={styles.defaultIcon}>›</Text>}
    </View>
  );
};

export interface BreadcrumbEllipsisProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export const BreadcrumbEllipsis: React.FC<BreadcrumbEllipsisProps> = ({
  onPress,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    ellipsis: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      color: colors.foreground[400],
    },
  });

  if (!onPress) {
    return (
      <View 
        style={[styles.ellipsis, style]}
        accessibilityRole="presentation"
        accessibilityElementsHidden={true}
      >
        <Text style={styles.text}>⋯</Text>
      </View>
    );
  }

  return (
    <Pressable
      style={[styles.ellipsis, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Show more breadcrumb items"
    >
      <Text style={styles.text}>⋯</Text>
    </Pressable>
  );
}; 
import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

export interface TokenSummaryProps {
  variant?: 'default';
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const TokenSummary: React.FC<TokenSummaryProps> = ({
  variant = 'default',
  style,
  children,
}) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8, // rounded
      width: '100%', // w-full
      flexDirection: 'column',
      gap: 1, // gap-y-px
    },
  });

  return (
    <ScrollView 
      style={[styles.container, style]}
      showsVerticalScrollIndicator={false} // Hide scrollbar like scrollbarWidth: "none"
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

export default TokenSummary;
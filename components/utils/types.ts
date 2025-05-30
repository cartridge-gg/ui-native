import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// Common style type that can accept style objects or arrays
export type StyleProp<T> = T | T[] | undefined;

// Common component prop types
export type ViewStyleProp = StyleProp<ViewStyle>;
export type TextStyleProp = StyleProp<TextStyle>;
export type ImageStyleProp = StyleProp<ImageStyle>;

// Common component props interface
export interface BaseComponentProps {
  style?: ViewStyleProp;
  className?: string;
  testID?: string;
}

// Common text component props
export interface BaseTextProps extends BaseComponentProps {
  style?: TextStyleProp;
} 
import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function for merging class names
 * Compatible with NativeWind and Tailwind CSS
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// Re-export clsx for direct usage if needed
export { clsx }; 
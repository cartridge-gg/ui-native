import { IconSize } from './types';

export const getSizeValue = (size: IconSize = 'default'): number => {
  switch (size) {
    case 'xs':
      return 16; // h-4 w-4
    case 'sm':
      return 20; // h-5 w-5
    case 'default':
      return 24; // h-6 w-6
    case 'lg':
      return 32; // h-8 w-8
    case 'xl':
      return 48; // h-12 w-12
    case '2xl':
      return 56; // h-14 w-14
    case '3xl':
      return 72; // h-[72px] w-[72px]
    default:
      return 24;
  }
}; 
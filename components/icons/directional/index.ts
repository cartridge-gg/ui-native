export * from './ArrowIcon';
export * from './ChevronIcon';
export * from './CaratIcon';
export * from './WedgeIcon';
export * from './ArrowFromLineIcon';
export * from './ArrowToLineIcon';

// Collections for stories
export const directionalIcons = {
  ArrowIcon: () => import('./ArrowIcon').then(m => m.ArrowIcon),
  ChevronIcon: () => import('./ChevronIcon').then(m => m.ChevronIcon),
  CaratIcon: () => import('./CaratIcon').then(m => m.CaratIcon),
  WedgeIcon: () => import('./WedgeIcon').then(m => m.WedgeIcon),
  ArrowFromLineIcon: () => import('./ArrowFromLineIcon').then(m => m.ArrowFromLineIcon),
  ArrowToLineIcon: () => import('./ArrowToLineIcon').then(m => m.ArrowToLineIcon),
}; 
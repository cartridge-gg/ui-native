# UI Library Migration Plan: React to React Native

## Overview
This document outlines the incremental migration plan for porting the existing React/Tailwind UI library to React Native/NativeWind. The migration will be done in phases to ensure each component is properly validated before moving to the next.

## Pre-Migration Setup

### 1. Dependencies Analysis & Installation ✅
- **Install required React Native equivalents**:
  ```bash
  pnpm add class-variance-authority clsx react-native-svg react-native-gesture-handler react-native-reanimated@~3.17.4
  pnpm add @gorhom/bottom-sheet react-native-modal react-native-toast-message
  pnpm add expo-clipboard expo-haptics
  ```

### 2. Theme & Configuration Migration ✅
- **Port Tailwind configuration** to NativeWind-compatible format ✅
- **Create theme provider** for CSS variables → React Native theme context ✅
- **Port theme files** (default.css, dark.css, fonts.css) to React Native StyleSheet ✅
- **Setup font loading** with expo-font for custom fonts (TODO)

### 3. Utility Functions ✅
- **Port `cn` utility** for className merging (clsx + tailwind-merge compatibility) ✅
- **Create platform-specific utilities** for handling web vs native differences (TODO)
- **Setup SVG icon system** using react-native-svg (TODO)

## Migration Phases

### Phase 1: Core Primitives (Week 1) ✅
Priority components that other components depend on:

1. **Typography Components** ✅
   - [x] Text variants (heading, body, label) ✅
   - [x] Platform-specific font scaling ✅
   - Validation: Visual comparison with web Storybook ✅

2. **Button Component** ✅
   - [x] Port button variants and sizes ✅
   - [x] Handle loading states with ActivityIndicator ✅
   - [x] Platform-specific press feedback (Pressable) ✅
   - Validation: Interactive testing in Storybook ✅

3. **Layout Components** ✅
   - [x] Card ✅
   - [x] Card variants (Header, Content, List, etc.) ✅
   - [x] Enhanced Card with theme integration ✅
   - [ ] Separator (TODO)
   - [ ] Container/Spacer components (TODO)
   - Validation: Layout testing across different screen sizes ✅

4. **Input Components** ✅
   - [x] TextInput with proper styling ✅
   - [x] Label component ✅
   - [x] Form field wrapper ✅
   - [x] Error states and clear functionality ✅
   - Validation: Keyboard handling and accessibility ✅

5. **Badge Component** ✅
   - [x] Badge variants (default, primary, muted, destructive, outline) ✅
   - [x] Interactive badge support ✅
   - [x] Theme integration ✅
   - Validation: Visual comparison with web version ✅

### Phase 2: Interactive Primitives (Week 2)
Components requiring gesture handling and animations:

1. **Toggle Components**
   - [ ] Switch (using react-native Switch)
   - [ ] Checkbox (custom implementation)
   - [ ] Radio Group
   - [ ] Toggle Group

2. **Selection Components**
   - [ ] Select/Dropdown (using react-native-modal)
   - [ ] Command/Search component
   - Validation: Native picker behavior

3. **Feedback Components**
   - [ ] Progress bar
   - [ ] Skeleton loader
   - [ ] Spinner/Loading indicator
   - [ ] Badge

4. **Overlay Components**
   - [ ] Modal/Dialog (react-native-modal)
   - [ ] Sheet/Drawer (@gorhom/bottom-sheet)
   - [ ] Popover/Tooltip
   - [ ] Toast notifications
   - Validation: Native modal behavior and gestures

### Phase 3: Navigation & Data Display (Week 3)

1. **Navigation Components**
   - [ ] Tabs (using react-native-tab-view or custom)
   - [ ] Breadcrumb
   - [ ] Bottom Tab navigation
   - Validation: Platform-specific navigation patterns

2. **Data Display**
   - [ ] Table (ScrollView with fixed headers)
   - [ ] Accordion
   - [ ] Alert & Alert Dialog
   - Validation: Performance with large datasets

3. **Advanced Interactions**
   - [ ] Dropdown Menu
   - [ ] Context Menu (iOS specific)
   - [ ] Hover Card (web only fallback)

### Phase 4: Icon System (Week 4)

1. **Icon Migration**
   - [ ] Convert all SVG icons to react-native-svg components
   - [ ] Create icon generation script
   - [ ] Maintain consistent sizing system
   - Categories:
     - [ ] Badge icons
     - [ ] Brand icons
     - [ ] Directional icons
     - [ ] State icons
     - [ ] Utility icons

### Phase 5: Complex Modules (Weeks 5-6) 🚧 IN PROGRESS

1. **Achievement Module**
   - [ ] Player components (avatar, badge, header)
   - [ ] Task components
   - [ ] Progress tracking
   - [ ] Points display

2. **Collectibles Module** 🚧
   - [x] Asset cards ✅
   - [ ] Preview components
   - [ ] Properties display
   - [ ] Card variants (selectable, faded)

3. **Tokens Module** ✅
   - [x] Token cards with price change indicators ✅
   - [x] Background gradients for price changes ✅
   - [x] Interactive token cards ✅
   - [ ] Token summary component

4. **Activity Module**
   - [ ] Activity cards
   - [ ] Activity details
   - [ ] Headers

5. **Social Features**
   - [ ] Followers components
   - [ ] Leaderboard
   - [ ] Social lists

### Phase 6: Specialized Components (Week 7)

1. **Web3 Components**
   - [ ] Wallet connection (with WalletConnect)
   - [ ] Address display/copy
   - [ ] Token displays
   - [ ] QR code generation

2. **Game/Arcade Components**
   - [ ] Game headers
   - [ ] Discovery components
   - [ ] Menu systems

3. **Remaining Modules**
   - [ ] Starterpack
   - [ ] Traceabilities
   - [ ] Universal components

## Validation Strategy

### For Each Component:
1. **Visual Testing**
   - Screenshot comparison with web version
   - Test on iOS and Android devices
   - Verify dark mode support

2. **Functional Testing**
   - Interaction patterns match web
   - Gesture handling works correctly
   - Keyboard behavior is native-like

3. **Performance Testing**
   - Smooth animations (60 FPS)
   - Fast list rendering
   - Memory usage optimization

4. **Storybook Documentation**
   - Create stories matching web library
   - Document platform differences
   - Include usage examples

## Technical Considerations

### Platform Differences to Handle:
1. **Styling**
   - Shadow implementation (iOS vs Android)
   - Border radius overflow
   - Text selection behavior

2. **Interactions**
   - Touch vs mouse events
   - Hover states (web only)
   - Keyboard shortcuts (web only)

3. **Navigation**
   - Hardware back button (Android)
   - Swipe gestures (iOS)
   - Deep linking

### Performance Optimizations:
1. Use `React.memo` for expensive components
2. Implement `FlashList` for large lists
3. Optimize image loading with expo-image
4. Minimize bridge calls

## Testing & Quality Assurance

### Automated Testing:
1. Unit tests for utility functions
2. Component testing with React Native Testing Library
3. Visual regression testing with Storybook

### Manual Testing Checklist:
- [ ] iOS iPhone (multiple sizes)
- [ ] iOS iPad
- [ ] Android phones (multiple sizes)
- [ ] Android tablets
- [ ] Web (via React Native Web)

## Success Metrics

1. **Component Coverage**: 100% of web components ported
2. **Visual Fidelity**: 95%+ match with web version
3. **Performance**: All interactions < 16ms (60 FPS)
4. **Bundle Size**: < 2MB for core components
5. **Documentation**: 100% Storybook coverage

## Visual Comparison & Progress Tracking

### Visual Comparison System ✅
- [x] Created visual comparison script (`scripts/visual-comparison.js`) ✅
- [x] HTML report generation for side-by-side comparison ✅
- [x] Progress tracking with statistics ✅
- [x] Component matching between web and React Native ✅

### Current Migration Status
- **Total Web Components**: 400+ (from snapshots)
- **Migrated Components**: 5+ (Card, Badge, TokenCard, AssetCard, Button, Input, Text)
- **Migration Progress**: ~1.25%
- **Next Priority**: Interactive primitives (Toggle, Select, Modal)

### Recently Completed Components
1. **CollectibleAssetCard** ✅
   - Matches web styling with image, title, description
   - Interactive press support
   - Theme integration

2. **TokenCard** ✅
   - Price change indicators with color coding
   - Background color changes for gains/losses
   - Circular token images
   - Value and change display

3. **Badge** ✅
   - All variants: default, primary, muted, destructive, outline
   - Interactive support
   - Theme-aware colors

### Visual Comparison Usage
```bash
# List pending components
node scripts/visual-comparison.js list

# Generate HTML comparison report
node scripts/visual-comparison.js report
```

## Post-Migration Tasks

1. **Optimization Phase**
   - Bundle size optimization
   - Performance profiling
   - Memory leak detection

2. **Documentation**
   - Migration guide for consumers
   - Platform-specific considerations
   - Best practices guide

3. **Maintenance Plan**
   - Automated visual regression tests
   - Cross-platform testing pipeline
   - Version synchronization strategy

## Timeline Summary

- **Week 0**: Setup and configuration
- **Week 1**: Core primitives
- **Week 2**: Interactive primitives
- **Week 3**: Navigation & data display
- **Week 4**: Icon system
- **Weeks 5-6**: Complex modules
- **Week 7**: Specialized components
- **Week 8**: Testing, optimization, and documentation

## Notes

- Each phase includes validation before proceeding
- Components should maintain API compatibility where possible
- Platform-specific features should be clearly documented
- Regular syncs with design team for visual validation

## Technical Implementation Details

### NativeWind v4 Setup

1. **Update tailwind.config.js**:
```javascript
// ui-native/tailwind.config.js
import { cartridgeTWPreset } from "../ui/src/preset";

export default {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require('nativewind/preset'), cartridgeTWPreset],
  theme: {
    extend: {
      // Port animations and keyframes from ui/tailwind.config.ts
    }
  }
}
```

2. **Theme Provider Implementation**:
```typescript
// ui-native/components/theme/ThemeProvider.tsx
import { createContext, useContext } from 'react';
import { useColorScheme } from 'nativewind';

const ThemeContext = createContext<{
  colors: typeof lightColors | typeof darkColors;
  isDark: boolean;
}>({});

export const ThemeProvider = ({ children }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <ThemeContext.Provider value={{ 
      colors: isDark ? darkColors : lightColors,
      isDark 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Component Mapping Examples

#### Button Migration Pattern
```typescript
// FROM: ui/src/components/primitives/button/index.tsx
// TO: ui-native/components/primitives/button/index.tsx

import { Pressable, Text, ActivityIndicator } from 'react-native';
import { cn } from '../../utils/cn';
import { buttonVariants } from './utils';

export const Button = React.forwardRef<View, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <Pressable
        className={cn(
          buttonVariants({ variant, size }),
          className
        )}
        ref={ref}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {({ pressed }) => (
          <>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className={cn(
                buttonTextVariants({ variant, size }),
                pressed && "opacity-70"
              )}>
                {children}
              </Text>
            )}
          </>
        )}
      </Pressable>
    );
  }
);
```

#### Radix UI to React Native Mappings

| Radix Component | React Native Solution | Notes |
|----------------|----------------------|-------|
| @radix-ui/react-dialog | react-native-modal | Custom overlay handling |
| @radix-ui/react-dropdown-menu | Custom implementation | Use Pressable + Animated |
| @radix-ui/react-select | @react-native-picker/picker | Platform-specific styling |
| @radix-ui/react-toast | react-native-toast-message | Different API |
| @radix-ui/react-tooltip | Custom Pressable + Modal | Long press for mobile |
| @radix-ui/react-tabs | react-native-tab-view | Gesture support |
| @radix-ui/react-switch | React Native Switch | Built-in component |
| @radix-ui/react-checkbox | Custom SVG implementation | No native equivalent |

### CSS Variables to React Native Theme

```typescript
// ui-native/components/theme/colors.ts
export const lightColors = {
  background: {
    100: '#161a17',
    125: '#181c19',
    150: '#1a1e1b',
    200: '#1e221f',
    300: '#242824',
    400: '#2a2f2a',
    500: '#373c38',
  },
  foreground: {
    100: '#ffffff',
    200: '#9c9c9c',
    300: '#808080',
    400: '#505050',
  },
  primary: {
    100: '#fbcb4a',
    200: '#cca63e',
  },
  // ... rest of colors
};

// Usage with NativeWind
// className="bg-background-100 text-foreground-100"
```

### Platform-Specific Considerations

1. **Shadows**:
```typescript
// Web: shadow-md
// iOS: Use shadowColor, shadowOffset, shadowOpacity, shadowRadius
// Android: Use elevation

const platformShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: {
    elevation: 4,
  },
});
```

2. **Safe Area Handling**:
```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();
// Apply padding: paddingTop: insets.top
```

### Validation Approach

1. **Create Visual Test Suite**:
```typescript
// ui-native/.storybook/preview.tsx
export const decorators = [
  (Story) => (
    <ThemeProvider>
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    </ThemeProvider>
  ),
];
```

2. **Side-by-Side Comparison Script**:
```bash
#!/bin/bash
# scripts/compare-components.sh
# Run both Storybooks and capture screenshots
# Use image diff tools to compare
```

3. **Component Checklist Template**:
```markdown
## Component: [Name]
- [ ] TypeScript types match
- [ ] All props supported
- [ ] Variants implemented
- [ ] Animations smooth
- [ ] iOS tested
- [ ] Android tested
- [ ] Story created
- [ ] Tests written
- [ ] Accessibility verified
```

### Build Verification Steps

After each component migration:

1. **Run type checking**: `tsc --noEmit`
2. **Run linting**: `pnpm lint`
3. **Build Storybook**: `pnpm build-storybook`
4. **Run on iOS**: `pnpm ios`
5. **Run on Android**: `pnpm android`
6. **Visual regression test**: Compare with web version

### Common Pitfalls to Avoid

1. **Text must be wrapped in Text component** (no raw strings)
2. **View cannot have text styles** (separate Text styling)
3. **No CSS cascading** (explicit styling required)
4. **Platform-specific imports** (use `.ios.tsx` and `.android.tsx` when needed)
5. **Gesture conflicts** (test ScrollView + Pressable interactions)

### Performance Monitoring

```typescript
// Add performance monitoring to complex components
import { PerformanceObserver } from 'react-native-performance';

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});
```
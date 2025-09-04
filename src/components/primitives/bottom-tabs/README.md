# Bottom Tabs Component

This directory contains React Native bottom tabs components that are compatible with expo-router's Tabs component.

## Components

### `BottomTabs`
A basic bottom tabs container component that can be used as a custom tab bar with expo-router.

### `TabItem`
A basic tab item component for use within `BottomTabs`.

### `ExpoRouterTabs`
A specialized bottom tabs container designed specifically for expo-router integration.

### `ExpoRouterTabItem`
A tab item component that automatically handles navigation using expo-router's `useRouter` and `usePathname` hooks.

## Usage with expo-router

### Basic Usage
```tsx
import { Tabs } from "expo-router";
import { BottomTabs, TabItem } from "#components";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => (
        <BottomTabs>
          <TabItem active>
            <Text>Home</Text>
          </TabItem>
          <TabItem>
            <Text>Activity</Text>
          </TabItem>
          <TabItem>
            <Text>Profile</Text>
          </TabItem>
        </BottomTabs>
      )}
    >
      {/* Tab screens */}
    </Tabs>
  );
}
```

### Advanced Usage with ExpoRouter Components
```tsx
import { Tabs } from "expo-router";
import { ExpoRouterTabs, ExpoRouterTabItem } from "#components";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => (
        <ExpoRouterTabs>
          <ExpoRouterTabItem href="/(tabs)/index">
            <Text>Home</Text>
          </ExpoRouterTabItem>
          <ExpoRouterTabItem href="/(tabs)/activity">
            <Text>Activity</Text>
          </ExpoRouterTabItem>
          <ExpoRouterTabItem href="/(tabs)/profile">
            <Text>Profile</Text>
          </ExpoRouterTabItem>
        </ExpoRouterTabs>
      )}
    >
      {/* Tab screens */}
    </Tabs>
  );
}
```

### With Icons
```tsx
import { Tabs } from "expo-router";
import { ExpoRouterTabs, ExpoRouterTabItem } from "#components";
import { HomeIcon, ActivityIcon, ProfileIcon } from "#components";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => (
        <ExpoRouterTabs>
          <ExpoRouterTabItem href="/(tabs)/index">
            <HomeIcon size="xl" />
            <Text>Home</Text>
          </ExpoRouterTabItem>
          <ExpoRouterTabItem href="/(tabs)/activity">
            <ActivityIcon size="xl" />
            <Text>Activity</Text>
          </ExpoRouterTabItem>
          <ExpoRouterTabItem href="/(tabs)/profile">
            <ProfileIcon size="xl" />
            <Text>Profile</Text>
          </ExpoRouterTabItem>
        </ExpoRouterTabs>
      )}
    >
      {/* Tab screens */}
    </Tabs>
  );
}
```

## Props

### BottomTabs / ExpoRouterTabs
- `variant`: "default" - The visual variant of the tabs
- `size`: "default" - The size variant of the tabs
- `className`: Additional CSS classes
- `children`: Tab items to render

### TabItem
- `active`: Whether the tab is currently active
- `onPress`: Custom press handler
- `children`: Content to render in the tab

### ExpoRouterTabItem
- `href`: The route to navigate to when pressed
- `active`: Whether the tab is currently active (auto-detected if not provided)
- `onPress`: Custom press handler (overrides default navigation)
- `children`: Content to render in the tab

## Styling

The components use Tailwind CSS classes and can be customized using the `className` prop. The default styling includes:

- Background color: `bg-background-200`
- Border: `border-t border-spacer-100`
- Shadow: `shadow-[0px_-4px_8px_0px_rgba(0,_0,_0,_0.32)]`
- Height: `h-[72px]`
- Layout: `flex-row justify-around items-stretch`

## Accessibility

The `ExpoRouterTabItem` component includes proper accessibility attributes:
- `accessibilityRole="tab"`
- `accessibilityState={{ selected: isActive }}`

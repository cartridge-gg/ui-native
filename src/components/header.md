# Universal Header Components

This directory contains React Native header components that provide consistent navigation and styling across all screens and tabs in the app.

## Components

### `Header`
The base header component with customizable left/right actions, title, subtitle, and styling variants.

### `TabHeader`
A specialized header for tab screens with elevated styling and shadow.

### `ScreenHeader`
A header component with built-in back button functionality for screen navigation.

## Usage

### Basic Header
```tsx
import { Header } from "#components";

<Header title="Screen Title" />
```

### Header with Actions
```tsx
import { Header } from "#components";
import { SettingsIcon } from "#components/icons";

<Header
  title="Profile"
  leftAction={{
    icon: <SettingsIcon size="lg" />,
    onPress: () => openSettings(),
    accessibilityLabel: "Open settings"
  }}
  rightAction={{
    icon: <Text>Edit</Text>,
    onPress: () => editProfile(),
    accessibilityLabel: "Edit profile"
  }}
/>
```

### Screen Header with Back Button
```tsx
import { ScreenHeader } from "#components";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader 
        title="Profile" 
        onBack={() => router.back()}
      />
      {/* Screen content */}
    </View>
  );
}
```

### Tab Header
```tsx
import { TabHeader } from "#components";

<TabHeader title="Activity Feed" subtitle="Latest updates" />
```

### Custom Styling
```tsx
<Header
  title="Custom Header"
  variant="transparent"
  className="bg-primary-100"
/>
```

## Variants

- **`default`**: Standard header with background and border
- **`transparent`**: Transparent background
- **`elevated`**: Header with shadow for elevated appearance

## Features

- ✅ **Safe Area Support**: Automatically handles iOS safe areas
- ✅ **Accessibility**: Built-in accessibility labels and roles
- ✅ **Flexible Actions**: Customizable left and right action buttons
- ✅ **Consistent Styling**: Uses design system colors and spacing
- ✅ **TypeScript Support**: Full type safety for all props
- ✅ **Responsive Design**: Adapts to different screen sizes

## Utility Functions

### `createHeaderWithActions`
Creates a header with custom left and right actions.

```tsx
import { createHeaderWithActions } from "#components";

const header = createHeaderWithActions(
  "Title",
  { icon: <Icon />, onPress: () => {} },
  { icon: <Button />, onPress: () => {} }
);
```

### `createBackHeader`
Creates a header with a back button.

```tsx
import { createBackHeader } from "#components";

const header = createBackHeader("Title", () => router.back());
```

## Integration with Expo Router

The header components work seamlessly with Expo Router:

```tsx
// In your screen component
export default function Screen() {
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="Screen Title" />
      {/* Your content */}
    </View>
  );
}

// In your tab layout
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide default headers
      }}
    >
      {/* Tab screens with custom headers */}
    </Tabs>
  );
}
```

## Styling

Headers use Tailwind CSS classes and follow the design system:

- **Background**: `bg-background-200` (default), `bg-transparent`, or custom
- **Borders**: `border-b border-spacer-100` for separation
- **Text**: `text-foreground` for titles, `text-muted-foreground` for subtitles
- **Spacing**: Consistent padding and margins using design tokens

## Best Practices

1. **Always use `headerShown: false`** in tab screen options when using custom headers
2. **Use `ScreenHeader`** for screens that need back navigation
3. **Use `TabHeader`** for tab screens that need elevated styling
4. **Provide accessibility labels** for all interactive elements
5. **Keep titles concise** - they should fit comfortably in the header
6. **Use consistent styling** across similar screen types

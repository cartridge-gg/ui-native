# UI to UI-Native Migration Strategy

## Overview

This document outlines the systematic process for migrating UI components from the web-based UI library to the React Native UI-native library, ensuring visual parity and functional consistency.

## Goals

- **Visual Parity**: Achieve 99%+ visual similarity between UI and UI-native components
- **Functional Consistency**: Ensure components behave identically across platforms
- **Systematic Approach**: Follow a repeatable process for each component
- **Quality Assurance**: Use automated tools to verify migration success

## Tools

### 1. NativeWind Setup
NativeWind enables using Tailwind CSS classes directly in React Native components, eliminating the need for style prop conversions.

**Key Benefits**:
- Keep existing Tailwind classes unchanged
- Maintain design system consistency
- Simplify migration process
- Support for responsive design and theme switching

**Configuration Requirements**:
- Ensure `tailwind.config.js` is properly configured for React Native
- Verify custom theme colors from `dark.css` are mapped to Tailwind classes
- Map CSS custom properties (--background-100, --foreground, etc.) to Tailwind color tokens
- Check that all Tailwind plugins are compatible with NativeWind

**React Native vs Web Differences**:
React Native has different default behaviors that require Tailwind class adjustments:

| Web Behavior | React Native Behavior | Class Adjustment |
|--------------|----------------------|------------------|
| `flex` defaults to `flex-direction: row` | `flex` defaults to `flex-direction: column` | `flex` → `flex-row` |
| `flex-col` explicit column direction | `flex` already defaults to column | `flex-col` → `flex` (optional) |
| `position: relative` is default | No default positioning | May need explicit `relative` |
| `box-sizing: border-box` default | Different box model | Check padding/border interactions |
| `overflow: visible` default | `overflow: hidden` default | May need `overflow-visible` |

**Color System**:
The UI library uses CSS custom properties defined in `dark.css` for theming:
- Background colors: `--background-100` through `--background-500`
- Foreground colors: `--foreground`, `--foreground-100` through `--foreground-400`
- Translucent variants: `--translucent-dark-*` and `--translucent-light-*`
- Spacer color: `--spacer-100`

These map to Tailwind classes like:
- `bg-background-100`, `bg-background-200`, etc.
- `text-foreground`, `text-foreground-200`, etc.
- `bg-translucent-dark-100`, `bg-translucent-light-150`, etc.

### 2. Snapshot Update Tool
```bash
# Update all snapshots
node scripts/update-snapshots.js

# Update specific component snapshots
node scripts/update-snapshots.js achievement
node scripts/update-snapshots.js button
node scripts/update-snapshots.js "activities.*card"
```

### 3. Visual Comparison Tool
```bash
# Compare specific snapshots
node scripts/visual-comparison.js achievement
node scripts/visual-comparison.js button

# List all available snapshots
node scripts/visual-comparison.js --list

# Get help
node scripts/visual-comparison.js --help
```

## Migration Process

### Phase 1: Discovery and Assessment

#### Step 1: Identify Target Component
1. Open the UI library's `__image_snapshots__` directory
2. Browse available snapshots to identify components to migrate
3. Prioritize based on:
   - Component complexity
   - Usage frequency
   - Dependencies on other components

#### Step 2: Check Migration Status
```bash
# List all snapshots and their migration status
node scripts/visual-comparison.js --list
```

Look for:
- ✅ Components with matching snapshots (ready for comparison)
- ❌ Components missing in UI-native (need implementation)
- 🔶 UI-native only components (may need review)

### Phase 2: Component Implementation

#### Step 3: Analyze UI Component Structure
1. **Examine the UI component**:
   ```bash
   # Example: examining achievement card
   open ui/src/components/modules/activities/card/achievement-card.tsx
   ```

2. **Identify key elements**:
   - Props interface
   - Component structure
   - Styling approach (Tailwind classes with CSS custom properties)
   - Dependencies (icons, sub-components)
   - Theme integration (check dark.css for color definitions)

3. **Check the story file**:
   ```bash
   open ui/src/components/modules/activities/card/card.stories.tsx
   ```

#### Step 4: Implement UI-Native Component
1. **Create component structure**:
   ```bash
   # Create component directory if needed
   mkdir -p ui-native/components/modules/activities/card
   ```

2. **Implement the component**:
   - Keep most Tailwind classes using NativeWind (minimal conversion needed)
   - **Critical**: Convert `flex` to `flex-row` for horizontal layouts
   - Replace HTML elements with React Native equivalents
   - Ensure prop interfaces match exactly
   - Verify theme integration works with NativeWind

3. **Key conversion patterns with NativeWind**:
   ```typescript
   // HTML elements to React Native components
   <div> -> <View>
   <span> -> <Text>
   <p> -> <Text>
   <img> -> <Image>
   <button> -> <Pressable> or custom Button component
   
   // Tailwind class adjustments for React Native defaults
   // Web flex defaults to row, React Native defaults to column
   <div className="flex"> -> <View className="flex-row">
   <div className="flex-col"> -> <View className="flex"> (or <View className="flex-col">)
   
   // Most other classes remain the same
   <span className="text-sm"> -> <Text className="text-sm">
   <div className="bg-background-100"> -> <View className="bg-background-100">
   <div className="text-foreground"> -> <Text className="text-foreground">
   <div className="p-3"> -> <View className="p-3">
   <div className="gap-2"> -> <View className="gap-2">
   ```

4. **Import patterns**:
   ```typescript
   // IMPORTANT: Use subpath imports for utils
   // Web version (relative import)
   import { cn } from "@/utils";
   
   // React Native version (subpath import)
   import { cn } from "#utils";
   
   // This ensures proper path resolution in React Native
   // Configure in package.json:
   // "imports": {
   //   "#utils": "./src/utils/index.ts"
   // }
   ```

5. **React 19 Considerations**:
   ```typescript
   // IMPORTANT: forwardRef is not required in React 19
   // Old pattern (React 18 and below)
   export const Button = forwardRef<View, ButtonProps>((props, ref) => {
     // component implementation
   });
   
   // New pattern (React 19+)
   export const Button = (props: ButtonProps & { ref?: React.Ref<View> }) => {
     // component implementation with direct ref usage
   };
   
   // Do NOT use forwardRef when migrating to React 19
   // Refs are now regular props and don't need special handling
   ```

#### Step 5: Create Story File
1. **Copy and adapt the UI story**:
   ```typescript
   // Ensure story structure matches UI version exactly
   // IMPORTANT: Keep the same title as the UI version
   // Example: title: "Primitives/Icons" (not "Components/Icons")
   // Use same prop values and component arrangements
   // Replace web-specific elements with React Native equivalents
   ```

2. **Key story patterns**:
   ```typescript
   // Replace HTML elements with React Native equivalents
   // Keep most Tailwind classes unchanged (NativeWind handles conversion)
   // IMPORTANT: Convert flex to flex-row for horizontal layouts
   // Use same test data and prop combinations
   // Ensure className props work identically
   // Maintain exact story names and hierarchy from UI version
   ```

### Phase 3: Visual Verification

#### Step 6: Generate Initial Snapshot
```bash
# Generate snapshot for the new component
node scripts/update-snapshots.js [component-name]
```

#### Step 7: Perform Visual Comparison
```bash
# Compare with UI version
node scripts/visual-comparison.js [component-name]
```

**Expected outputs**:
- Static comparison image (side-by-side with red difference highlighting)
- Detailed analysis report
- Fix suggestions

#### Step 8: Analyze Results
Review the comparison results:

1. **Perfect Match (99.9%+ similarity)**:
   - ✅ Migration complete
   - Move to next component

2. **Very Close (99%+ similarity)**:
   - Minor tweaks needed
   - Focus on micro-differences

3. **Good Similarity (95%+ similarity)**:
   - Some differences to address
   - Check spacing, colors, sizing

4. **Significant Differences (<95% similarity)**:
   - Major fixes needed
   - Review component structure

### Phase 4: Iterative Fixing

#### Step 9: Address Differences
Based on the analysis, fix issues in order of impact:

1. **Dimension Mismatches**:
   - Check Tailwind class consistency, especially flex direction
   - Convert `flex` to `flex-row` for horizontal layouts
   - Verify NativeWind configuration
   - Ensure responsive breakpoints work correctly

2. **Color Differences**:
   - Verify theme integration with NativeWind
   - Check dark/light mode consistency
   - Ensure custom theme colors from dark.css are configured in tailwind.config.js
   - Verify CSS custom properties (--background-100, --foreground, etc.) are properly mapped

3. **Typography Issues**:
   - Check Tailwind typography classes (text-sm, font-bold, etc.)
   - Verify font configuration in NativeWind
   - Ensure text alignment classes work correctly

4. **Icon/Image Problems**:
   - Verify icon variants and sizes
   - Check image handling (URLs vs local)
   - Ensure sub-icon positioning with Tailwind classes

#### Step 10: Re-test After Each Fix
```bash
# Update snapshot after changes
node scripts/update-snapshots.js [component-name]

# Re-run comparison
node scripts/visual-comparison.js [component-name]
```

**Iteration Guidelines**:
- Make one logical change at a time
- Test after each change to track progress
- Focus on the red highlighted differences in the comparison image
- Focus on the most obvious differences first

#### Step 11: Fine-tuning
For the final 1-5% similarity gap:

1. **Check micro-differences**:
   - Anti-aliasing differences
   - Sub-pixel positioning
   - Font rendering variations

2. **Story-level adjustments**:
   - Gap between components in stories (using Tailwind classes)
   - Container sizing (using Tailwind width/height classes)
   - Background colors (using Tailwind bg-* classes)

3. **Platform-specific considerations**:
   - React Native vs Web rendering differences
   - Font availability and fallbacks
   - NativeWind configuration differences

### Phase 5: Validation and Documentation

#### Step 12: Final Validation
Once 99%+ similarity is achieved:

1. **Verify all story variants**:
   - Default state
   - Loading state
   - Error state
   - Interactive states

2. **Cross-platform testing**:
   - Test on different screen sizes
   - Verify theme switching (if applicable)

3. **Performance check**:
   - Ensure no performance regressions
   - Check bundle size impact

#### Step 13: Documentation
1. **Update component documentation**
2. **Add migration notes if needed**
3. **Update any relevant README files**

#### Step 14: Create Migration Commit
Once the component migration is complete and validated:

```bash
# Check current status
git status

# Add all changes
git add .

# Create commit with standardized message
git commit -m "Migrated [ComponentName]"

# Example commits:
git commit -m "Migrated Button"
git commit -m "Migrated ActivityCard"
git commit -m "Migrated TokenCard"
```

**Commit Guidelines**:
- Use the exact component name as it appears in the file/directory structure
- Keep the format consistent: "Migrated [ComponentName]"
- Include all related files (component, stories, tests) in a single commit
- Ensure the component passes all quality thresholds before committing

## Quality Thresholds

### Similarity Targets
- **Minimum Acceptable**: 95% similarity
- **Target**: 99% similarity  
- **Ideal**: 99.9%+ similarity (near-perfect match)

### Dimension Tolerances
- **Width**: Must match exactly (0px difference)
- **Height**: ±2px tolerance acceptable for minor rendering differences

### Color Accuracy
- **Theme colors**: Must match exactly
- **Computed colors**: ±1% tolerance for rendering differences

## Common Issues and Solutions

### 1. Background Color Mismatches
**Problem**: UI shows dark theme, UI-native shows light theme
**Solution**: 
- Check Storybook theme configuration
- Ensure ThemeProvider is correctly configured
- Force dark mode in preview.ts if needed

### 2. Height Differences
**Problem**: Components have different heights
**Solution**:
- Check gap values in story files
- Verify padding/margin consistency
- Ensure line-height matches

### 3. Icon Sizing Issues
**Problem**: Icons appear different sizes
**Solution**:
- Check icon variant props (solid vs outline)
- Verify size prop values
- Ensure icon container sizing matches

### 4. Font Rendering Differences
**Problem**: Text appears slightly different
**Solution**:
- Check font-weight values
- Verify font-size calculations
- Ensure line-height consistency

### 5. Spacing Inconsistencies
**Problem**: Gaps and padding don't match
**Solution**:
- Ensure Tailwind classes are identical between UI and UI-native
- Check NativeWind configuration for custom spacing values
- Verify flex properties work correctly with NativeWind

### 6. Flex Direction Mismatches
**Problem**: Components appear stacked vertically instead of horizontally
**Solution**:
- Change `className="flex"` to `className="flex-row"` for horizontal layouts
- Remember React Native defaults to column direction, web defaults to row
- Check all flex containers in the component
- Verify items-center and justify-center work with correct flex direction

### 7. NativeWind Configuration Issues
**Problem**: Tailwind classes not working as expected in React Native
**Solution**:
- Verify NativeWind is properly installed and configured
- Check that `tailwind.config.js` includes React Native file extensions
- Ensure CSS custom properties from `dark.css` are mapped to Tailwind tokens
- Verify color classes like `bg-background-100` and `text-foreground` work correctly
- Verify import statements include NativeWind setup

### 8. forwardRef Usage in React 19
**Problem**: TypeScript errors or warnings about forwardRef in React 19
**Solution**:
- Remove forwardRef wrapper completely
- Convert ref to a regular prop: `ref?: React.Ref<ComponentType>`
- Update component signature to accept ref as a normal prop
- Example conversion:
  ```typescript
  // Before (React 18)
  export const Icon = forwardRef<Svg, IconProps>((props, ref) => ...);
  
  // After (React 19)
  export const Icon = (props: IconProps & { ref?: React.Ref<Svg> }) => ...;
  ```

### 9. Inconsistent Story Titles
**Problem**: Visual comparison may not match if story titles differ between UI and UI-native
**Solution**:
- Always copy the exact title from the UI story
- Do not change the category hierarchy
- Examples:
  ```typescript
  // ✅ Correct - matches UI version
  title: "Primitives/Icons"
  
  // ❌ Wrong - different category
  title: "Components/Icons"
  
  // ❌ Wrong - different hierarchy
  title: "Icons"
  ```

## Automation Opportunities

### Future Enhancements
1. **Automated Migration Detection**: Script to identify components needing migration
2. **Batch Processing**: Process multiple components simultaneously
3. **Regression Testing**: Automated checks for similarity degradation
4. **CI Integration**: Include visual comparison in CI/CD pipeline

## Success Metrics

### Per Component
- Visual similarity ≥99%
- All story variants working
- No functional regressions
- Performance maintained

### Overall Project
- Migration completion percentage
- Average similarity score
- Time to migrate per component
- Number of iterations needed per component

## Workflow Summary

```bash
# 1. Discover and assess
pnpm screenshots:summary

# 2. Implement component (manual development)

# 3. Generate snapshot
pnpm screenshots:update [component-name]

# 4. Compare and analyze
pnpm screenshots:compare [component-name]

# 5. Fix and iterate
# (make changes, then repeat steps 3-4)

# 6. Validate final result
pnpm screenshots:compare [component-name]

# 7. Create migration commit
git add .
git commit -m "Migrated [ComponentName]"
```

## Best Practices

1. **Start Simple**: Begin with basic components before complex ones
2. **One Change at a Time**: Make incremental changes to track progress
3. **Use Tools**: Leverage the visual comparison for quick difference spotting
4. **Document Issues**: Keep notes on common problems and solutions
5. **Test Thoroughly**: Verify all component states and variants
6. **Maintain Quality**: Don't compromise on similarity thresholds
7. **Commit Regularly**: Create a commit after each successful component migration
8. **Track Progress**: Use consistent commit messages for easy progress tracking
9. **Leverage NativeWind**: Keep most Tailwind classes unchanged to maintain consistency
10. **Mind the Flex Direction**: Always convert `flex` to `flex-row` for horizontal layouts
11. **Verify Configuration**: Ensure NativeWind setup matches UI library configuration
12. **Use Subpath Imports**: Replace relative imports like `@/utils` with subpath imports like `#utils` for proper React Native path resolution
13. **Avoid forwardRef in React 19**: Since React 19 treats refs as regular props, do not use forwardRef when creating new components - use direct ref props instead
14. **Keep Storybook Titles Consistent**: Always use the exact same story title from the UI version (e.g., "Primitives/Icons" not "Components/Icons") to maintain consistency and proper categorization

## Conclusion

This systematic approach ensures high-quality, consistent migration of UI components to the React Native platform. By following this process and using the provided tools, we can achieve near-perfect visual parity while maintaining code quality and performance standards. The standardized commit format helps track migration progress and provides a clear history of completed work. 

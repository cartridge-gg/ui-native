# React Native UI Library

A comprehensive React Native component library that mirrors the web UI library, providing consistent design and functionality across platforms.

## Features

- 🎨 **Complete Component Coverage**: 200+ components across primitives, modules, and typography
- 📸 **Visual Testing**: Comprehensive screenshot generation and visual regression testing
- 🔄 **Platform Consistency**: Matches web UI library design and behavior
- 📱 **React Native Optimized**: Built specifically for React Native with proper performance
- 🎭 **Storybook Integration**: Full Storybook support for development and testing

## Quick Start

### Installation
```bash
# Install dependencies
pnpm install

# Start Storybook for development
pnpm storybook

# Start React Native development
pnpm start
```

### Screenshot Generation
```bash
# Generate screenshots for all components
pnpm screenshots:generate

# Update existing screenshot baselines
pnpm screenshots:update

# View visual comparisons
open visual-comparisons/index.html
```

## Component Categories

### Primitives (150+ components)
- **Form Controls**: Button, Input, Checkbox, Select, Toggle, etc.
- **Layout**: Card, Modal, Tabs, Accordion, Separator, etc.
- **Feedback**: Alert, Toast, Progress, Skeleton, etc.
- **Navigation**: Breadcrumb, Dropdown Menu, Popover, Tooltip, etc.

### Modules (15+ components)
- **Activities**: Activity cards with game, achievement, and token states
- **Collectibles**: Asset cards and collectible displays
- **Tokens**: Token cards with value and state management

### Typography (5+ components)
- **Text**: Comprehensive text component with variants and styling

## Development

### Storybook Development
```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

### Testing
```bash
# Run visual tests
pnpm test:storybook

# Update visual baselines
pnpm test:storybook:update
```

### Linting and Formatting
```bash
# Lint code
pnpm lint

# Format code
pnpm format
```

## Screenshot System

The library includes a comprehensive screenshot generation system that:

- Captures all 203 Storybook stories automatically
- Generates visual comparisons between React Native and Web versions
- Provides visual regression testing capabilities
- Matches the web UI library's testing approach

See [SCREENSHOT_GENERATION.md](./SCREENSHOT_GENERATION.md) for detailed documentation.

### Quick Screenshot Commands
```bash
pnpm screenshots:generate  # Generate all screenshots
pnpm screenshots:update    # Update baselines
pnpm screenshots:clean     # Generate without cleanup
```

## Visual Comparisons

The system generates comprehensive visual comparison reports showing:
- Migration progress (46/142 components migrated)
- Side-by-side React Native vs Web comparisons
- Platform-specific rendering differences
- Component categorization and organization

Access reports at: `visual-comparisons/index.html`

## Project Structure

```
ui-native/
├── components/                 # React Native components
│   ├── primitives/            # Basic UI primitives
│   ├── modules/               # Complex component modules
│   └── typography/            # Text and typography components
├── __image_snapshots__/       # Generated screenshots (203 files)
├── visual-comparisons/        # Visual comparison reports
├── .storybook/               # Storybook configuration
├── scripts/                  # Build and utility scripts
└── docs/                     # Documentation
```

## Migration Status

Current migration progress from web UI library:
- **46/142 components** migrated (32%)
- **33 component categories** covered
- **203 visual tests** with screenshot coverage
- **26 visual comparisons** available

## Platform Differences

The React Native version maintains design consistency while adapting to platform-specific:
- Font rendering and typography
- Touch interactions and gestures
- Animation and transition systems
- Layout and spacing calculations

These differences are expected and documented in the visual comparison reports.

## Contributing

1. **Component Development**: Follow the existing patterns in `components/`
2. **Story Creation**: Add Storybook stories for all new components
3. **Visual Testing**: Run screenshot generation after changes
4. **Documentation**: Update relevant documentation files

### Adding New Components
1. Create component in appropriate category (`primitives/`, `modules/`, etc.)
2. Add comprehensive Storybook stories
3. Run `pnpm screenshots:generate` to capture visuals
4. Update documentation as needed

## Scripts Reference

| Script | Description |
|--------|-------------|
| `pnpm storybook` | Start Storybook development server |
| `pnpm build-storybook` | Build Storybook for production |
| `pnpm screenshots:generate` | Generate all component screenshots |
| `pnpm screenshots:update` | Update screenshot baselines |
| `pnpm test:storybook` | Run visual regression tests |
| `pnpm lint` | Lint codebase |
| `pnpm format` | Format codebase |

## Documentation

- [Screenshot Generation](./SCREENSHOT_GENERATION.md) - Comprehensive screenshot system documentation
- [Visual Comparison Complete](./VISUAL_COMPARISON_COMPLETE.md) - Migration and comparison status
- [Migration Summary](./MIGRATION_SUMMARY.md) - Component migration details

## Configuration

Check the following configuration files:
- `vite.config.ts` - Vite configuration for React Native Web
- `.storybook/` - Storybook configuration and test runner
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Scripts and dependencies

## License

This project is part of the Cartridge UI ecosystem.

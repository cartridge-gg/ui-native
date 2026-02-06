# Repository Guidelines

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `bun start` - Starts Expo development server for React Native
- `bun android` - Launch Android development build
- `bun ios` - Launch iOS development build  
- `bun web` - Launch web version using React Native Web
- `bun prebuild` - Generate native platform code (iOS/Android)

### Component Development

- `bun storybook` - Launches Storybook development server on port 6006
- `bun build-storybook` - Builds Storybook for production

### Testing & Quality Assurance

- `bun test:storybook` - Runs visual regression tests against Storybook
- `bun test:storybook:update` - Updates visual regression test baselines
- `bun screenshots:generate` - Generates screenshots for all 203+ components
- `bun screenshots:update` - Updates screenshot baselines
- `bun screenshots:clean` - Generates screenshots without cleanup

### Code Quality

- `bun lint` - Runs Biome linting and formatting checks
- `bun format` - Applies Biome formatting automatically

## Architecture Overview

### Project Purpose

This is a **React Native UI component library** that mirrors the web UI library, providing consistent design and functionality across platforms. It serves as the mobile companion to the Cartridge web UI ecosystem.

### Component Structure

**Core Categories:**

- **`components/primitives/`** - 150+ basic UI primitives (Button, Input, Card, Modal, etc.)
- **`components/modules/`** - 15+ complex component modules (Activities, Collectibles, Tokens, Achievements)
- **`components/typography/`** - 5+ text and typography components
- **`components/layout/`** - Layout system components (Container, Header, Footer)
- **`components/icons/`** - Icon system with categories:
  - `badge/` - Achievement and ranking icons
  - `brand/` - Company and platform logos
  - `brand-color/` - Colored brand variants
  - `directional/` - Navigation and arrow icons
  - `state/` - Status and action icons

### Technology Stack

- **Framework**: Expo SDK 53+ with React Native 0.79+
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Development**: TypeScript, Storybook, Biome (linting/formatting)
- **Visual Testing**: Playwright screenshot generation and comparison
- **Build System**: Metro bundler, PostCSS, Babel

### Platform Support

- **Mobile**: iOS and Android native applications
- **Web**: React Native Web for browser compatibility
- **Cross-platform**: Consistent design system across all platforms

### Component Migration Status

**Current Progress:**
- **46/142 components migrated** (32% complete)
- **203 visual tests** with comprehensive screenshot coverage
- **33 component categories** implemented
- **26 visual comparisons** between React Native and Web versions

### Visual Testing System

The repository includes a comprehensive visual testing infrastructure:

- **Screenshot Generation**: Automated capture of all Storybook stories
- **Visual Regression Testing**: Comparison between React Native and Web versions
- **Platform Difference Tracking**: Expected differences between platforms documented
- **Baseline Management**: Update and maintain visual test baselines

### Development Workflow

1. **Component Development**: Build components in appropriate category directories
2. **Storybook Stories**: Create comprehensive stories for all component states
3. **Visual Testing**: Generate screenshots to capture visual changes
4. **Platform Testing**: Test across iOS, Android, and Web platforms
5. **Migration Tracking**: Update progress in visual comparison reports

### Key Integration Points

- **Expo Ecosystem**: Deep integration with Expo SDK and tooling
- **Design System**: Maintains consistency with web UI library
- **Visual Parity**: Cross-platform design consistency with documented differences
- **Build Pipeline**: Automated screenshot generation and visual regression testing
- **Documentation**: Comprehensive component documentation via Storybook

## Claude Code Workflow Guidelines

### Code Quality Requirements

- **Always run linting** before committing: `bun lint`
- **TypeScript compliance** - All TypeScript errors must be resolved
- **Visual testing** - Run `bun screenshots:generate` after component changes
- **Cross-platform testing** - Verify components work on iOS, Android, and Web

### Common Development Tasks

**Working with Components:**

- After modifying components, run `bun storybook` to verify visually
- Generate new screenshots with `bun screenshots:generate`
- Update baselines with `bun screenshots:update` if changes are intentional
- Check visual comparisons in `visual-comparisons/index.html`

**Adding New Components:**

- Follow existing patterns in `components/primitives/` or `components/modules/`
- Create comprehensive Storybook stories covering all states and variants
- Add TypeScript definitions and proper prop interfaces
- Generate screenshots and update visual comparison reports
- Update migration tracking documentation

**Platform-Specific Considerations:**

- **iOS/Android**: Test native interactions (touch, gestures, haptics)
- **Web**: Ensure React Native Web compatibility
- **Typography**: Account for platform font rendering differences
- **Animations**: Use React Native Reanimated for cross-platform animations

**Visual Testing Workflow:**

1. Make component changes
2. Run `bun storybook` to preview changes
3. Run `bun screenshots:generate` to capture new visuals
4. Review generated comparisons in `visual-comparisons/`
5. Update baselines if changes are intentional

### Testing Strategy

- **Visual Regression**: Comprehensive screenshot testing via Playwright
- **Cross-Platform**: Testing across iOS, Android, and Web platforms  
- **Component Isolation**: Storybook stories for individual component testing
- **Migration Tracking**: Visual comparison reports between React Native and Web

### Key Files to Check When Making Changes

- `components/index.ts` - Main component exports
- `components/theme/` - Theme and design token definitions
- `components/utils/cn.ts` - Utility functions for styling
- `package.json` - Dependencies and development scripts
- `app.json` - Expo configuration
- `tailwind.config.js` - Tailwind/NativeWind configuration
- `metro.config.js` - Metro bundler configuration

### Migration from Web UI

When migrating components from the web UI library:

1. **Analyze Web Component**: Understand the web implementation patterns
2. **Adapt for React Native**: Convert web-specific elements to React Native equivalents
3. **Maintain Design Consistency**: Preserve visual design while adapting interactions
4. **Create Storybook Stories**: Match the web component's story coverage
5. **Generate Visual Comparisons**: Document expected platform differences
6. **Update Migration Tracking**: Record progress in migration documentation

### Platform Differences Documentation

Expected differences between React Native and Web versions:

- **Font Rendering**: Platform-specific text rendering variations
- **Touch Interactions**: Native touch vs mouse/keyboard interactions
- **Animations**: Platform-optimized animation implementations
- **Layout**: Minor spacing and sizing variations due to platform constraints

### Component Development Best Practices

- **TypeScript**: Use proper type definitions and interfaces
- **Accessibility**: Implement proper accessibility props and behavior
- **Performance**: Optimize for mobile performance and memory usage
- **Reusability**: Design components for maximum reusability across platforms
- **Documentation**: Provide clear prop documentation and usage examples

## Agent Tooling

- **Pre-commit hooks:** run `bin/setup-githooks` (configures `core.hooksPath` for this repo).

- **Source of truth:** `.agents/`.
- **Symlinks:** `CLAUDE.md` is a symlink to this file (`AGENTS.md`). Editor/agent configs should symlink skills from `.agents/skills`.
- **Skills install/update:**

```bash
npm_config_cache=/tmp/npm-cache npx -y skills add https://github.com/cartridge-gg/agents   --skill create-pr create-a-plan   --agent claude-code cursor   -y
```

- **Configs:**
  - `.agents/skills/` (canonical)
  - `.claude/skills` -> `../.agents/skills`
  - `.cursor/skills` -> `../.agents/skills`

## Code Review Invariants

- No secrets in code or logs.
- Keep diffs small and focused; avoid drive-by refactors.
- Add/adjust tests for behavior changes; keep CI green.
- Prefer check-only commands in CI (`format:check`, `lint:check`) and keep local hooks aligned.
- For Starknet/Cairo/Rust/crypto code: treat input validation, authZ, serialization, and signature/origin checks as **blocking** review items.

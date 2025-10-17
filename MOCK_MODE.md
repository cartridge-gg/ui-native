# Mock Mode for Starknet Development

This project includes a mock mode for testing the UI of the connect flow without requiring actual blockchain connections.

## Setup

### 1. Enable Mock Mode

Create a `.env` file in the project root (or add to existing):

```bash
EXPO_PUBLIC_MOCK_STARKNET=true
```

### 2. Restart the Development Server

After adding the environment variable, restart your Expo development server:

```bash
bun start --clear
```

## Features

When mock mode is enabled:

- ✅ No real blockchain connection required
- ✅ Visual toggle control to switch between connected/disconnected states
- ✅ Customizable mock wallet addresses
- ✅ All UI components work as expected
- ✅ Console logs for debugging mock actions

### Mock Controls

In development mode, you'll see a floating control panel with:

- **Connection State Toggle**: Switch between connected/disconnected
- **Address Selection**: Quick buttons to test different address lengths
- **Status Indicator**: Shows current connection state

## Testing the Connect Flow

1. **Initial State**: Start with disconnected state
2. **Connect**: Click the "Connect" button in the header
3. **Enter Username**: Fill in any username on the connect screen
4. **Log In**: Press the "LOG IN" button
5. **Mock Connection**: The mock provider simulates connection after 500ms
6. **Connected State**: UI updates to show connected state with mock address

## Mock Implementation

The mock implementation includes:

- `useAccount()` - Returns mock account when connected
- `useConnect()` - Simulates connection with configurable delay
- `useDisconnect()` - Instantly disconnects the mock account
- `useProvider()` - Returns a mock provider interface

## Switching to Real Mode

To switch back to real Starknet connections:

1. Set `EXPO_PUBLIC_MOCK_STARKNET=false` in `.env` (or remove the line)
2. Restart the development server

## Implementation Details

### Files Created

- `src/utils/mock-starknet.tsx` - Mock provider and hook implementations
- `src/utils/starknet-provider.tsx` - Wrapper that switches between mock/real
- `src/components/mock-starknet-toggle.tsx` - Dev UI controls

### How It Works

The `StarknetProvider` component checks the environment variable and conditionally renders either:
- `MockStarknetProvider` - For testing UI
- `StarknetConfig` - For real blockchain connections

The mock provider maintains local state for:
- Connection status
- Mock wallet address
- Simulated async operations

## Tips

- Use mock mode for rapid UI development and testing
- Test both connected and disconnected states
- Verify UI handles different address lengths
- Check console logs to see what actions would be performed
- Switch to real mode before production testing

## Troubleshooting

**Mock controls not showing?**
- Ensure `EXPO_PUBLIC_MOCK_STARKNET=true` is set
- Check you're running in development mode (`__DEV__` is true)
- Restart the dev server after changing `.env`

**Still connecting to real Starknet?**
- Verify the environment variable is correctly set
- Check console logs for "🎭 Using MOCK Starknet Provider" message
- Clear Metro bundler cache: `bun start --clear`



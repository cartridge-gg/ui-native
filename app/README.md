### Arcade mobile app

### Development

```sh
bun i
bun start --tunnel 

# Scan QR code to run in Expo Go on your phone
```

### Building Artrifacts locally

```sh
brew install fastlane cocoapods

npx eas login

npx eas build \
    --local \
    --profile development \
    --platform ios \
    --output ./builds
```

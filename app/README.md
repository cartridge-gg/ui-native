# Cartridge Arcade (Mobile)

### Development

```sh
bun i
bun start --tunnel 

# Scan QR code to run in Expo Go on your phone
```

### Building Artrifacts locally

```sh
brew install fastlane cocoapods
bun add -g eas-cli

npx eas login

npx eas build \
    --local \
    --profile development \
    --platform ios \
    --output ./builds
```

### Register your Apple Device

In order to install iOS Adhoc build (development profile), you need to register your Apple device first.

Open [this link](https://expo.dev/accounts/cartridge/settings/apple-devices) on your device

or

Head to [Expo EAS website](https://expo.dev/accounts/cartridge/settings/apple-devices) to scan the QR code

### Install app

#### Development

Every PR push creates new build and uploades archives to Github Artifacts. It's available for 90 days.

#### Production

Push to main branch would trigger submittion to TestFlight.
Ask admin to add you as an internal tester on App Store Connect, or find the invitation link to external tester group.

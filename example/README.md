# Segment Appcues React Native Example App

This is a simple Android and iOS app built with React Native that integrates with the Appcues destination plugin for Segment.

## 🚀 Setup

Refer to https://reactnative.dev/docs/environment-setup for general React Native setup. This example project uses the React Native CLI.

```sh
# Install dependencies for the plugin. Only necessary because this is referenced locally by the example app.
# Ignore any TypeScript build errors, these are due to Segment and Appcues dependencies being peerDependencies.
yarn install

# Install dependencies for the example app.
cd ./example
yarn install

# Install CocoaPods
cd ./iOS
pod install
```

This example app requires you to have configured an Appcues Mobile destination for your app source in the [Segment dashboard](https://app.segment.com/). The Segment React Native SDK is then initialized with the write key that is tied to this source. Once the configuration is completed, analytics sent to Segment will automatically be forwarded through to Appcues.

```sh
# Run the app for Android
yarn android

# Run the app for iOS
yarn ios
```

## ✨ Functionality

The example app demonstrates the core functionality of the React Native Segment destination plugin for Appcues across 4 screens.

### Sign In Screen

This screen is identified as `Sign In` for screen targeting.

Provide a User ID for use with `identify()`.

### Events Screen

This screen is identified as `Trigger Events` for screen targeting.

Two buttons demonstrate `track()` calls.

The navigation bar also includes a button to launch the Appcues in-app debugger with `Appcues.debug()`.

### Profile Screen

This screen is identified as `Update Profile` for screen targeting.

Textfields are included to update the profile attributes for the current user using `identify()`.

The navigation bar also includes a button to sign out and navigate back to the Sign In Screen along with calling `reset()`.

### Group Screen

This screen is identified as `Update Group` for screen targeting.

A textfield is included to set the group for the current user using `group()`.

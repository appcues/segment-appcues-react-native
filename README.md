# @appcues/segment-react-native

`DestinationPlugin` for [Appcues](https://www.appcues.com/). Wraps [`@appcues/react-native`](https://github.com/appcues/appcues-react-native-module).

## Installation

You need to install the `@appcues/segment-react-native` and the `@appcues/react-native` dependency.

Using NPM:

```bash
npm install --save @appcues/segment-react-native @appcues/react-native
```

Using Yarn:

```bash
yarn add @appcues/segment-react-native @appcues/react-native
```

Run `pod install` after the installation to autolink the Appcues SDK.

See [Appcues React Native Module](https://github.com/appcues/appcues-react-native-module) for more details of this dependency.

## Usage

Follow the [instructions for adding plugins](https://github.com/segmentio/analytics-react-native#adding-plugins) on the main Analytics client:

In your code where you initialize the analytics client call the `.add(plugin)` method with an `AppcuesPlugin` instance:

```ts
import { createClient } from '@segment/analytics-react-native';

import { AppcuesPlugin } from '@appcues/segment-react-native';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY',
});

segmentClient.add({ plugin: new AppcuesPlugin() });
```

You can optionally pass configuration options to the plugin that will be forwarded to the underlying `@appcues/react-native` SDK during initialization. For example, to configure for EU data residency:

```ts
segmentClient.add({
  plugin: new AppcuesPlugin({
    apiHost: 'https://api.eu.appcues.net',
    settingsHost: 'https://fast.eu.appcues.com',
  }),
});
```

## Supporting Builder Preview and Screen Capture

During installation, follow the steps outlined in in the Appcues React Native Module documentation for [Configuring the Appcues URL Scheme](https://github.com/appcues/appcues-react-native-module/blob/main/docs/URLSchemeConfiguring.md). This is necessary for the complete Appcues builder experience, supporting experience preview, screen capture and debugging.

## Support

Please use Github issues, Pull Requests, or feel free to reach out to our [support team](support@appcues.com).

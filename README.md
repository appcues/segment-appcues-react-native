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
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new AppcuesPlugin() });
```

## Support

Please use Github issues, Pull Requests, or feel free to reach out to our [support team](support@appcues.com).

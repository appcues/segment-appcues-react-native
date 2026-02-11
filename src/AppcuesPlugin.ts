import {
  DestinationPlugin,
  PluginType,
  type TrackEventType,
  type ScreenEventType,
  type SegmentAPISettings,
  type UpdateType,
  type IdentifyEventType,
  type GroupEventType,
} from '@segment/analytics-react-native';
import type { AppcuesPluginOptions, SegmentAppcuesSettings } from './types';
import * as Appcues from '@appcues/react-native';

export class AppcuesPlugin extends DestinationPlugin {
  type = PluginType.destination;
  key = 'Appcues Mobile';

  private isInitialized: boolean = false;
  private options: AppcuesPluginOptions;

  constructor(options?: AppcuesPluginOptions) {
    super();
    this.options = options ?? {};
  }

  async update(settings: SegmentAPISettings, _: UpdateType) {
    if (this.isInitialized) {
      return;
    }

    const appcuesSettings = settings.integrations[
      this.key
    ] as SegmentAppcuesSettings;

    if (appcuesSettings === undefined) {
      return;
    }

    Appcues.setup(appcuesSettings.accountId, appcuesSettings.applicationId, {
      ...this.options,
      additionalAutoProperties: {
        _segmentVersion: require('@segment/analytics-react-native/package.json')
          .version,
      },
    }).then(() => {
      this.isInitialized = true;
    });
  }

  identify(event: IdentifyEventType) {
    if (this.isInitialized && event.userId != null) {
      Appcues.identify(event.userId, event.traits);
    }
    return event;
  }

  track(event: TrackEventType) {
    if (this.isInitialized) {
      Appcues.track(event.event, event.properties);
    }
    return event;
  }

  screen(event: ScreenEventType) {
    if (this.isInitialized) {
      Appcues.screen(event.name, event.properties);
    }
    return event;
  }

  group(event: GroupEventType) {
    if (this.isInitialized) {
      Appcues.group(event.groupId, event.traits);
    }
    return event;
  }

  reset(): void {
    if (this.isInitialized) {
      Appcues.reset();
    }
  }
}

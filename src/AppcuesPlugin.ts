import {
    DestinationPlugin,
    PluginType,
    TrackEventType,
    ScreenEventType,
    SegmentAPISettings,
    UpdateType,
    IdentifyEventType,
    GroupEventType
  } from '@segment/analytics-react-native';
  import type { SegmentAppcuesSettings } from './types';
  import * as Appcues from '@appcues/react-native';
  
export class AppcuesPlugin extends DestinationPlugin {    
    type = PluginType.destination;
    key = 'Appcues Mobile';

    private isInitialized: boolean = false;
  
    async update(settings: SegmentAPISettings, _: UpdateType) {
        if (this.isInitialized) {
            return
        }
       
        const appcuesSettings = settings.integrations[
            this.key
        ] as SegmentAppcuesSettings;
  
        if (appcuesSettings === undefined) {
            return;
        }

        Appcues.setup(appcuesSettings.accountId, appcuesSettings.applicationId)
            .then(() => { this.isInitialized = true; });

        // TODO: once the 3.0.0 react native plugin is released, apply the additionalAutoProperties
        //       here to denote in the data which usage is from this segment plugin
        //
        // Appcues.setup(appcuesSettings.accountId, appcuesSettings.applicationId, {
        //     additionalAutoProperties: {
        //         _segmentVersion: require('@segment/analytics-react-native/package.json').version
        //     }            
        // }).then(() => { this.isInitialized = true; });
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
            Appcues.reset()
        }
    }
}

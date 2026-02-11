export type SegmentAppcuesSettings = {
  accountId: string;
  applicationId: string;
};

/**
 * Optional configuration for the Appcues plugin, passed to the
 * underlying @appcues/react-native SDK during initialization.
 */
export type AppcuesPluginOptions = {
  /** Enable SDK debug logging. */
  logging?: boolean;
  /** Override the default Appcues API host (e.g. for EU data residency). */
  apiHost?: string;
  /** Override the default Appcues settings host (e.g. for EU data residency). */
  settingsHost?: string;
  /** Session timeout in seconds. */
  sessionTimeout?: number;
  /** Maximum number of activity items to store locally. */
  activityStorageMaxSize?: number;
  /** Maximum age (in seconds) of locally stored activity items. */
  activityStorageMaxAge?: number;
  /** Enable text scaling based on device accessibility settings. */
  enableTextScaling?: boolean;
  /** Enable the step recovery observer for recovering from failed step transitions. */
  enableStepRecoveryObserver?: boolean;
};

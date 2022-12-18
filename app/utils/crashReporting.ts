import Config from '@/config';
import * as Sentry from '@sentry/react-native';
import CodePush, { LocalPackage } from 'react-native-code-push';

import { Application } from './application';
import { Device } from './device';

/**
 *  This is where you put your crash reporting service initialization code to call in `./app/app.tsx`
 */
export const initCrashReporting = async () => {
  let updateMetadata: LocalPackage | undefined;
  try {
    updateMetadata = await CodePush.getUpdateMetadata();
  } catch {}
  const dist = updateMetadata?.label ?? '0';

  Sentry.init({
    debug: __DEV__,
    dsn: Config.sentry.dsn,
    release: `${Application.bundleId}@${Application.version}(${Application.buildNumber})+codepush:${dist}`,
    dist,
    tracesSampleRate: Config.sentry.tracesSampleRate,
  });

  const freeDiskStorage = await Device.getFreeDiskStorage();

  Sentry.setContext('deviceExtra', {
    arch: Device.supportedCpuArchitectures,
    freeDiskStorage,
  });

  Sentry.setContext('appExtra', {
    dynamicUpdateLabel: updateMetadata?.label,
  });
};

/**
 * Error classifications used to sort errors on error reporting services.
 */
export enum ErrorType {
  /**
   * An error that would normally cause a red screen in dev
   * and force the user to sign out and restart.
   */
  FATAL = 'Fatal',
  /**
   * An error caught by try/catch where defined using Reactotron.tron.error.
   */
  HANDLED = 'Handled',
}

/**
 * Manually report a handled error.
 */
export const reportException = (
  error: any,
  type: ErrorType = ErrorType.FATAL,
  extra?: Record<string, any>,
) => {
  error.message = `[${type}] ${error.message || 'Unknown'}`;
  if (__DEV__) {
    console.error(error);
  } else {
    error.message = `[${type}] ${error.message}`;
    Sentry.captureException(error, { extra });
  }
};

// import Config from '@/config';
// import * as Sentry from '@sentry/react-native';

// import { Device } from './device';

export const initCrashReporting = () => {
  // Sentry.init({
  //   debug: __DEV__,
  //   dsn: Config.sentry.dsn,
  //   tracesSampleRate: Config.sentry.tracesSampleRate,
  //   maxBreadcrumbs: 20,
  // });
  // Sentry.setUser({ id: Device.uniqueId });
  // Sentry.setTag('device_name', Device.modelName);
};

type ErrorType = 'fatal' | 'error' | 'warning';

/**
 * Manually report a handled error.
 */
export const reportException = ({
  error,
  message,
  level = 'error',
  extra,
}: {
  error?: Error;
  message?: string;
  level?: ErrorType;
  extra?: Record<string, any>;
}) => {
  const _error = error || new Error(message);
  _error.message = `[${level}] ${_error.message || 'Unknown'}`;
  if (__DEV__) {
    console.error(_error);
  } else {
    // Sentry.captureException(_error, {
    //   extra: {
    //     customMessage: message,
    //     ...extra,
    //   },
    //   level,
    // });
  }
};

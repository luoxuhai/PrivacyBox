import Config from '@/config';
import * as Sentry from '@sentry/react-native';

import { Application } from './application';

export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

export const initCrashReporting = () => {
  Sentry.init({
    debug: __DEV__,
    dsn: Config.sentry.dsn,
    release: `${Application.bundleId}@${Application.version}(${Application.buildNumber})+codepush:${Config.dist}`,
    dist: Config.dist,
    tracesSampleRate: Config.sentry.tracesSampleRate,
    integrations: [
      new Sentry.ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
  });
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
    Sentry.captureException(_error, {
      extra: {
        customMessage: message,
        ...extra,
      },
      level,
    });
  }
};

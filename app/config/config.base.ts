export interface ConfigBaseProps {
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
  exitRoutes: string[];
  /** 兔小巢 */
  TXC_FEEDBACK_URL: string;
  /** Sentry */
  sentry: {
    dsn: string;
    tracesSampleRate: number;
  };
}

export type PersistNavigationConfig = ConfigBaseProps['persistNavigation'];

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: 'dev',

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: 'always',

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ['Welcome'],

  TXC_FEEDBACK_URL: 'https://support.qq.com/product/334350',

  sentry: {
    dsn: 'https://d04bc938d0934611b16c70c75a8f20d5@o264285.ingest.sentry.io/6139676',
    tracesSampleRate: 0.5,
  },
};

export default BaseConfig;

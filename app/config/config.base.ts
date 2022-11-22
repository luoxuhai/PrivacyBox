export interface ConfigBaseProps {
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
  exitRoutes: string[];
  email: string;
  qqGroup: string;
  appId: string;
  appStoreUrl: {
    cn: string;
    global: string;
    urlSchema: string;
  };
  /** 兔小巢 */
  TXC_FEEDBACK_URL: string;
  /** Sentry */
  sentry: {
    dsn: string;
    tracesSampleRate: number;
  };

  /** 隐私政策 */
  privacyPolicy: {
    zh_cn: string;
    en_us: string;
  };

  /** 用户协议 */
  userAgreement: {
    zh_cn: string;
    en_us: string;
  };

  /** 更新日志 */
  changelog: {
    zh_cn: string;
    en_us: string;
  };
}

export type PersistNavigationConfig = ConfigBaseProps['persistNavigation'];

const appId = '1597534147';

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

  email: 'darkce97@gmail.com',
  qqGroup: '168380697',

  appId,
  appStoreUrl: {
    cn: `https://apps.apple.com/cn/app/id${appId}`,
    global: `https://apps.apple.com/app/id${appId}`,
    urlSchema: `itms-apps://itunes.apple.com/app/id${appId}`,
  },

  sentry: {
    dsn: 'https://d04bc938d0934611b16c70c75a8f20d5@o264285.ingest.sentry.io/6139676',
    tracesSampleRate: 0.5,
  },

  /** 隐私政策 */
  privacyPolicy: {
    zh_cn:
      'https://privatespace-4gagcjdu022008e0-1258504012.tcloudbaseapp.com/zh-cn/privacy-policy.html',
    en_us: 'https://private-space-web.netlify.app/en-us/privacy-policy',
  },

  /** 用户协议 */
  userAgreement: {
    zh_cn:
      'https://privatespace-4gagcjdu022008e0-1258504012.tcloudbaseapp.com/zh-cn/user-agreement.html',
    en_us: 'https://private-space-web.netlify.app/en-us/user-agreement',
  },

  /** 更新日志 */
  changelog: {
    zh_cn:
      'https://privatespace-4gagcjdu022008e0-1258504012.tcloudbaseapp.com/zh-cn/changelog.html',
    en_us: 'https://private-space-web.netlify.app/en-us/changelog',
  },
};

export default BaseConfig;

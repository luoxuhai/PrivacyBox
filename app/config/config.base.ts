const appId = '1597534147';

interface IBaseConfig {
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';
  productId: string;
  groupIdentifier: string;
  iCloudContainerIdentifier: string;
  TXC_FEEDBACK_URL: string;
  email: string;
  qqGroup: string;
  appId: string;
  appStoreUrl: {
    cn: string;
    global: string;
    urlSchema: string;
  };
  sentry: {
    dsn: string;
    tracesSampleRate: number;
  };
  privacyPolicy: {
    zh_cn: string;
    en_us: string;
  };
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

const BaseConfig: IBaseConfig = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: 'dev',

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: 'always',

  productId: 'net.darkce.privatespace_2',

  groupIdentifier: 'group.net.darkce.privatespace',

  iCloudContainerIdentifier: 'iCloud.net.darkce.privatespace',

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

export type PersistNavigationConfig = IBaseConfig['persistNavigation'];

export default BaseConfig;

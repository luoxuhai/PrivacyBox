import { appId, dist } from '../../app.json';

interface IBaseConfig {
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';
  productId: string;
  groupIdentifier: string;
  iCloudContainerIdentifier: string;
  TXC_FEEDBACK_URL: string;
  baseURL: string;
  email: string;
  qqGroup: string;
  appId: string;
  dist: string;
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

  baseURL: 'https://ps.fastools.cn',

  email: 'darkce97@gmail.com',
  qqGroup: '168380697',

  appId,
  dist,
  appStoreUrl: {
    cn: `https://apps.apple.com/cn/app/id${appId}`,
    global: `https://apps.apple.com/app/id${appId}`,
    urlSchema: `itms-apps://itunes.apple.com/app/id${appId}`,
  },

  sentry: {
    dsn: 'https://cd90588a06004ec398afa1c15e9c5275@o264285.ingest.sentry.io/4504497505107968',
    tracesSampleRate: 0.5,
  },

  /** 隐私政策 */
  privacyPolicy: {
    zh_cn: 'https://private-space-web.netlify.app/zh-cn/privacy-policy',
    en_us: 'https://private-space-web.netlify.app/en-us/privacy-policy',
  },

  /** 用户协议 */
  userAgreement: {
    zh_cn: 'https://private-space-web.netlify.app/zh-cn/user-agreement',
    en_us: 'https://private-space-web.netlify.app/en-us/user-agreement',
  },

  /** 更新日志 */
  changelog: {
    zh_cn: 'https://private-space-web.netlify.app/zh-cn/changelog',
    en_us: 'https://private-space-web.netlify.app/en-us/changelog',
  },
};

export type PersistNavigationConfig = IBaseConfig['persistNavigation'];

export default BaseConfig;

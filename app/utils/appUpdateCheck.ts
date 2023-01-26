import { Alert, Linking } from 'react-native';
import axios from 'axios';

import Config from '@/config';
import { t } from '@/i18n';
import { Application } from './application';
import { storage } from './storage';

const IGNORE_VERSION_KEY = 'IGNORE_VERSION';

export async function appUpdateCheck(): PVoid {
  const res = await axios.get(`https://itunes.apple.com/cn/lookup?id=${Config.appId}`);

  if (!res?.data?.results?.[0]) return;

  const { version: latestVersion, releaseNotes } = res.data.results[0];
  const localVersion = Application.version;
  const ignoreVersion = storage.get(IGNORE_VERSION_KEY, 'string');
  // 存在最新版
  if (compareVersion(latestVersion, localVersion ?? '') === 1 && latestVersion !== ignoreVersion) {
    Alert.alert(t('appUpdate.alert.title', { version: latestVersion }), releaseNotes, [
      {
        text: t('appUpdate.alert.ok'),
        style: 'default',
        onPress: () => {
          Linking.openURL(Config.appStoreUrl.urlSchema);
        },
      },
      {
        text: t('appUpdate.alert.cancel'),
        style: 'cancel',
        onPress: () => {
          storage.set(IGNORE_VERSION_KEY, latestVersion);
        },
      },
    ]);
  }
}

/**
 * @returns 0 相等; 1: 大于; 2: 小于
 */
export function compareVersion(version1: string, version2: string): number {
  const arr1 = version1?.split('.');
  const arr2 = version2?.split('.');
  // 获取最大数组长度
  const maxLen = arr1.length > arr2.length ? arr1.length : arr2.length;

  for (let i = 0; i < maxLen; i++) {
    // 转换数字
    const p1 = arr1[i] >> 0 || 0;
    const p2 = arr2[i] >> 0 || 0;
    if (p1 > p2) {
      return 1;
    } else if (p1 < p2) {
      return -1;
    }
  }
  return 0;
}

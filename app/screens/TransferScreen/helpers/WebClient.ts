import { unzip } from 'react-native-zip-archive';
import { downloadFile, exists, mkdir, unlink } from 'react-native-fs';

import { reportException, generateUUID, LocalPathManager } from '@/utils';
import { join } from '@/lib/path';
import { locale } from '@/i18n';

const HOME_DIR = 'wifi-transfer-web';
const WEB_CLIENT_URL = {
  cn: `https://private-space-storage.oss-cn-beijing.aliyuncs.com/web/${HOME_DIR}.zip`,
  us: `https://private-space-storage-us.oss-us-west-1.aliyuncs.com/web/${HOME_DIR}.zip`,
};
const TEMP_SAVE_PATH = join(LocalPathManager.tempPath, generateUUID());
const SAVE_PATH = join(LocalPathManager.assetPath, HOME_DIR);
const FILE_NAME = `${HOME_DIR}.zip`;

function getWebsiteUrl() {
  const { country } = locale;
  if (country === 'CN') {
    return WEB_CLIENT_URL.cn;
  } else {
    return WEB_CLIENT_URL.us;
  }
}

export default class WebClient {
  static path: string = SAVE_PATH;

  static async update(force?: boolean): PVoid {
    try {
      if (!force && (await exists(join(this.path, 'index.html')))) {
        return;
      }

      await mkdir(TEMP_SAVE_PATH);

      await downloadFile({
        fromUrl: getWebsiteUrl(),
        toFile: join(TEMP_SAVE_PATH, FILE_NAME),
        cacheable: true,
      }).promise;

      await LocalPathManager.createDirIfNotExists(LocalPathManager.assetPath);
      await unzip(join(TEMP_SAVE_PATH, FILE_NAME), LocalPathManager.assetPath, 'UTF-8');
      await unlink(TEMP_SAVE_PATH);
    } catch (error) {
      reportException({ error, message: '下载网页出错' });
    }
  }

  static async getPath(): Promise<string | null> {
    return (await exists(this.path)) ? this.path : null;
  }
}

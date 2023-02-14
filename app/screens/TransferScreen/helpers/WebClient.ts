import { unzip } from 'react-native-zip-archive';
import { downloadFile, exists, mkdir, unlink } from 'react-native-fs';

import { reportException, LocalPathManager } from '@/utils';
import { join } from '@/lib/path';
import { locale } from '@/i18n';

const HOME_DIR = 'wifi-transfer-web';
// 压缩文件名
const FILE_NAME = `${HOME_DIR}.zip`;
const WEB_CLIENT_URL = {
  cn: `https://private-space-storage.oss-cn-beijing.aliyuncs.com/web/${FILE_NAME}`,
  us: `https://private-space-storage-us.oss-us-west-1.aliyuncs.com/web/${FILE_NAME}`,
};
// 临时文件存放目录
const TEMP_SAVE_DIR = join(LocalPathManager.tempPath, HOME_DIR);

// 网站资源存放目录
const WEBSITE_DIR = join(LocalPathManager.assetPath, HOME_DIR);

function getWebsiteUrl() {
  const { country } = locale;
  if (country === 'CN') {
    return WEB_CLIENT_URL.cn;
  } else {
    return WEB_CLIENT_URL.us;
  }
}

export default class WebClient {
  static path: string = WEBSITE_DIR;

  static async update(force = false): PVoid {
    try {
      if (!force && (await exists(join(this.path, 'index.html')))) {
        return;
      }

      // 如果已经存在，先清空
      if (await exists(TEMP_SAVE_DIR)) {
        await unlink(TEMP_SAVE_DIR);
      }
      await mkdir(TEMP_SAVE_DIR);
      const archivePath = join(TEMP_SAVE_DIR, FILE_NAME);
      await downloadFile({
        fromUrl: getWebsiteUrl(),
        toFile: archivePath,
        cacheable: !force,
      }).promise;

      // 清理已经存在的资源
      if (await exists(WEBSITE_DIR)) {
        await unlink(WEBSITE_DIR);
      }
      await mkdir(WEBSITE_DIR);
      await unzip(archivePath, LocalPathManager.assetPath, 'UTF-8');
      unlink(TEMP_SAVE_DIR);
    } catch (error) {
      reportException({ error, message: '下载网页出错' });
    }
  }

  static async getPath(): Promise<string | null> {
    return (await exists(this.path)) ? this.path : null;
  }
}

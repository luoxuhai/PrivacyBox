import { exists, unlink, MainBundlePath, copyFile } from 'react-native-fs';

import { reportException, LocalPathManager } from '@/utils';
import { join } from '@/lib/path';

const HOME_DIR = 'wifi-transfer-web';

// 网站资源存放目录
const WEBSITE_DIR = join(LocalPathManager.assetPath, HOME_DIR);

export default class WebClient {
  static path: string = WEBSITE_DIR;

  static async update(): PVoid {
    try {
      // 清理已经存在的资源
      if (await exists(WEBSITE_DIR)) {
        await unlink(WEBSITE_DIR);
      }

      await copyFile(join(MainBundlePath, HOME_DIR), WEBSITE_DIR);
    } catch (error) {
      reportException({ error, message: '复制网页出错' });
    }
  }

  static async getPath(): Promise<string | null> {
    return (await exists(this.path)) ? this.path : null;
  }
}

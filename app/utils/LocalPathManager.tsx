import Config from '@/config';
import {
  LibraryDirectoryPath,
  TemporaryDirectoryPath,
  DocumentDirectoryPath,
  pathForGroupSync,
} from 'react-native-fs';
import { stat } from 'react-native-cloud-store';

import { APP_BASE_DIR } from '@/constants';

export class LocalPathManager {
  public static readonly groupPath = pathForGroupSync(Config.groupIdentifier);
  public static readonly libraryPath = LibraryDirectoryPath;
  public static readonly temporaryPath = TemporaryDirectoryPath;
  public static readonly documentPath = DocumentDirectoryPath;

  static get basePath() {
    return `${this.groupPath}/${APP_BASE_DIR}`;
  }

  static get dbPath() {
    return `${this.basePath}/db`;
  }

  // 图片/视频目录
  static get photoPath() {
    return `${this.basePath}/photos`;
  }

  // 图片/视频/其他文件目录
  static get filePath() {
    return `${this.basePath}/files`;
  }

  static get tempPath() {
    return `${this.temporaryPath}`;
  }

  static get logPath() {
    return `${this.basePath}/logs`;
  }

  static get staticPath() {
    return `${this.basePath}/assets`;
  }
}

console.log('[groupPath]', LocalPathManager.groupPath);
console.log('[LibraryDirectory]', LocalPathManager.libraryPath);

stat(LocalPathManager.groupPath).then(console.log);

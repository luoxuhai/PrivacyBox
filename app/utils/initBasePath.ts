import FS from 'react-native-fs';
import { LocalPathManager } from './LocalPathManager';

export async function initBasePath() {
  const options = {
    NSURLIsExcludedFromBackupKey: true,
  };

  await FS.mkdir(LocalPathManager.basePath, options);
  await FS.mkdir(LocalPathManager.tempPath, options);
  await FS.mkdir(LocalPathManager.logPath, options);
  await FS.mkdir(LocalPathManager.staticPath, options);
}

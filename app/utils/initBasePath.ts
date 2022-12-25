import FS from 'react-native-fs';
import { LocalPathManager } from './LocalPathManager';

export async function initBasePath() {
  await FS.mkdir(LocalPathManager.basePath, {
    NSURLIsExcludedFromBackupKey: true,
  });

  await FS.mkdir(LocalPathManager.tempPath, {
    NSURLIsExcludedFromBackupKey: true,
  });

  await FS.mkdir(LocalPathManager.logPath, {
    NSURLIsExcludedFromBackupKey: true,
  });
}

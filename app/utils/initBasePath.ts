import { mkdir } from 'react-native-fs';
import { LocalPathManager } from './LocalPathManager';

export async function initBasePath() {
  await mkdir(LocalPathManager.basePath, {
    NSURLIsExcludedFromBackupKey: true,
  });
}

import FS from 'react-native-fs';
import { LocalPathManager } from './LocalPathManager';

FS.mkdir(LocalPathManager.basePath, {
  NSURLIsExcludedFromBackupKey: true,
});

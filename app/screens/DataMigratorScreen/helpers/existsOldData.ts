import { exists } from 'react-native-fs';

import { LocalPathManager } from '@/utils';
import { join } from '@/lib/path';
import { DB_NAME } from '@/database/v1';

export function existsOldData() {
  return exists(join(LocalPathManager.libraryPath, 'LocalDatabase', DB_NAME));
}

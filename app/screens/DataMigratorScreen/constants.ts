import { LibraryDirectoryPath } from 'react-native-fs';

import { LocalPathManager } from '@/utils';
import { join } from '@/lib/path';
import { DB_NAME } from '@/database/v1';

export const OLD_DB_PATH = join(LocalPathManager.libraryPath, 'LocalDatabase', DB_NAME);

/** 根目录 */
export const ROOT_PATH = LibraryDirectoryPath;

/** 数据目录 */
export const DATA_PATH = ROOT_PATH + '/data';

/** 源文件目录 */
export const SOURCE_PATH = DATA_PATH + '/source';

import { useEffect } from 'react';
import FS from 'react-native-fs';
import BootSplash from 'react-native-bootsplash';

import { DB_NAME } from '@/database/v1';
import { navigate } from '@/navigators';
import { LocalPathManager, reportException } from '@/utils';
import { join } from '@/lib/path';

export function useDataMigrator(isReay: boolean) {
  useEffect(() => {
    if (!isReay) {
      return;
    }

    FS.exists(join(LocalPathManager.libraryPath, 'LocalDatabase', DB_NAME))
      .then((exist) => {
        if (exist) {
          navigate('DataMigrator');
        }
      })
      .catch((error) => {
        reportException({ error, message: '判断数据库文件是否存在出错', level: 'fatal' });
        throw error;
      })
      .finally(() => {
        BootSplash.hide({ fade: true, duration: 0 });
      });
  }, [isReay]);
}

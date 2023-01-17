import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { navigate } from '@/navigators';
import { reportException } from '@/utils';
import { existsOldData } from './helpers/existsOldData';

export function useDataMigrator(isReay: boolean) {
  useEffect(() => {
    if (!isReay) {
      return;
    }

    existsOldData()
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

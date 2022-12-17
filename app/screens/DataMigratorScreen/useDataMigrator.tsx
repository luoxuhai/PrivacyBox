import React, { useState, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import FS from 'react-native-fs';

import { DataBaseV1 } from '@/database/v1';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '@/navigators';
import { LocalPathManager } from '@/utils';

export function useDataMigrator() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [needMigrateData, setNeedMigrateData] = useState(false);

  useEffect(() => {
    if (needMigrateData) {
      navigate('DataMigrator');
    }
  }, [needMigrateData]);

  useEffect(() => {
    FS.exists(`${LocalPathManager.libraryPath}/LocalDatabase/${'DB_NAME'}`)
      .then((exist) => {
        if (!exist) {
          setNeedMigrateData(true);
        } else {
          setNeedMigrateData(false);
        }

        setIsInitialized(true);
      })
      .catch(() => {
        throw Error('[FS.exists] FS.exists error');
      });
  }, []);

  return {
    isInitialized,
    needMigrateData,
  };
}

import React, { useState, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import FS from 'react-native-fs';
import BootSplash from 'react-native-bootsplash';

import { DataBaseV1, DB_NAME } from '@/database/v1';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '@/navigators';
import { LocalPathManager } from '@/utils';

export function useDataMigrator(isReay: boolean) {
  useEffect(() => {
    if (!isReay) {
      return
    }

    FS.exists(join(LocalPathManager.libraryPath, 'LocalDatabase', DB_NAME))
      .then((exist) => {
        if (exist) {
          navigate('DataMigrator')
        }
      })
      .catch(() => {
        // 上报 
        throw Error('[FS.exists] FS.exists error');
      })
      .faliy(() => {
        BootSplash.hide({ fade: true, duration: 0 });
      })
  }, [isReay]);
}

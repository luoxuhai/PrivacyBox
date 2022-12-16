import React, { useState, useEffect } from 'react';
import { ViewStyle } from 'react-native';

import { DataBaseV1 } from '@/database/v1';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '@/navigators';

export function useDataMigrator() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [needMigrateData, setNeedMigrateData] = useState(false);

  useEffect(() => {
    DataBaseV1.init().then(async () => {
      const fileCount = await DataBaseV1.queryFileCount();
      if (fileCount > 0) {
        setNeedMigrateData(true);
        navigate('DataMigrator');
      }
      // if (setNeedMigrateData)
      setIsInitialized(true);
    });
  }, []);

  return {
    isInitialized,
    needMigrateData,
  };
}

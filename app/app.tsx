import 'react-native-get-random-values';
import './i18n';
import './utils/ignoreWarnings';
import './utils/consoleExtension';
import './utils/sheets';

import React, { useEffect } from 'react';
import { initBasePath } from './utils/initBasePath';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SheetProvider } from 'react-native-actions-sheet';

import { initCrashReporting, useUpdateEffect, lockOrientation, DynamicUpdate } from './utils';
import { initTask } from './utils/task/initTask';
import { useInitialRootStore } from './models';
import { useInitialDataSource } from './database/helpers/useInitDataSource';
import { AppNavigator, useNavigationPersistence, RootNavigation } from './navigators';
import { ErrorBoundary } from './screens/ErrorScreen/ErrorBoundary';
import { useDataMigrator } from './screens/DataMigratorScreen/useDataMigrator';
import { storage } from './utils/storage';
import Config from './config';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

const App = observer(() => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    initBasePath();
    initTask();

    // 线上环境
    if (!__DEV__) {
      lockOrientation();
      DynamicUpdate.timingSync();
      initCrashReporting();
    }
  }, []);

  const { rehydrated, rootStore } = useInitialRootStore();
  const { isInitialized } = useInitialDataSource();
  const isReay = rehydrated && isNavigationStateRestored && isInitialized;

  // 判断是否需要迁移
  useDataMigrator(isReay);

  useUpdateEffect(() => {
    if (rootStore.appLockStore.isLocked) {
      RootNavigation.navigate('AppLock');
    }
  }, [rootStore.appLockStore.isLocked]);

  useUpdateEffect(() => {
    if (!rootStore.appStateStore.inForeground && !rootStore.appLockStore.isLocked) {
      RootNavigation.navigate('AppMask');
    }
  }, [rootStore.appStateStore.inForeground]);

  if (!isReay) return null;
  
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <QueryClientProvider client={queryClient}>
          <SheetProvider>
            <AppNavigator
              {...(__DEV__
                ? {
                    initialState: initialNavigationState,
                    onStateChange: onNavigationStateChange,
                  }
                : {})}
            />
          </SheetProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

export default App;

import 'react-native-get-random-values';
import './i18n';
import './utils/ignoreWarnings';
import './utils/consoleExtension';
import './utils/sheets';

import React, { useEffect } from 'react';
import { InteractionManager } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SheetProvider } from 'react-native-actions-sheet';
import * as Sentry from '@sentry/react-native';

import {
  initCrashReporting,
  useUpdateEffect,
  DynamicUpdate,
  routingInstrumentation,
  Application,
} from './utils';
import { initTask } from './utils/task/initTask';
import { useInitialRootStore } from './models';
import { useInitialDataSource } from './database/helpers/useInitDataSource';
import {
  AppNavigator,
  useNavigationPersistence,
  RootNavigation,
  navigationRef,
} from './navigators';
import { ErrorBoundary } from './screens/ErrorScreen/ErrorBoundary';
import { useDataMigrator } from './screens/DataMigratorScreen/useDataMigrator';
import { storage } from './utils/storage';
import Config from './config';
import { AppMaskScreen } from './screens';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

const App = observer(() => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      initTask();

      // 线上环境
      if (!__DEV__) {
        DynamicUpdate.timingSync();
        if (Application.env === 'AppStore') {
          initCrashReporting();
        }
      }
    });
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
    if (
      !rootStore.appStateStore.inForeground &&
      !rootStore.appLockStore.isLocked &&
      !global.isPausePresentMask
    ) {
      rootStore.globalStore.setAppMaskVisible(true);
    } else {
      rootStore.globalStore.setAppMaskVisible(false);
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
              onReady={() => {
                // Register the navigation container with the instrumentation
                routingInstrumentation.registerNavigationContainer({ current: navigationRef });
              }}
            />
            <AppMaskScreen />
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

export default Sentry.wrap(App);

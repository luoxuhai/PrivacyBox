/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import './i18n';
import './utils/ignoreWarnings';
import './utils/consoleExtension';
import './utils/initBasePath';

import React, { useEffect } from 'react';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HoldMenuProvider } from 'react-native-hold-menu';
import { SheetProvider } from 'react-native-actions-sheet';

import { initCrashReporting, useUpdateEffect } from './utils';
import { useInitialRootStore } from './models';
import { useInitialDataSource } from './database/helpers/useInitDataSource';
import { AppNavigator, useNavigationPersistence, RootNavigation } from './navigators';
import { ErrorBoundary } from './screens/ErrorScreen/ErrorBoundary';
import { useDataMigrator } from './screens/DataMigratorScreen/useDataMigrator';
import { storage } from './storage';
import Config from './config';
import { useTheme } from './theme';
import './services/icloud/icloud';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

const App = observer(() => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const { isDark } = useTheme();

  useEffect(() => {
    if (!__DEV__) {
      initCrashReporting();
    }
  }, []);

  const { rehydrated, rootStore } = useInitialRootStore();
  const { isInitialized } = useInitialDataSource();
  const { isInitialized: x } = useDataMigrator();

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

  if (!rehydrated || !isNavigationStateRestored || !isInitialized) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <QueryClientProvider client={queryClient}>
          <HoldMenuProvider
            theme={isDark ? 'dark' : 'light'}
            paddingBottom={initialWindowMetrics.insets.bottom}
          >
            <SheetProvider>
              <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </SheetProvider>
          </HoldMenuProvider>
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

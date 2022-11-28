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

import React, { FC, useEffect } from 'react';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';

import { initCrashReporting, useUpdateEffect } from './utils';
import { useInitialRootStore } from './models';
import { AppNavigator, useNavigationPersistence, RootNavigation } from './navigators';
import { ErrorBoundary } from './screens/ErrorScreen/ErrorBoundary';
import { storage } from './storage';
import Config from './config';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

/**
 * This is the root component of our app.
 */
const App: FC = observer(() => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    if (!__DEV__) {
      initCrashReporting();
    }
  }, []);

  const { rehydrated, rootStore } = useInitialRootStore();

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

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isNavigationStateRestored) return null;

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppNavigator
        // initialState={initialNavigationState}
        // onStateChange={onNavigationStateChange}
        />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
});

export default App;

/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';

import { useStores } from '@/models';
import {
  AppLockScreen,
  DataMigratorScreen,
  HideApplicationsScreen,
  PhotosScreen,
  FakeAppHomeScreen,
  PurchaseScreen,
  AppMaskScreen,
  ChangeLockPasscodeScreen,
  ChangeLockPasscodeScreenParams,
  PhotosNavigatorParams,
  PhotoViewerScreen,
  VideoPlayerScreen,
  PhotoViewerScreenParams,
  VideoPlayerScreenParams,
  TransferScreen,
} from '@/screens';
import { ContentNavigator, ContentTabParamList } from './ContentNavigator';
import { navigationRef } from './navigationUtilities';
import { useTheme } from '@/theme';
import { translate } from '@/i18n';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  AppLock: undefined;
  ChangeLockPasscode: ChangeLockPasscodeScreenParams;
  AppMask: undefined;
  FakeAppHome: undefined;
  Content: NavigatorScreenParams<ContentTabParamList>;
  Purchase: typeof PurchaseScreen;
  Photos: PhotosNavigatorParams;
  PhotoViewer: PhotoViewerScreenParams;
  VideoPlayer: VideoPlayerScreenParams;
  Transfer: undefined;
  DataMigrator: undefined;
  HideApplications: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  const {
    settingsStore: { fakeHomeEnabled },
    appLockStore,
  } = useStores();
  const { isDark, colors } = useTheme();

  const initialRouteName = useMemo(() => {
    if (fakeHomeEnabled) {
      return 'FakeAppHome';
    }

    return appLockStore.passcode ? 'AppLock' : 'ChangeLockPasscode';
  }, [fakeHomeEnabled, appLockStore.passcode]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AppLock"
          component={AppLockScreen}
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="ChangeLockPasscode"
          component={ChangeLockPasscodeScreen}
          options={{
            presentation: 'fullScreenModal',
          }}
        />

        <Stack.Screen
          name="AppMask"
          component={AppMaskScreen}
          options={{
            animation: 'fade',
            autoHideHomeIndicator: true,
            gestureEnabled: false,
          }}
        />
      </Stack.Group>

      <Stack.Screen
        name="FakeAppHome"
        component={FakeAppHomeScreen}
        options={{
          title: translate('common.appName'),
          headerLargeTitle: true,
        }}
      />

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <Stack.Screen
          name="DataMigrator"
          component={DataMigratorScreen}
          options={{
            title: null,
            presentation: 'modal',
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Purchase"
          options={{
            title: null,
          }}
          component={PurchaseScreen}
        />
      </Stack.Group>

      <Stack.Screen
        name="Content"
        component={ContentNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Photos"
        options={{
          title: null,
          headerBackTitle: translate('albumsScreen.title'),
        }}
        component={PhotosScreen}
      />

      <Stack.Group
        screenOptions={{
          animation: 'fade',
          headerShown: false,
        }}
      >
        <Stack.Screen name="PhotoViewer" component={PhotoViewerScreen} />
        <Stack.Screen
          name="VideoPlayer"
          options={{
            animation: 'fade',
          }}
          component={VideoPlayerScreen}
        />
      </Stack.Group>

      <Stack.Screen
        name="Transfer"
        options={{
          title: translate('transferScreen.title'),
        }}
        component={TransferScreen}
      />

      <Stack.Screen
        name="HideApplications"
        options={{
          title: translate('hideApplicationsScreen.title'),
        }}
        component={HideApplicationsScreen}
      />
    </Stack.Navigator>
  );
});

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { colors, isDark } = useTheme();

  const theme: typeof DefaultTheme = useMemo(
    () => ({
      dark: isDark,
      colors: {
        primary: colors.palette.primary6,
        card: colors.background,
        background: colors.background,
        text: colors.label,
        border: colors.separator,
        notification: colors.palette.red,
      },
    }),
    [isDark],
  );

  return (
    <NavigationContainer ref={navigationRef} theme={theme} {...props}>
      <AppStack />
    </NavigationContainer>
  );
});

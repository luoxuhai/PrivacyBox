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

import Config from '@/config';
import { useStores } from '@/models'; // @demo remove-current-line
import { AppLockScreen } from '@/screens';
import { ContentNavigator, ContentTabParamList } from './ContentNavigator'; // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from './navigationUtilities';
import { useTheme } from '@/theme';
import { AppMaskScreen } from '@/screens/AppMaskScreen';
import { FakeAppHomeScreen } from '@/screens/FakeAppHomeScreen';
import { translate } from '@/i18n';
import {
  ChangeLockPasscodeScreen,
  ChangeLockPasscodeScreenParams,
} from '@/screens/AppLockSettingsScreen/ChangeLockPasscodeScreen';

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
  AppLock: typeof AppLockScreen;
  ChangeLockPasscode: ChangeLockPasscodeScreenParams;
  AppMask: typeof AppMaskScreen;
  FakeAppHome: typeof FakeAppHomeScreen;
  Content: NavigatorScreenParams<ContentTabParamList>;
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

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
    <Stack.Navigator initialRouteName={initialRouteName}>
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
            presentation: 'transparentModal',
            animation: 'fade',
            autoHideHomeIndicator: true,
          }}
        />
      </Stack.Group>

      <Stack.Screen
        name="FakeAppHome"
        component={FakeAppHomeScreen}
        options={{
          title: translate('common.appName'),
          headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
          headerTransparent: true,
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />

      <Stack.Screen
        name="Content"
        component={ContentNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { colors, isDark } = useTheme();

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  const theme: typeof DefaultTheme = useMemo(
    () => ({
      dark: isDark,
      colors: {
        primary: colors.palette.primary6,
        card: colors.background,
        background: isDark ? colors.background : colors.secondaryBackground,
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

import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { translate } from '@/i18n';
import {
  SettingScreen,
  AboutScreen,
  AppearanceScreen,
  DebugScreen,
  AppLockSettingsScreen,
  AdvancedSettingsScreen,
  UrgentSwitchScreen,
  FakeAppHomeSettingsScreen,
} from '@/screens';
import { useTheme } from '@/theme';
import { AppStackParamList } from './AppNavigator';

export type SettingStackParamList = {
  Settings: typeof SettingScreen;
  Appearance: typeof AppearanceScreen;
  About: typeof AboutScreen;
  Debug: typeof DebugScreen;
  AppLockSettings: typeof AppLockSettingsScreen;
  FakeAppHomeSettings: typeof FakeAppHomeSettingsScreen;
  AdvancedSettings: typeof AdvancedSettingsScreen;
  UrgentSwitch: typeof UrgentSwitchScreen;
} & AppStackParamList;

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

export const SettingNavigator: FC<StackScreenProps<SettingStackParamList>> = observer(() => {
  const { colors, isDark } = useTheme();

  return (
    <SettingStack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
        headerLargeStyle: {
          backgroundColor: isDark ? colors.background : colors.secondaryBackground,
        },
      }}
    >
      <SettingStack.Screen
        name="Settings"
        options={{
          title: translate('contentNavigator.settingsTab'),
          headerLargeTitle: true,
        }}
        component={SettingScreen}
      />
      <SettingStack.Screen
        name="Appearance"
        options={{
          title: translate('appearanceScreen.title'),
        }}
        component={AppearanceScreen}
      />
      <SettingStack.Screen
        name="About"
        options={{
          title: translate('aboutScreen.title'),
        }}
        component={AboutScreen}
      />
      <SettingStack.Screen
        name="AppLockSettings"
        options={{
          title: translate('appLockSettingsScreen.title'),
        }}
        component={AppLockSettingsScreen}
      />
      <SettingStack.Screen
        name="FakeAppHomeSettings"
        options={{
          title: translate('fakeAppHomeSettingsScreen.title'),
        }}
        component={FakeAppHomeSettingsScreen}
      />
      <SettingStack.Screen
        name="AdvancedSettings"
        options={{
          title: translate('advancedSettingsScreen.title'),
        }}
        component={AdvancedSettingsScreen}
      />
      <SettingStack.Screen
        name="UrgentSwitch"
        options={{
          title: translate('urgentSwitchScreen.title'),
        }}
        component={UrgentSwitchScreen}
      />

      <SettingStack.Group
        screenOptions={{
          presentation: 'modal',
          headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
          headerTransparent: true,
        }}
      >
        <SettingStack.Screen
          name="Debug"
          options={{
            title: translate('debugScreen.title'),
          }}
          component={DebugScreen}
        />
      </SettingStack.Group>
    </SettingStack.Navigator>
  );
});

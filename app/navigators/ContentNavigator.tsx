import React from 'react';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';

import { BlurView, BottomTabIcon } from '@/components';
import { translate } from '@/i18n';
import { spacing, typography, useTheme } from '@/theme';
import { AppStackParamList, AppStackScreenProps } from './AppNavigator';
import { SettingNavigator } from './SettingsNavigator';
import { AlbumsNavigator } from './AlbumsNavigator';
import { MoreFeatureNavigator } from './MoreFeatureNavigator';
import { FilesNavigator } from './FilesNavigator';
import { useStores } from '@/models';
import { BottomTabs } from '@/models/SettingsStore';
import { Device } from '@/utils';

export type ContentTabParamList = {
  Album: undefined;
  File: undefined;
  MoreFeature: undefined;
  Settings: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof ContentTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<ContentTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>;

const Tab = createBottomTabNavigator<ContentTabParamList>();

export const ContentNavigator = observer(function ContentNavigator() {
  const { bottom } = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const {
    settingsStore: { visibleBottomTabs },
    appLockStore,
    globalStore: { bottomTabVisible },
  } = useStores();
  const bottomTabDarkle = appLockStore.inFakeEnvironment && appLockStore.bottomTabDarkleWhenFake;

  const height = Device.isPad ? bottom + 54 : bottom + 52;
  const paddingTop = Device.isPad ? 0 : 14;
  const marginTop = Device.isPad ? 0 : spacing[3];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height,
          paddingTop,
          borderTopColor: colors.transparent,
          position: 'absolute',
          display: bottomTabVisible ? 'flex' : 'none',
        },
        tabBarActiveTintColor: colors.palette.primary6,
        tabBarInactiveTintColor: colors.secondaryLabel,
        tabBarLabelStyle: [
          $tabBarLabel,
          {
            marginTop,
          },
        ],
        tabBarBackground: () =>
          bottomTabDarkle ? (
            <BlurView blurType="materialDark" blurAmount={50} />
          ) : (
            <BlurView blurType={isDark ? 'materialDark' : 'materialLight'} blurAmount={10} />
          ),
      }}
    >
      {visibleBottomTabs.includes(BottomTabs.Album) && (
        <Tab.Screen
          name="Album"
          component={AlbumsNavigator}
          options={{
            tabBarLabel: translate('contentNavigator.albumTab'),
            tabBarIcon: ({ color }) => <BottomTabIcon icon="Album" color={color} />,
          }}
        />
      )}

      {visibleBottomTabs.includes(BottomTabs.Files) && (
        <Tab.Screen
          name="File"
          component={FilesNavigator}
          options={{
            title: translate('contentNavigator.filesTab'),
            tabBarIcon: ({ color }) => <BottomTabIcon icon="Files" color={color} />,
          }}
        />
      )}

      {visibleBottomTabs.includes(BottomTabs.More) && (
        <Tab.Screen
          name="MoreFeature"
          component={MoreFeatureNavigator}
          options={{
            tabBarLabel: translate('contentNavigator.moreTab'),
            tabBarIcon: ({ color }) => <BottomTabIcon icon="More" color={color} />,
          }}
        />
      )}

      <Tab.Screen
        name="Settings"
        component={SettingNavigator}
        options={{
          tabBarLabel: translate('contentNavigator.settingsTab'),
          tabBarIcon: ({ color }) => <BottomTabIcon icon="Settings" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
});

const $tabBarLabel: TextStyle = {
  ...typography.caption1,
};

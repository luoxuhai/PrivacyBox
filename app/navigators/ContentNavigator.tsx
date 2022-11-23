import React, { FC } from 'react';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextStyle, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { observer } from 'mobx-react-lite';

import { BlurView, BottomTabIcon } from '@/components';
import { translate } from '@/i18n';
import {
  AlbumScreen,
  SettingScreen,
  FileScreen,
  MoreScreen,
  AboutScreen,
  AppearanceScreen,
  DebugScreen,
} from '@/screens';
import { spacing, typography, useTheme } from '@/theme';
import { AppStackParamList, AppStackScreenProps } from './AppNavigator';

export type ContentTabParamList = {
  Album: undefined;
  File: undefined;
  More: undefined;
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

export type SettingStackParamList = {
  Settings: typeof SettingScreen;
  Appearance: typeof AppearanceScreen;
  About: typeof AboutScreen;
  Debug: typeof DebugScreen;
};

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

const SettingStackScreen: FC<StackScreenProps<SettingStackParamList>> = observer(
  function SettingStackScreen() {
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
            headerShadowVisible: false,
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
          name="Debug"
          options={{
            presentation: 'modal',
            title: translate('debugScreen.title'),
          }}
          component={DebugScreen}
        />
      </SettingStack.Navigator>
    );
  },
);

export const ContentNavigator = observer(function ContentNavigator() {
  const { bottom } = useSafeAreaInsets();
  const { colors, isDark } = useTheme();
  const { portrait } = useDeviceOrientation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: bottom + 48,
          paddingTop: spacing[4],
          borderTopColor: colors.transparent,
          position: 'absolute',
        },
        tabBarActiveTintColor: colors.palette.primary6,
        tabBarInactiveTintColor: colors.secondaryLabel,
        tabBarLabelStyle: [
          $tabBarLabel,
          {
            marginTop: portrait ? spacing[3] : 0,
          },
        ],
        tabBarBackground: () => (
          <BlurView blurType={isDark ? 'materialDark' : 'materialLight'} blurAmount={10} />
        ),
      }}
    >
      <Tab.Screen
        name="Album"
        component={AlbumScreen}
        options={{
          tabBarLabel: translate('contentNavigator.albumTab'),
          tabBarIcon: ({ color }) => <BottomTabIcon icon="Album" color={color} />,
        }}
      />

      <Tab.Screen
        name="File"
        component={FileScreen}
        options={{
          title: translate('contentNavigator.filesTab'),
          tabBarIcon: ({ color }) => <BottomTabIcon icon="Files" color={color} />,
        }}
      />

      {/* <Tab.Screen
        name="Browser"
        component={BrowserScreen}
        options={{
          tabBarLabel: translate('demoNavigator.podcastListTab'),
          tabBarIcon: ({ focused }) => <Icon icon="podcast" color={focused && colors.tint} />,
        }}
      /> */}

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: translate('contentNavigator.moreTab'),
          tabBarIcon: ({ color }) => <BottomTabIcon icon="More" color={color} />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingStackScreen}
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

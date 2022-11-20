import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView, BottomTabIcon } from '@/components';
import { translate } from '@/i18n';
import { AlbumScreen, SettingScreen, FileScreen, MoreScreen, AboutScreen } from '@/screens';
import { colors, spacing, typography, useTheme } from '@/theme';
import { AppStackParamList, AppStackScreenProps } from './AppNavigator';
import { observer } from 'mobx-react-lite';
import { useDeviceOrientation } from '@react-native-community/hooks';

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
  About: typeof AboutScreen;
};

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

const SettingStackScreen = observer(function SettingStackScreen() {
  const { isDark, colors } = useTheme();

  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="Settings"
        options={{
          title: translate('contentNavigator.settingsTab'),
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
          headerLargeStyle: {
            backgroundColor: isDark ? colors.background : colors.secondaryBackground,
          },
        }}
        component={SettingScreen}
      />
      <SettingStack.Screen
        name="About"
        options={{
          title: 'About',
          headerShadowVisible: false,
          headerBlurEffect: 'light',
          headerTransparent: true,
        }}
        component={AboutScreen}
      />
    </SettingStack.Navigator>
  );
});

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

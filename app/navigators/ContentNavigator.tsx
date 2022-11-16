import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components';
import { translate } from '@/i18n';
import { AlbumScreen, SettingScreen, FileScreen, MoreScreen } from '@/screens';
import { spacing, typography, useTheme } from '@/theme';
import { AppStackParamList, AppStackScreenProps } from './AppNavigator';

export type ContentTabParamList = {
  Album: undefined;
  File: undefined;
  More: undefined;
  Setting: undefined;
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

export function ContentNavigator() {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: bottom + 70,
          backgroundColor: colors.background,
          borderTopColor: colors.transparent,
        },
        tabBarActiveTintColor: colors.label,
        tabBarInactiveTintColor: colors.label,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Album"
        component={AlbumScreen}
        options={{
          tabBarLabel: translate('demoNavigator.componentsTab'),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused && colors.palette.primary6} />
          ),
        }}
      />

      <Tab.Screen
        name="File"
        component={FileScreen}
        options={{
          tabBarLabel: translate('demoNavigator.communityTab'),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused && colors.palette.primary6} />
          ),
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
          tabBarLabel: translate('demoNavigator.debugTab'),
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" color={focused && colors.palette.primary6} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: translate('demoNavigator.debugTab'),
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" color={focused && colors.palette.primary6} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing[3],
};

const $tabBarLabel: TextStyle = {
  ...typography.caption1,
  flex: 1,
};

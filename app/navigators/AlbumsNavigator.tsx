import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { AlbumsScreen } from '@/screens';
import { useTheme } from '@/theme';
import { translate } from '@/i18n';
import { AppStackParamList } from './AppNavigator';

export type AlbumsNavigatorParamList = {
  Album: undefined;
} & AppStackParamList;

const Stack = createNativeStackNavigator<AlbumsNavigatorParamList>();

export const AlbumsNavigator = observer(() => {
  const { isDark, colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
        headerLargeStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Album"
        options={{
          title: translate('albumsScreen.title'),
          headerSearchBarOptions: {
            shouldShowHintSearchIcon: true,
            hideNavigationBar: false,
            hideWhenScrolling: false,
            placeholder: translate('albumsScreen.searchPlaceholder'),
            cancelButtonText: translate('common.cancel'),
          },
          headerLargeTitle: true,
        }}
        component={AlbumsScreen}
      />
    </Stack.Navigator>
  );
});

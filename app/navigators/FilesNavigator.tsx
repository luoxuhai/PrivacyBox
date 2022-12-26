import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { FilesScreen, FilesNavigatorParams } from '@/screens';
import { useTheme } from '@/theme';
import { translate } from '@/i18n';

export type FilesNavigatorParamList = {
  Files: FilesNavigatorParams;
};

const Stack = createNativeStackNavigator<FilesNavigatorParamList>();

export const FilesNavigator = observer(() => {
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
        name="Files"
        options={{
          title: translate('filesScreen.title'),
          headerLargeTitle: true,
        }}
        component={FilesScreen}
      />
    </Stack.Navigator>
  );
});

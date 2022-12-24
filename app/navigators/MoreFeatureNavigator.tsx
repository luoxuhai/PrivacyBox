import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { MoreFeatureScreen, HideApplicationsScreen, ApplicationPickerScreen } from '@/screens';
import { useTheme } from '@/theme';
import { translate } from '@/i18n';

export type MoreFeatureNavigatorParamList = {
  MoreFeature: undefined;
  HideApplications: undefined;
  ApplicationPicker: undefined;
};

const Stack = createNativeStackNavigator<MoreFeatureNavigatorParamList>();

export const MoreFeatureNavigator = observer(() => {
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
        name="MoreFeature"
        options={{
          title: translate('moreFeatureScreen.title'),
          headerLargeTitle: true,
        }}
        component={MoreFeatureScreen}
      />
      <Stack.Screen
        name="HideApplications"
        options={{
          title: translate('hideApplicationsScreen.title'),
          headerLargeStyle: {
            backgroundColor: isDark ? colors.background : colors.secondaryBackground,
          },
        }}
        component={HideApplicationsScreen}
      />
      <Stack.Screen
        name="ApplicationPicker"
        options={{
          title: translate('applicationPickerScreen.title'),
          presentation: 'modal',
        }}
        component={ApplicationPickerScreen}
      />
    </Stack.Navigator>
  );
});

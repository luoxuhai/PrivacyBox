import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { MoreFeatureScreen } from '@/screens';
import { useTheme } from '@/theme';
import { translate } from '@/i18n';

export type MoreFeatureNavigatorParamList = {
  MoreFeature: undefined;
  HideApplications: undefined;
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
    </Stack.Navigator>
  );
});

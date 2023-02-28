import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import {
  MoreFeatureScreen,
  RecycleBinScreen,
  ICloudSyncScreen,
  RecycleBinSettingsScreen,
  ICloudBackupSettingsScreen,
} from '@/screens';
import { useTheme } from '@/theme';
import { translate } from '@/i18n';
import { AppStackParamList } from './AppNavigator';

export type MoreFeatureNavigatorParamList = {
  MoreFeature: undefined;
  HideApplications: undefined;
  ApplicationPicker: undefined;
  RecycleBin: undefined;
  Transfer: undefined;
  RecycleBinSettings: undefined;
  ICloudBackupSettings: undefined;
} & AppStackParamList;

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

      <Stack.Group
        screenOptions={{
          headerLargeStyle: {
            backgroundColor: isDark ? colors.background : colors.secondaryBackground,
          },
        }}
      >
        <Stack.Screen
          name="ICloudSync"
          options={{
            title: translate('icloudScreen.title'),
          }}
          component={ICloudSyncScreen}
        />

        <Stack.Screen
          name="RecycleBin"
          options={{
            title: translate('wastebasketScreen.title'),
            headerLargeStyle: {
              backgroundColor: colors.background,
            },
          }}
          component={RecycleBinScreen}
        />

        <Stack.Screen
          name="RecycleBinSettings"
          options={{
            title: translate('recycleBinSettingsScreen.title'),
          }}
          component={RecycleBinSettingsScreen}
        />

        <Stack.Screen
          name="ICloudBackupSettings"
          options={{
            title: translate('icloudScreen.title'),
          }}
          component={ICloudBackupSettingsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
});

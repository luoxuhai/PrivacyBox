import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { TextStyle } from 'react-native';

import { MoreFeatureNavigatorParamList } from '@/navigators';
import { Screen, ExitButton, TextButton } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { FamilyActivityPicker, getBlockedApplications, isApproved } from '@/lib/ScreenTime';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ApplicationPickerScreen: FC<
  StackScreenProps<MoreFeatureNavigatorParamList, 'ApplicationPicker'>
> = observer((props) => {
  const { colors } = useTheme();

  useEffect(() => {
    getBlockedApplications().then((r) => console.log('[getBlockedApplications]', r));
    isApproved().then((r) => console.log('[getAuthorizationStatus]', r));
    props.navigation.setOptions({
      headerLeft: () => (
        <ExitButton
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <TextButton
          tk="common.done"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      ),
    });
  }, []);

  return (
    <Screen>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <FamilyActivityPicker
          style={{
            flex: 1,
          }}
          onActivityChange={(v) => {
            console.prettyLog(v);
          }}
        />
      </SafeAreaView>
    </Screen>
  );
});

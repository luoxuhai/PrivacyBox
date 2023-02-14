import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert, TextStyle } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { MoreFeatureNavigatorParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, Screen, Switch, Text } from '@/components';
import { spacing, useTheme } from '@/theme';
import { clearBlockedApplications, isApproved, requestAuthorization } from '@/lib/ScreenTime';
import { useStores } from '@/models';
import { t } from '@/i18n';

export const HideApplicationsScreen: FC<
  StackScreenProps<MoreFeatureNavigatorParamList, 'HideApplications'>
> = observer((props) => {
  const { colors } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [approved, setApproved] = useState(false);
  const { settingsStore } = useStores();

  useEffect(() => {
    if (!settingsStore.blockedAppsEnabled) {
      clearBlockedApplications();
    }

    isApproved().then(async (v) => {
      setApproved(v);
      if (!v) {
        alertPermission();
      }
    });
  }, []);

  async function alertPermission() {
    settingsStore.setBlockedAppsEnabled(false);

    try {
      await requestAuthorization();
      setApproved(true);
    } catch {
      setApproved(false);
      Alert.alert(t('hideApplicationsScreen.permission'), '', [
        {
          text: t('common.ok'),
          style: 'default',
        },
      ]);
    }
  }

  const handleValueChange = useCallback(
    (value: boolean) => {
      if (approved) {
        settingsStore.setBlockedAppsEnabled(value);
      } else {
        alertPermission();
      }
    },
    [approved, alertPermission],
  );

  const handleApplicationPicker = useCallback(() => {
    if (approved) {
      props.navigation.navigate('ApplicationPicker');
    } else {
      alertPermission();
    }
  }, [approved, alertPermission]);

  return (
    <Screen type="tabView">
      <SafeAreaScrollView
        contentContainerStyle={[
          $safeAreaScrollView,
          {
            paddingBottom: bottomTabBarHeight,
          },
        ]}
      >
        <ListSection>
          <ListCell
            tk="hideApplicationsScreen.enabled"
            rightIcon={null}
            RightAccessory={
              <Switch value={settingsStore.blockedAppsEnabled} onValueChange={handleValueChange} />
            }
          />
          <ListCell
            tk="hideApplicationsScreen.selection"
            bottomSeparator={false}
            RightAccessory={
              <Text text={`${settingsStore.selectedAppCount} 个`} color={colors.secondaryLabel} />
            }
            onPress={handleApplicationPicker}
          />
        </ListSection>
      </SafeAreaScrollView>
    </Screen>
  );
});

const $safeAreaScrollView: TextStyle = {
  paddingTop: spacing[5],
  paddingHorizontal: spacing[6],
};

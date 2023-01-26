import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { TextStyle } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { MoreFeatureNavigatorParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, Screen, Switch, Text } from '@/components';
import { spacing, useTheme } from '@/theme';
import { clearBlockedApplications, isApproved } from '@/lib/ScreenTime';
import { useFocusEffect } from '@react-navigation/native';
import { alertPermissionBlocked } from '@/utils';
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
  }, []);

  useFocusEffect(() => {
    isApproved().then((v) => {
      setApproved(v);
      if (!v) {
        settingsStore.setBlockedAppsEnabled(false);
        alertPermissionBlocked(
          t('permissionManager.blocked', {
            permissions: t('permissionManager.screenTime'),
          }),
        );
      }
    });
  });

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
              <Switch
                disabled={!approved}
                value={settingsStore.blockedAppsEnabled}
                onValueChange={settingsStore.setBlockedAppsEnabled}
              />
            }
          />
          <ListCell
            tk="hideApplicationsScreen.selection"
            disabled={!approved}
            bottomSeparator={false}
            RightAccessory={
              <Text text={`${settingsStore.selectedAppCount} 个`} color={colors.secondaryLabel} />
            }
            onPress={() => {
              props.navigation.navigate('ApplicationPicker');
            }}
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

import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';

import { MoreFeatureNavigatorParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, Screen, Switch } from '@/components';
import { spacing, useTheme } from '@/theme';
import { useStores } from '@/models';

export const ICloudBackupSettingsScreen: FC<StackScreenProps<MoreFeatureNavigatorParamList, 'ICloudBackupSettings'>> =
  observer(() => {
    const { colors } = useTheme();
    const { settingsStore } = useStores();

    return (
      <Screen type="tabView">
        <SafeAreaScrollView contentContainerStyle={$contentContainer}>
          <ListSection>
            <ListCell
              tk="icloudScreen.autoSyncEnabled"
              rightIcon={null}
              RightAccessory={
                <Switch
                  value={settingsStore.iCloudAutoBackupEnabled}
                  onValueChange={settingsStore.setICloudSyncEnabled}
                />
              }
            />
            <ListCell
              tk="icloudScreen.onlyWifi"
              rightIcon={null}
              RightAccessory={
                <Switch
                  value={settingsStore.iCloudBackupOnlyWifi}
                  onValueChange={settingsStore.setICloudSyncOnlyWifi}
                />
              }
            />
          </ListSection>
          <ListSection>
            <ListCell
              textStyle={{
                color: colors.palette.primary6,
              }}
              tk="icloudScreen.clearBackup"
              rightIcon={null}
            />
          </ListSection>
        </SafeAreaScrollView>
      </Screen>
    );
  });

const $contentContainer: ViewStyle = {
  paddingTop: spacing[6],
  paddingHorizontal: spacing[6],
};

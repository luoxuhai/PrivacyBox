import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { SettingStackParamList } from '@/navigators';
import { Screen, SafeAreaScrollView, ListSection, ListCell, Switch } from '@/components';
import { spacing } from '@/theme';
import { TextKeyPath } from '@/i18n';
import { BottomTabs } from '@/models/SettingsStore';
import { useStores } from '@/models';
import { classifyImageTask } from '@/utils/task/classifyImageTask';
import { canUsePremium } from '@/utils/canUsePremium';
import { existsOldData } from '@/screens/DataMigratorScreen/helpers/existsOldData';

export const AdvancedSettingsScreen: FC<
  StackScreenProps<SettingStackParamList, 'AdvancedSettings'>
> = observer(function AdvancedSettingsScreen() {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { settingsStore } = useStores();

  function handleSmartSearchEnabled(enabled: boolean) {
    if (enabled && !canUsePremium()) {
      return;
    }

    settingsStore.setSmartSearchEnabled(enabled);
    if (enabled) {
      classifyImageTask.start();
    }
  }

  return (
    <Screen type="tabView">
      <SafeAreaScrollView
        contentContainerStyle={[$contentContainer, { paddingBottom: bottomTabBarHeight }]}
      >
        <ListSection descriptionTk="advancedSettingsScreen.importImageAfterDeleteTip">
          <ListCell
            tk="advancedSettingsScreen.importImageAfterDelete"
            bottomSeparator={false}
            rightIcon={null}
            RightAccessory={
              <Switch
                value={settingsStore.autoDeleteOriginEnabled}
                onValueChange={settingsStore.setAutoDeleteOriginEnabled}
              />
            }
          />
        </ListSection>
        <ListSection descriptionTk="advancedSettingsScreen.smartSearchTip">
          <ListCell
            tk="advancedSettingsScreen.smartSearch"
            bottomSeparator={false}
            rightIcon={null}
            RightAccessory={
              <Switch
                value={settingsStore.smartSearchEnabled}
                onValueChange={handleSmartSearchEnabled}
              />
            }
          />
        </ListSection>
        <BottomTabVisibleSection />
        <DataExportSection />
      </SafeAreaScrollView>
    </Screen>
  );
});

const BottomTabVisibleSection = observer(() => {
  const { settingsStore } = useStores();

  return (
    <ListSection titleTk="advancedSettingsScreen.bottomTabVisible">
      {list.map((item, idx) => {
        const bottomSeparator = idx < list.length - 1;
        const checked = settingsStore.visibleBottomTabs.includes(item.value);
        const disabled = checked && settingsStore.visibleBottomTabs.length === 1;

        return (
          <ListCell
            key={item.title}
            tk={item.title}
            bottomSeparator={bottomSeparator}
            rightIcon={null}
            RightAccessory={
              <Switch
                value={checked}
                disabled={disabled}
                onValueChange={(v) => {
                  if (v) {
                    settingsStore.setVisibleBottomTabs(item.value);
                  } else {
                    settingsStore.removeVisibleBottomTabs(item.value);
                  }
                }}
              />
            }
          />
        );
      })}
    </ListSection>
  );
});

const DataExportSection = observer(() => {
  const [isExistsOldData, setIsExistsOldData] = useState(false);

  useEffect(() => {
    existsOldData().then(setIsExistsOldData);
  }, []);

  if (!isExistsOldData) {
    return null;
  }

  return (
    <ListSection titleTk="advancedSettingsScreen.dataExport">
      <ListCell
        tk="advancedSettingsScreen.exceptionDataExport"
        bottomSeparator={false}
        onPress={() => {
          console.log('x');
        }}
      />
    </ListSection>
  );
});

const list: { title: TextKeyPath; value: BottomTabs }[] = [
  {
    title: 'contentNavigator.filesTab',
    value: BottomTabs.Files,
  },
  {
    title: 'contentNavigator.albumTab',
    value: BottomTabs.Album,
  },
  {
    title: 'contentNavigator.moreTab',
    value: BottomTabs.More,
  },
];

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[5],
};

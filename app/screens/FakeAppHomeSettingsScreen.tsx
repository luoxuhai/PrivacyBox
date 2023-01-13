import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { SettingStackParamList } from '@/navigators';
import { Screen, ListSection, ListCell, Switch, SafeAreaScrollView } from '@/components';
import { spacing } from '@/theme';
import { useStores } from '@/models';
import { FakeHomeUnlockActions } from '@/models/SettingsStore';
import { TextKeyPath } from '@/i18n';
import { canUsePremium } from '@/utils/canUsePremium';

export const FakeAppHomeSettingsScreen: FC<
  StackScreenProps<SettingStackParamList, 'FakeAppHomeSettings'>
> = observer(function FakeAppHomeSettingsScreen() {
  const { settingsStore } = useStores();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <Screen style={$screen} type="tabView">
      <SafeAreaScrollView
        contentContainerStyle={[$contentContainer, { paddingBottom: bottomTabBarHeight }]}
      >
        <ListSection>
          <ListCell
            tk="fakeAppHomeSettingsScreen.fakeHomeEnabled"
            bottomSeparator={false}
            rightIcon={
              <Switch
                value={settingsStore.fakeHomeEnabled}
                onValueChange={(value) => {
                  if (!canUsePremium()) {
                    return;
                  }

                  settingsStore.setFakeHomeEnabled(value);
                }}
              />
            }
          />
        </ListSection>

        <ListSection titleTk="fakeAppHomeSettingsScreen.unlockAction">
          {unlockActions.map((item, idx) => {
            const checked = settingsStore.fakeHomeUnlockActions.includes(item.value);
            const bottomSeparator = idx < unlockActions.length - 1;

            return (
              <ListCell
                key={item.value}
                bottomSeparator={bottomSeparator}
                tk={item.tk}
                rightIcon={
                  <Switch
                    value={checked}
                    disabled={checked && settingsStore.fakeHomeUnlockActions.length === 1}
                    onValueChange={(value) => {
                      if (value) {
                        settingsStore.setFakeHomeUnlockActions(item.value);
                      } else {
                        settingsStore.removeFakeHomeUnlockActions(item.value);
                      }
                    }}
                  />
                }
              />
            );
          })}
        </ListSection>
      </SafeAreaScrollView>
    </Screen>
  );
});

const unlockActions: { value: FakeHomeUnlockActions; tk: TextKeyPath }[] = [
  {
    value: FakeHomeUnlockActions.Slide,
    tk: 'fakeAppHomeSettingsScreen.slide',
  },
  {
    value: FakeHomeUnlockActions.Shake,
    tk: 'fakeAppHomeSettingsScreen.shake',
  },
  {
    value: FakeHomeUnlockActions.PullRefresh,
    tk: 'fakeAppHomeSettingsScreen.pullRefresh',
  },
];

const $screen: ViewStyle = {
  flex: 1,
};

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[5],
};

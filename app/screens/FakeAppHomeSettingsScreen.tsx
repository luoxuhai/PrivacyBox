import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { SettingStackParamList } from '@/navigators';
import { Screen, ListSection, ListCell, Switch, SafeAreaScrollView } from '@/components';
import { spacing, useTheme } from '@/theme';
import { useStores } from '@/models';
import { FakeHomeUnlockActions } from '@/models/SettingsStore';
import { TextKeyPath } from '@/i18n';

export const FakeAppHomeSettingsScreen: FC<
  StackScreenProps<SettingStackParamList, 'FakeAppHomeSettings'>
> = observer(function FakeAppHomeSettingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { settingsStore } = useStores();

  return (
    <Screen style={$screen}>
      <SafeAreaScrollView contentContainerStyle={$contentContainer}>
        <ListSection
          style={{
            marginTop: spacing[8],
          }}
        >
          <ListCell
            tk="fakeAppHomeSettingsScreen.fakeHomeEnabled"
            rightIcon={
              <Switch
                value={settingsStore.fakeHomeEnabled}
                onValueChange={settingsStore.setFakeHomeEnabled}
              />
            }
          />
        </ListSection>

        <ListSection titleTk="fakeAppHomeSettingsScreen.unlockAction">
          {unlockActions.map((item) => {
            const checked = settingsStore.fakeHomeUnlockActions.includes(item.value);
            return (
              <ListCell
                key={item.value}
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
};

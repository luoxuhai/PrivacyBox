import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, ActionSheetIOS } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, Screen, Switch } from '@/components';
import { spacing, useTheme } from '@/theme';
import { useStores } from '@/models';
import { translate } from '@/i18n';

export const FakeAppLockSettingsScreen: FC<
  StackScreenProps<SettingStackParamList, 'FakeAppLockSettings'>
> = observer(function FakeAppLockSettingsScreen() {
  const { colors } = useTheme();
  const { appLockStore } = useStores();

  return (
    <Screen style={$screen}>
      <SafeAreaScrollView contentContainerStyle={$contentContainer}>
        <ListSection
          style={{
            marginTop: spacing[8],
          }}
        >
          <ListCell
            tk="fakeAppLockSettingsScreen.fakePasscodeSwitch"
            rightIcon={
              <Switch
                value={appLockStore.autoTriggerBiometrics}
                onValueChange={appLockStore.setAutoTriggerBiometrics}
              />
            }
          />
          <ListCell tk="fakeAppLockSettingsScreen.changeFakePasscode" />
          <ListCell
            tk="fakeAppLockSettingsScreen.hideBiometricsWhenFake"
            rightIcon={
              <Switch
                value={appLockStore.autoTriggerBiometrics}
                onValueChange={appLockStore.setAutoTriggerBiometrics}
              />
            }
          />
        </ListSection>
      </SafeAreaScrollView>
    </Screen>
  );
});

const $screen: ViewStyle = {
  flex: 1,
};

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
};

import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, ActionSheetIOS } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, Screen, Switch } from '@/components';
import { spacing } from '@/theme';
import { useStores } from '@/models';
import { translate } from '@/i18n';
import { useLocalAuth, getBiometricName } from '@/utils';

export const AppLockSettingsScreen: FC<StackScreenProps<SettingStackParamList, 'AppLockSettings'>> =
  observer(function AppLockSettingsScreen() {
    const { usedBiometricType } = useLocalAuth();
    const { appLockStore } = useStores();

    const handleSetAutolockTimeout = useCallback(() => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            translate('common.cancel'),
            ...autolockTimeoutOptions.map((option) => option.title),
          ],
          cancelButtonIndex: 0,
          title: translate('appLockSettingsScreen.autolockTimeoutTip'),
        },
        (buttonIndex) => {
          if (buttonIndex !== 0) {
            appLockStore.setAutolockTimeout(autolockTimeoutOptions[buttonIndex - 1].value);
          }
        },
      );
    }, []);

    const formattedAutolockTimeout = useMemo(
      () =>
        autolockTimeoutOptions.find((option) => option.value === appLockStore.autolockTimeout)
          .title,
      [appLockStore.autolockTimeout],
    );

    const biometricName = useMemo(() => getBiometricName(usedBiometricType), [usedBiometricType]);

    return (
      <Screen style={$screen}>
        <SafeAreaScrollView contentContainerStyle={$contentContainer}>
          <ListSection>
            <ListCell tk="appLockSettingsScreen.changePasscode" />
            <ListCell
              tk="appLockSettingsScreen.autolockTimeout"
              bottomSeparator={!!usedBiometricType}
              RightAccessory={formattedAutolockTimeout}
              onPress={handleSetAutolockTimeout}
            />
            {usedBiometricType && (
              <>
                <ListCell
                  tk="appLockSettingsScreen.biometrics"
                  tkOptions={{
                    name: biometricName,
                  }}
                  rightIcon={
                    <Switch
                      value={appLockStore.biometricsEnabled}
                      onValueChange={appLockStore.setBiometricsEnabled}
                    />
                  }
                />
                <ListCell
                  tk="appLockSettingsScreen.autoTriggerBiometrics"
                  bottomSeparator={false}
                  tkOptions={{
                    name: biometricName,
                  }}
                  rightIcon={
                    <Switch
                      value={appLockStore.autoTriggerBiometrics}
                      disabled={!appLockStore.biometricsEnabled}
                      onValueChange={appLockStore.setAutoTriggerBiometrics}
                    />
                  }
                />
              </>
            )}
          </ListSection>
          <FakeAppLockSection />
        </SafeAreaScrollView>
      </Screen>
    );
  });

export const FakeAppLockSection = observer(() => {
  const { appLockStore } = useStores();
  const { usedBiometricType } = useLocalAuth();
  const biometricName = useMemo(() => getBiometricName(usedBiometricType), [usedBiometricType]);
  const hideBiometricsWhenFakeVisible = usedBiometricType && appLockStore.biometricsEnabled;

  return (
    <ListSection titleTk="fakeAppLockSettingsScreen.title">
      <ListCell
        tk="fakeAppLockSettingsScreen.fakePasscodeSwitch"
        rightIcon={
          <Switch
            value={appLockStore.fakePasscodeEnabled}
            onValueChange={appLockStore.setFakePasscodeEnabled}
          />
        }
      />
      <ListCell tk="fakeAppLockSettingsScreen.changeFakePasscode" />
      <ListCell
        tk="fakeAppLockSettingsScreen.bottomTabDarkle"
        bottomSeparator={hideBiometricsWhenFakeVisible}
        rightIcon={
          <Switch
            value={appLockStore.bottomTabDarkleWhenFake}
            onValueChange={appLockStore.setBottomTabDarkleWhenFake}
          />
        }
      />
      {hideBiometricsWhenFakeVisible && (
        <ListCell
          tk="fakeAppLockSettingsScreen.hideBiometricsWhenFake"
          bottomSeparator={false}
          tkOptions={{
            name: biometricName,
          }}
          rightIcon={
            <Switch
              value={appLockStore.biometricsEnabledWhenFake}
              onValueChange={appLockStore.setBiometricsEnabledWhenFake}
            />
          }
        />
      )}
    </ListSection>
  );
});

const autolockTimeoutOptions = [
  {
    value: 0,
    title: translate('appLockSettingsScreen.autolockTimeoutDisabled'),
  },
  {
    value: 30,
    title: `30 ${translate('common.second')}`,
  },
  {
    value: 60,
    title: `1 ${translate('common.minute')}`,
  },
  {
    value: 60 * 5,
    title: `5 ${translate('common.minute')}`,
  },
  {
    value: 60 * 15,
    title: `15 ${translate('common.minute')}`,
  },
  {
    value: 60 * 60,
    title: `1 ${translate('common.hour')}`,
  },
];

const $screen: ViewStyle = {
  flex: 1,
};

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[5],
};

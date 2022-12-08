import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, ActionSheetIOS } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { AppStackParamList, SettingStackParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, Screen, Switch } from '@/components';
import { spacing } from '@/theme';
import { useStores } from '@/models';
import { translate } from '@/i18n';
import { useLocalAuth, getBiometricName } from '@/utils';
import { FakeAppLockSection } from './FakeAppLockSection';

export const AppLockSettingsScreen: FC<
  StackScreenProps<SettingStackParamList & AppStackParamList, 'AppLockSettings'>
> = observer((props) => {
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
      autolockTimeoutOptions.find((option) => option.value === appLockStore.autolockTimeout).title,
    [appLockStore.autolockTimeout],
  );

  const biometricName = useMemo(() => getBiometricName(usedBiometricType), [usedBiometricType]);

  return (
    <Screen type="tabView">
      <SafeAreaScrollView contentContainerStyle={$contentContainer}>
        <ListSection titleTk="appLockSettingsScreen.sectionTitle">
          <ListCell
            tk="appLockSettingsScreen.changePasscode"
            onPress={() => {
              props.navigation.navigate('ChangeLockPasscode', {
                backButtonVisible: true,
                isChange: true,
                isFake: false,
              });
            }}
          />
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

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[5],
};

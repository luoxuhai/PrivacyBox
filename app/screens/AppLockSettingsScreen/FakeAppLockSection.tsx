import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { ListCell, ListSection, Switch } from '@/components';
import { useStores } from '@/models';
import { useLocalAuth, getBiometricName } from '@/utils';
import { AppStackParamList } from '@/navigators';

export const FakeAppLockSection = observer(() => {
  const { appLockStore } = useStores();
  const { usedBiometricType } = useLocalAuth();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const biometricName = useMemo(() => getBiometricName(usedBiometricType), [usedBiometricType]);
  const hideBiometricsWhenFakeVisible = usedBiometricType && appLockStore.biometricsEnabled;

  const handleOpenChangeLockPasscode = useCallback(() => {
    navigation.navigate('ChangeLockPasscode', {
      backButtonVisible: true,
      isChange: true,
      isFake: true,
    });
  }, [navigation]);

  const handleFakePasscodeEnabled = useCallback(
    (value: boolean) => {
      if (!appLockStore.fakePasscode) {
        handleOpenChangeLockPasscode();
        return;
      }

      appLockStore.setFakePasscodeEnabled(value);
    },
    [appLockStore],
  );

  return (
    <ListSection titleTk="fakeAppLockSettingsScreen.title">
      <ListCell
        tk="fakeAppLockSettingsScreen.fakePasscodeSwitch"
        rightIcon={
          <Switch
            value={appLockStore.fakePasscodeEnabled}
            onValueChange={handleFakePasscodeEnabled}
          />
        }
      />
      <ListCell
        tk="fakeAppLockSettingsScreen.changeFakePasscode"
        onPress={handleOpenChangeLockPasscode}
      />
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

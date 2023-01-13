import React, { FC, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { CommonActions } from '@react-navigation/native';

import { AppStackParamList } from '@/navigators';
import { Screen } from '@/components';
import { useTheme } from '@/theme';
import { useUpdateEffect } from '@/utils';
import { PASSCODE_LENGTH } from './constants';
import { useStores } from '@/models';
import { AppLockView } from './AppLockView';

export const AppLockScreen: FC<StackScreenProps<AppStackParamList, 'AppLock'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const { portrait } = useDeviceOrientation();
    const [passcode, setPasscode] = useState('');
    const [passcodeError, setPasscodeError] = useState(false);
    const disabled = useRef(false);

    const { appLockStore } = useStores();

    const $safeAreaViewStyles: ViewStyle[] = [
      $safeAreaView,
      {
        flexDirection: portrait ? 'column' : 'row',
        justifyContent: portrait ? 'center' : 'space-evenly',
      },
    ];

    function failedUnlock() {
      disabled.current = true;
      setPasscodeError(true);
      setTimeout(() => {
        clearPasscode();
        disabled.current = false;
      }, 200);
    }

    useUpdateEffect(() => {
      if (passcode.length === PASSCODE_LENGTH) {
        if (appLockStore.fakePasscodeEnabled && appLockStore.fakePasscode === passcode) {
          unlock(true);
          return;
        }

        if (passcode === appLockStore.passcode) {
          unlock(false);
          return;
        }

        failedUnlock();
      }
    }, [passcode]);

    function handlePasscodeChange(key: string) {
      if (disabled.current) {
        return;
      }
      setPasscode((v) => (v.length === PASSCODE_LENGTH ? v : v + key));
    }

    function handlePasscodeDelete() {
      if (disabled.current) {
        return;
      }
      setPasscode((v) => v.slice(0, -1));
    }

    function unlock(inFake: boolean) {
      appLockStore.setInFakeEnvironment(inFake);

      if (props.navigation.canGoBack()) {
        if (inFake) {
          props.navigation.dispatch(() => {
            return CommonActions.reset({
              index: 1,
              routes: [{ name: 'Album' }],
            });
          });

          props.navigation.popToTop();
        } else {
          props.navigation.goBack();
        }
      } else {
        props.navigation.replace('Content');
      }

      appLockStore.unlock();
      clearPasscode();
    }

    function clearPasscode() {
      setPasscode('');
      setPasscodeError(false);
    }

    return (
      <Screen style={{ backgroundColor: colors.background }}>
        <AppLockView
          passcode={passcode}
          style={$safeAreaViewStyles}
          icon="lock.fill"
          tk="appLockScreen.enterPassword"
          isError={passcodeError}
          biometricsVisible
          onChange={handlePasscodeChange}
          onDelete={handlePasscodeDelete}
          onUnlock={unlock}
          onUnlockFailed={failedUnlock}
        />
      </Screen>
    );
  },
);

const $safeAreaView: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

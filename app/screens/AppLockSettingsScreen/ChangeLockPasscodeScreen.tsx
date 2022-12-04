import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppStackParamList } from '@/navigators';
import { Screen, ExitButton, TextButton } from '@/components';
import { spacing, useTheme } from '@/theme';
import { Overlay, useUpdateEffect } from '@/utils';
import { useStores } from '@/models';
import { PASSCODE_LENGTH } from '../AppLockScreen/constants';
import { AppLockView } from '../AppLockScreen/AppLockView';
import { PasscodeInputStage } from './types';
import { TextKeyPath, translate } from '@/i18n';

export interface ChangeLockPasscodeScreenParams {
  isFake?: boolean;
  isChange?: boolean;
  backButtonVisible?: boolean;
}

export const ChangeLockPasscodeScreen: FC<
  StackScreenProps<AppStackParamList, 'ChangeLockPasscode'>
> = observer((props) => {
  const { colors } = useTheme();
  const { appLockStore } = useStores();
  const { portrait } = useDeviceOrientation();
  const [passcode, setPasscode] = useState('');
  // 上一步输入的密码
  const [lastPasscode, setLastPasscode] = useState('');
  // 步骤
  const [stage, setStage] = useState<PasscodeInputStage>(PasscodeInputStage.Start);
  const [passcodeError, setPasscodeError] = useState(false);
  const disabled = useRef(false);
  const safeAreaInsets = useSafeAreaInsets();
  const { backButtonVisible = false, isFake = false, isChange = false } = props.route.params ?? {};

  const headerTk = useMemo(
    () => generateTextKeyPath(stage, isChange, isFake),
    [stage, isChange, isFake],
  );

  const $safeAreaViewStyles: ViewStyle[] = [
    $safeAreaView,
    {
      flexDirection: portrait ? 'column' : 'row',
      justifyContent: portrait ? 'center' : 'space-evenly',
      paddingBottom: spacing[8],
    },
  ];

  // 设置步骤
  useEffect(() => {
    if (lastPasscode) {
      setStage(PasscodeInputStage.Confirm);
    } else {
      setStage(PasscodeInputStage.Start);
    }
  }, [lastPasscode]);

  function handleVerifyFail() {
    disabled.current = true;
    setPasscodeError(true);
    setTimeout(() => {
      clearPasscode();
      disabled.current = false;
    }, 200);
  }

  // 输入完成
  useUpdateEffect(() => {
    if (passcode.length === PASSCODE_LENGTH) {
      switch (stage) {
        case PasscodeInputStage.Start:
          if (passcode === appLockStore.passcode) {
            Overlay.alert({
              title: translate('changeLockPasscodeScreen.samePrompt'),
              preset: 'error',
            });
          } else {
            setLastPasscode(passcode);
          }
          clearPasscode();
          break;
        case PasscodeInputStage.Confirm:
          setPasscodeError(false);
          if (passcode === lastPasscode) {
            if (isChange) {
              Overlay.toast({
                title: translate('common.done'),
                preset: 'done',
              });
              handleChangePasscode();
            } else {
              handleUnlock();
            }
          } else {
            handleVerifyFail();
          }
      }
    }
  }, [passcode, lastPasscode]);

  const handlePasscodeChange = useCallback(
    (key: string) => {
      if (disabled.current) {
        return;
      }
      setPasscode((v) => (v.length === PASSCODE_LENGTH ? v : v + key));
    },
    [disabled.current],
  );

  const handlePasscodeDelete = useCallback(() => {
    if (disabled.current) {
      return;
    }
    setPasscode((v) => v.slice(0, -1));
  }, [disabled.current]);

  const handleUnlock = useCallback(() => {
    if (props.navigation.canGoBack()) {
      props.navigation.goBack();
    } else {
      props.navigation.replace('Content');
    }

    appLockStore.setPasscode(passcode);
    appLockStore.unlock();
    clearPasscode();
  }, [passcode]);

  const clearPasscode = useCallback(() => {
    setPasscode('');
    setPasscodeError(false);
  }, []);

  const handleChangePasscode = useCallback(() => {
    if (isFake) {
      appLockStore.setFakePasscode(passcode);
    } else {
      appLockStore.setPasscode(passcode);
    }
    props.navigation.goBack();
  }, [passcode, isFake]);

  const resetPasscode = useCallback(() => {
    setLastPasscode('');
    clearPasscode();
  }, []);

  return (
    <Screen style={{ backgroundColor: colors.background }}>
      <View
        style={[
          $headerButtons,
          {
            marginTop: safeAreaInsets.top + (portrait ? spacing[4] : 0),
          },
        ]}
      >
        {stage === PasscodeInputStage.Confirm && (
          <TextButton tk="changeLockPasscodeScreen.reset" onPress={resetPasscode} />
        )}
        {backButtonVisible && (
          <View style={$exitButton}>
            <ExitButton onPress={props.navigation.goBack} />
          </View>
        )}
      </View>
      <AppLockView
        passcode={passcode}
        style={$safeAreaViewStyles}
        icon={isChange ? 'lock.rotation' : 'lock.fill'}
        isError={passcodeError}
        tk={headerTk}
        biometricsVisible
        onChange={handlePasscodeChange}
        onDelete={handlePasscodeDelete}
      />
    </Screen>
  );
});

function generateTextKeyPath(
  stage: PasscodeInputStage,
  isChange: boolean,
  isFake: boolean,
): TextKeyPath {
  // 创建密码
  if (isChange) {
    switch (stage) {
      case PasscodeInputStage.Start:
        if (isFake) {
          return 'changeLockPasscodeScreen.changeFakePasscode';
        }
        return 'changeLockPasscodeScreen.changePasscode';
      case PasscodeInputStage.Confirm:
      case PasscodeInputStage.Done:
        if (isFake) {
          return 'changeLockPasscodeScreen.confirmFakePasscode';
        }
        return 'changeLockPasscodeScreen.confirmPasscode';
    }
  } else {
    switch (stage) {
      case PasscodeInputStage.Start:
        return 'changeLockPasscodeScreen.createPasscode';
      case PasscodeInputStage.Confirm:
      case PasscodeInputStage.Done:
        return 'changeLockPasscodeScreen.confirmCreatedPasscode';
    }
  }
}

const $safeAreaView: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const $headerButtons: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: 40,
  marginHorizontal: spacing[6],
};

const $exitButton: ViewStyle = {
  flex: 1,
  alignItems: 'flex-end',
};

import React, { FC, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, TouchableOpacity } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

import { useTheme } from '@/theme';
import { useLocalAuth, BiometricType, useUpdateEffect } from '@/utils';
import { KEY_SIZE } from './PasscodeKeyboard';
import { translate } from '@/i18n';
import { useStores } from '@/models';

interface BiometricsButtonProps {
  onSuccess?(): void;
  onFail?(): void;
}

function getBiometricIcon(biometricTypes?: BiometricType[]) {
  if (biometricTypes?.includes(BiometricType.FACIAL_RECOGNITION)) {
    return 'faceid';
  } else if (biometricTypes?.includes(BiometricType.FACIAL_RECOGNITION)) {
    return 'touchid';
  } else {
    return null;
  }
}

interface UnlockAttempts {
  count: number;
}

export const BiometricsButton: FC<BiometricsButtonProps> = observer((props) => {
  const { biometricTypes, usedBiometricType, auth } = useLocalAuth();
  const { colors } = useTheme();
  const { appLockStore, appStateStore } = useStores();
  const unlockTimer = useRef<NodeJS.Timeout>();
  const unlockAttempts = useRef<UnlockAttempts>({ count: 0 });
  const name = useMemo(() => getBiometricIcon(biometricTypes), [biometricTypes]);

  const visible =
    appLockStore.biometricsEnabled &&
    (appLockStore.inFakeEnvironment ? appLockStore.biometricsEnabledWhenFake : true);

  // 自动触发识别
  useUpdateEffect(() => {
    if (
      appLockStore.isLocked &&
      usedBiometricType &&
      appLockStore.biometricsEnabled &&
      appLockStore.autoTriggerBiometrics &&
      appStateStore.inForeground
    ) {
      clearTimeout(unlockTimer.current);
      unlockTimer.current = setTimeout(() => {
        if (unlockAttempts.current.count >= 1) {
          return;
        }
        unlockAttempts.current.count++;
        requestAuth();
      }, 400);
    }
  }, [
    appLockStore.autoTriggerBiometrics,
    appLockStore.isLocked,
    appStateStore.inForeground,
    usedBiometricType,
  ]);

  useUpdateEffect(() => {
    if (appLockStore.isLocked) {
      unlockAttempts.current.count = 0;
    }
  }, [appLockStore.isLocked]);

  async function requestAuth() {
    try {
      const result = await auth({
        promptMessage: translate('appLockScreen.unlock'),
      });

      if (result?.success) {
        setTimeout(props.onSuccess, 300);
      }
    } catch (error) {
      props.onFail();
    }
  }

  return (
    visible &&
    name && (
      <TouchableOpacity style={$container} onPress={requestAuth}>
        <SFSymbol name={name} color={colors.label} size={KEY_SIZE / 2} />
      </TouchableOpacity>
    )
  );
});

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

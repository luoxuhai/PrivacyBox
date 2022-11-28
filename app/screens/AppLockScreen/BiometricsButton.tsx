import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, TouchableOpacity } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

import { useTheme } from '@/theme';
import { useLocalAuth, BiometricType } from '@/utils';
import { KEY_SIZE } from './PasscodeKeyboard';

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

export const BiometricsButton: FC<BiometricsButtonProps> = observer((props) => {
  const { biometricTypes, auth } = useLocalAuth();
  const { colors } = useTheme();
  const name = useMemo(() => getBiometricIcon(biometricTypes), [biometricTypes]);

  return (
    name && (
      <TouchableOpacity style={$container} onPress={() => {}}>
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

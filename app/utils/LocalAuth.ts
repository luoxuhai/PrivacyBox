import { translate } from '@/i18n';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useMemo, useState } from 'react';
import { isEmulatorSync } from 'react-native-device-info';
import { PermissionManager } from './PermissionManager';

enum BiometricType {
  FINGERPRINT = LocalAuthentication.AuthenticationType.FINGERPRINT,
  FACIAL_RECOGNITION = LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
}
export { BiometricType };

export class LocalAuth {
  private static _biometricType: BiometricType[];

  static async getBiometricType() {
    if (!this._biometricType) {
      this._biometricType =
        (await LocalAuthentication.supportedAuthenticationTypesAsync()) as unknown as BiometricType[];
    }

    return isEmulatorSync() ? null : this._biometricType;
  }

  static async auth() {
    if (!PermissionManager.checkPermissions(['ios.permission.FACE_ID'])) {
      return null;
    }

    return LocalAuthentication.authenticateAsync();
  }
}

export function useLocalAuth() {
  const [biometricTypes, setBiometricTypes] = useState<BiometricType[]>(null);
  const usedBiometricType = useMemo(() => getUsedBiometricType(biometricTypes), [biometricTypes]);

  useEffect(() => {
    LocalAuth.getBiometricType().then(setBiometricTypes);
  }, []);

  return {
    usedBiometricType,
    biometricTypes,
    auth: LocalAuth.auth,
  };
}

export function getBiometricName(type: BiometricType) {
  switch (type) {
    case BiometricType.FACIAL_RECOGNITION:
      return translate('appLockScreen.faceId');
    case BiometricType.FINGERPRINT:
      return translate('appLockScreen.touchId');
    default:
      return null;
  }
}

function getUsedBiometricType(biometricTypes?: BiometricType[]) {
  if (biometricTypes?.includes(BiometricType.FACIAL_RECOGNITION)) {
    return BiometricType.FACIAL_RECOGNITION;
  } else if (biometricTypes?.includes(BiometricType.FINGERPRINT)) return BiometricType.FINGERPRINT;
  else {
    return null;
  }
}

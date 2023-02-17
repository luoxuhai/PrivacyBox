/**
 * This file is where we do "rehydration" of your RootStore from AsyncStorage.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import { Appearance, AppState, Linking, NativeEventSubscription } from 'react-native';
import { fromEventPattern } from 'rxjs';
import Shake from 'react-native-shake';
import { DeviceMotion } from 'expo-sensors';

import { AppStateStore } from '../AppStateStore';
import type { RootStore } from '../RootStore';
import { appearanceToMode, ThemeStore } from '../ThemeStore';
import { persist } from './persist';
import { UrgentSwitchActions } from '../SettingsStore';
import { AppQueriesSchemes } from '@/screens/UrgentSwitchScreen/type';

// 主题
const THEME_STATE_STORAGE_KEY = 'theme-v1';
// 设置
const SETTINGS_STATE_STORAGE_KEY = 'settings-v1';
// 应用锁
const APP_LOCK_STATE_STORAGE_KEY = 'appLock-v1';
// 内购
const PURCHASE_STATE_STORAGE_KEY = 'purchase-v1';

/**
 * Setup the root state.
 */
export async function setupRootStore(rootStore: RootStore) {
  try {
    const { themeStore, settingsStore, appLockStore, appStateStore, purchaseStore } = rootStore;

    // 读取持久化配置
    persist(THEME_STATE_STORAGE_KEY, themeStore);
    persist(PURCHASE_STATE_STORAGE_KEY, purchaseStore);
    persist(SETTINGS_STATE_STORAGE_KEY, settingsStore);
    persist(APP_LOCK_STATE_STORAGE_KEY, appLockStore, {
      whitelist: [
        'passcode',
        'autolockTimeout',
        'biometricsEnabled',
        'autoTriggerBiometrics',
        'fakePasscodeEnabled',
        'fakePasscode',
        'biometricsEnabledWhenFake',
        'bottomTabDarkleWhenFake',
      ],
    });

    // 应用启动时设置外观
    themeStore.setAppearanceMode(
      appearanceToMode(themeStore.appearance, themeStore.isSystemAppearance),
    );

    observeSystemAppearanceChange(themeStore);
    observeAppStateChange(appStateStore);
    observeShake(rootStore);
    observeDeviceMotion(rootStore);
  } catch (e) {
    if (__DEV__) {
      console.error('setupRootStore', e, null);
    }
  }
}

/**
 * 监听系统外观变化
 */
function observeSystemAppearanceChange(store: ThemeStore) {
  let delHandler: NativeEventSubscription;

  const subscription = fromEventPattern<Appearance.AppearancePreferences>(
    (handler) => {
      delHandler = Appearance.addChangeListener(handler);
    },
    () => {
      delHandler?.remove();
    },
  ).subscribe(() => {
    if (store.isSystemAppearance) {
      store.setAppearanceMode('auto');
    }
  });

  return subscription.unsubscribe;
}

/**
 * 监听应用活跃状态
 */
function observeAppStateChange(store: AppStateStore) {
  AppState.addEventListener('change', (state) => {
    store.setState(state);
  });
}

/**
 * 监听设备摇动
 */
function observeShake(rootStore: RootStore) {
  Shake.addListener(async () => {
    if (
      !rootStore.appLockStore.isLocked &&
      rootStore.settingsStore.urgentSwitchActions.includes(UrgentSwitchActions.Shake) &&
      rootStore.settingsStore.urgentSwitchTarget !== AppQueriesSchemes.Disable
    ) {
      try {
        const url = rootStore.settingsStore.urgentSwitchTarget;
        if (await Linking.canOpenURL(url)) {
          await Linking.openURL(url);
        }
      } catch {
        global.isPauseBiometrics = true;
      }
      rootStore.appLockStore.setIsLocked(true);
    }
  });
}

/**
 * 监听屏幕朝下
 */
function observeDeviceMotion(rootStore: RootStore) {
  DeviceMotion.setUpdateInterval(500);
  DeviceMotion.removeAllListeners();
  DeviceMotion.addListener(async (v) => {
    const x = (180 / Math.PI) * v.rotation.gamma;
    const y = (180 / Math.PI) * v.rotation.beta;
    if (Math.abs(x) >= 165 && Math.abs(y) <= 20) {
      if (
        !rootStore.appLockStore.isLocked &&
        rootStore.settingsStore.urgentSwitchActions.includes(UrgentSwitchActions.FaceDown) &&
        rootStore.settingsStore.urgentSwitchTarget !== AppQueriesSchemes.Disable
      ) {
        try {
          const url = rootStore.settingsStore.urgentSwitchTarget;
          if (await Linking.canOpenURL(url)) {
            await Linking.openURL(url);
          }
        } catch {
          global.isPauseBiometrics = true;
        }
        rootStore.appLockStore.setIsLocked(true);
      }
    }
  });
}

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
import { Appearance } from 'react-native';
import type { RootStore } from '../RootStore';
import { appearanceToMode, ThemeStore } from '../ThemeStore';
import { persist } from './persist';

// 主题
const THEME_STATE_STORAGE_KEY = 'theme-v1';
// 设置
const SETTINGS_STATE_STORAGE_KEY = 'settings-v1';
// 应用锁
const APP_LOCK_STATE_STORAGE_KEY = 'appLock-v1';

/**
 * Setup the root state.
 */
export async function setupRootStore(rootStore: RootStore) {
  try {
    const { themeStore, settingsStore, appLockStore } = rootStore;

    // 读取持久化配置
    persist(THEME_STATE_STORAGE_KEY, themeStore);
    persist(SETTINGS_STATE_STORAGE_KEY, settingsStore);
    persist(APP_LOCK_STATE_STORAGE_KEY, appLockStore);

    // 应用启动时设置外观
    themeStore.setAppearanceMode(
      appearanceToMode(themeStore.appearance, themeStore.isSystemAppearance),
    );

    observeSystemAppearanceChange(themeStore);
  } catch (e) {
    if (__DEV__) {
      console.error('setupRootStore', e.message, null);
    }
  }
}

/**
 * 监听系统外观变化
 */
function observeSystemAppearanceChange(themeStore: ThemeStore) {
  Appearance.addChangeListener(() => {
    if (themeStore.isSystemAppearance) {
      themeStore.setAppearanceMode('auto');
    }
  });
}

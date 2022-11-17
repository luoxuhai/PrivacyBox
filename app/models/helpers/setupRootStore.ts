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
import type { RootStore } from '../RootStore';
import { persist } from './persist';

/**
 * The key we'll be saving our state as within async storage.
 */
// const ROOT_STATE_STORAGE_KEY = 'root-v1';
const THEME_STATE_STORAGE_KEY = 'theme-v1';
/**
 * Setup the root state.
 */
export async function setupRootStore(rootStore: RootStore) {
  try {
    persist(THEME_STATE_STORAGE_KEY, rootStore.themeStore);
    // persist('authentication-v1', rootStore.authenticationStore);
  } catch (e) {
    if (__DEV__) {
      console.error('setupRootStore', e.message, null);
    }
  }
}

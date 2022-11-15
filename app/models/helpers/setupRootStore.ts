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
import { persist } from 'mst-persist';

import type { RootStore } from '../RootStore';
import { storage } from '../../storage';

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root-v1';

/**
 * Setup the root state.
 */
export async function setupRootStore(rootStore: RootStore) {
  try {
    const _storage = {
      setItem: storage.set,
      getItem: storage.get,
      removeItem: storage.remove,
      clear: storage.clear,
    };
    await persist('theme-v1', rootStore.themeStore, { storage: _storage });
    await persist('authentication-v1', rootStore.authenticationStore, { storage: _storage });
  } catch (e) {
    if (__DEV__) {
      console.tron.error(e.message, null);
    }
  }
}

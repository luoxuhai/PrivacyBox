import { Instance, SnapshotOut, types } from 'mobx-state-tree';

import { ThemeStoreModel } from './ThemeStore';
import { SettingsStoreModel } from './SettingsStore';
import { AppLockStoreModel } from './AppLockStore';
import { AppStateStoreModel } from './AppStateStore';
import { PurchaseStoreModel } from './PurchaseStore';
import { GlobalStoreModel } from './GlobalStore';

export const RootStoreModel = types.model('RootStore').props({
  themeStore: types.optional(ThemeStoreModel, {}),
  settingsStore: types.optional(SettingsStoreModel, {}),
  appLockStore: types.optional(AppLockStoreModel, {}),
  appStateStore: types.optional(AppStateStoreModel, {}),
  purchaseStore: types.optional(PurchaseStoreModel, {}),
  globalStore: types.optional(GlobalStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

import { Instance, SnapshotOut, types } from 'mobx-state-tree';

import { AuthenticationStoreModel } from './AuthenticationStore'; // @demo remove-current-line
import { ThemeStoreModel } from './ThemeStore';
import { SettingsStoreModel } from './SettingsStore';

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  themeStore: types.optional(ThemeStoreModel, {}),
  settingsStore: types.optional(SettingsStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

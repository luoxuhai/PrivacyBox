import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const SettingsStoreModel = types
  .model('SettingsStore')
  .props({
    hapticFeedback: types.optional(types.boolean, true),
    recycleBinEnabled: types.optional(types.boolean, true),
    recycleBinKeep: types.optional(types.number, 0),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setHapticFeedback(value: boolean) {
      self.hapticFeedback = value;
    },

    setRecycleBin(value: { enabled: boolean; keep: number }) {
      self.recycleBinEnabled = value.enabled;
      self.recycleBinKeep = value.keep;
    },
  }));

export interface SettingsStore extends Instance<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotOut extends SnapshotOut<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotIn extends SnapshotIn<typeof SettingsStoreModel> {}
export const createSettingsDefaultModel = () => types.optional(SettingsStoreModel, {});

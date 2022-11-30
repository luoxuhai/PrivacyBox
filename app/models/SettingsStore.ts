import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export enum FakeHomeUnlockActions {
  PullRefresh = 'pull_refresh',
  Slide = 'slide',
  Shake = 'shake',
}

export const SettingsStoreModel = types
  .model('SettingsStore')
  .props({
    hapticFeedback: types.optional(types.boolean, true),
    recycleBinEnabled: types.optional(types.boolean, true),
    recycleBinKeep: types.optional(types.number, 0),
    fakeHomeEnabled: types.optional(types.boolean, false),
    fakeHomeUnlockActions: types.optional(types.frozen<FakeHomeUnlockActions[]>(), [
      FakeHomeUnlockActions.Slide,
      FakeHomeUnlockActions.Shake,
    ]),
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

    setFakeHomeEnabled(fakeHomeEnabled: boolean) {
      self.fakeHomeEnabled = fakeHomeEnabled;
    },

    setFakeHomeUnlockActions(action: FakeHomeUnlockActions) {
      self.fakeHomeUnlockActions = Array.from(new Set([...self.fakeHomeUnlockActions, action]));
    },

    removeFakeHomeUnlockActions(action: FakeHomeUnlockActions) {
      const index = self.fakeHomeUnlockActions.indexOf(action);
      const newValue = JSON.parse(JSON.stringify(self.fakeHomeUnlockActions));
      newValue.splice(index, 1);
      self.fakeHomeUnlockActions = newValue;
    },
  }));

export interface SettingsStore extends Instance<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotOut extends SnapshotOut<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotIn extends SnapshotIn<typeof SettingsStoreModel> {}
export const createSettingsDefaultModel = () => types.optional(SettingsStoreModel, {});

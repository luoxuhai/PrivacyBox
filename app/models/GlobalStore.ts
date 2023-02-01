import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const GlobalStoreModel = types
  .model('GlobalStore')
  .props({
    bottomTabVisible: types.optional(types.boolean, true),
    migrationFailedUris: types.optional(types.frozen<string[]>([]), []),
    appMaskVisible: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setBottomTabVisible(bottomTabVisible: boolean) {
      self.bottomTabVisible = bottomTabVisible;
    },

    setMigrationFailed(uris: string[]) {
      self.migrationFailedUris = uris;
    },

    setAppMaskVisible(visible: boolean) {
      self.appMaskVisible = visible;
    },
  }));

export interface GlobalStore extends Instance<typeof GlobalStoreModel> {}
export interface GlobalStoreSnapshotOut extends SnapshotOut<typeof GlobalStoreModel> {}
export interface GlobalStoreSnapshotIn extends SnapshotIn<typeof GlobalStoreModel> {}
export const createGlobalStoreDefaultModel = () => types.optional(GlobalStoreModel, {});

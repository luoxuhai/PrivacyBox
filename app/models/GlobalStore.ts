import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const GlobalStoreModel = types
  .model('GlobalStore')
  .props({
    bottomTabVisible: types.optional(types.boolean, true),
    migrationFailedUris: types.optional(types.frozen<string[]>([]), [
      '/Users/luoxuhai/Library/Developer/CoreSimulator/Devices/858B9C55-CA74-47EA-81DB-AB681694E322/data/Containers/Shared/AppGroup/6A841962-FE3C-40D4-BB95-88754B02E773/application-data/photos/c1151b3d-5e57-40ef-b327-f4c68c89e860/poster.jpg',
    ]),
  })
  .actions((self) => ({
    setBottomTabVisible(bottomTabVisible: boolean) {
      self.bottomTabVisible = bottomTabVisible;
    },

    setMigrationFailed(uris: string[]) {
      self.migrationFailedUris = uris;
    },
  }));

export interface GlobalStore extends Instance<typeof GlobalStoreModel> {}
export interface GlobalStoreSnapshotOut extends SnapshotOut<typeof GlobalStoreModel> {}
export interface GlobalStoreSnapshotIn extends SnapshotIn<typeof GlobalStoreModel> {}
export const createGlobalStoreDefaultModel = () => types.optional(GlobalStoreModel, {});

import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const GlobalStoreModel = types
  .model('GlobalStore')
  .props({})
  .views((self) => ({}))
  .actions((self) => ({}));

export interface GlobalStore extends Instance<typeof GlobalStoreModel> {}
export interface GlobalStoreSnapshotOut extends SnapshotOut<typeof GlobalStoreModel> {}
export interface GlobalStoreSnapshotIn extends SnapshotIn<typeof GlobalStoreModel> {}
export const createGlobalStoreDefaultModel = () => types.optional(GlobalStoreModel, {});

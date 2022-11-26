import { AppState, AppStateStatus } from 'react-native';
import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { boolean } from 'mobx-state-tree/dist/internal';

/**
 * Model description here for TypeScript hints.
 */
export const AppStateStoreModel = types
  .model('AppStateStore')
  .props({
    bootTimestamp: types.number,
    state: types.optional(
      types.union(
        types.literal('active'),
        types.literal('inactive'),
        types.literal('background'),
        types.literal('extension'),
        types.literal('unknown'),
      ),
      'active',
    ),
  })
  .views((self) => ({
    get inForeground() {
      return self.state === 'active';
    },

    get uptime() {
      return Date.now() - self.bootTimestamp;
    },
  }))
  .actions((self) => ({
    setState(state: AppStateStatus) {
      self.state = state;
    },
  }));

export interface AppStateStore extends Instance<typeof AppStateStoreModel> {}
export interface AppStateStoreSnapshotOut extends SnapshotOut<typeof AppStateStoreModel> {}
export interface AppStateStoreSnapshotIn extends SnapshotIn<typeof AppStateStoreModel> {}
export const createAppStateStoreDefaultModel = () => types.optional(AppStateStoreModel, {});

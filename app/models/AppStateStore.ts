import { AppStateStatus } from 'react-native';
import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { getRootStore } from './helpers/getRootStore';
import { isAppLocked } from '@/screens/AppLockScreen/AppLock';

let lockTimer: NodeJS.Timeout;

export const AppStateStoreModel = types
  .model('AppStateStore')
  .props({
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
  }))
  .actions((self) => {
    return {
      setState(state: AppStateStatus) {
        self.state = state;
        const { appLockStore } = getRootStore(self);

        if (state === 'background') {
          appLockStore.setAppInBackgroundTimestamp(Date.now());

          clearTimeout(lockTimer);
          lockTimer = setTimeout(() => {
            if (isAppLocked(appLockStore)) {
              appLockStore.lock();
            }
          }, appLockStore.autolockTimeout * 1000);
        } else if (state === 'active') {
          clearTimeout(lockTimer);
          global.isPausePresentMask = true;
        }
      },
    };
  });

export interface AppStateStore extends Instance<typeof AppStateStoreModel> {}
export interface AppStateStoreSnapshotOut extends SnapshotOut<typeof AppStateStoreModel> {}
export interface AppStateStoreSnapshotIn extends SnapshotIn<typeof AppStateStoreModel> {}
export const createAppStateStoreDefaultModel = () => types.optional(AppStateStoreModel, {});

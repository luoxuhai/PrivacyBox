import { AppQueriesSchemes } from '@/screens/UrgentSwitchScreen/type';
import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export enum FakeHomeUnlockActions {
  PullRefresh = 'pull_refresh',
  Slide = 'slide',
  Shake = 'shake',
}

export enum UrgentSwitchActions {
  FaceDown = 'face_down',
  Shake = 'shake',
}

export enum BottomTabs {
  Album = 'album',
  Files = 'files',
  More = 'more',
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
    urgentSwitchTarget: types.optional(
      types.enumeration<AppQueriesSchemes>('AppQueriesSchemes', Object.values(AppQueriesSchemes)),
      AppQueriesSchemes.Disable,
    ),
    urgentSwitchActions: types.optional(
      types.array(
        types.enumeration<UrgentSwitchActions>(
          'UrgentSwitchActions',
          Object.values(UrgentSwitchActions),
        ),
      ),
      [UrgentSwitchActions.FaceDown],
    ),
    smartSearchEnabled: types.optional(types.boolean, false),
    autoDeleteOriginEnabled: types.optional(types.boolean, true),
    visibleBottomTabs: types.optional(
      types.array(types.enumeration<BottomTabs>('BottomTabs', Object.values(BottomTabs))),
      [BottomTabs.Album, BottomTabs.Files, BottomTabs.More],
    ),
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

    setUrgentSwitchTarget(urgentSwitchTarget: AppQueriesSchemes) {
      self.urgentSwitchTarget = urgentSwitchTarget;
    },

    setUrgentSwitchActions(action: UrgentSwitchActions) {
      if (self.urgentSwitchActions.includes(action)) {
        return;
      }

      self.urgentSwitchActions.push(action);
    },

    setAutoDeleteOriginEnabled(autoDeleteOriginEnabled: boolean) {
      self.autoDeleteOriginEnabled = autoDeleteOriginEnabled;
    },

    setSmartSearchEnabled(smartSearchEnabled: boolean) {
      self.smartSearchEnabled = smartSearchEnabled;
    },

    removeUrgentSwitchAction(action: UrgentSwitchActions) {
      self.urgentSwitchActions.remove(action);
    },

    setVisibleBottomTabs(tab: BottomTabs) {
      if (self.visibleBottomTabs.includes(tab)) {
        return;
      }

      self.visibleBottomTabs.push(tab);
    },

    removeVisibleBottomTabs(tab: BottomTabs) {
      self.visibleBottomTabs.remove(tab);
    },
  }));

export interface SettingsStore extends Instance<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotOut extends SnapshotOut<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotIn extends SnapshotIn<typeof SettingsStoreModel> {}
export const createSettingsDefaultModel = () => types.optional(SettingsStoreModel, {});

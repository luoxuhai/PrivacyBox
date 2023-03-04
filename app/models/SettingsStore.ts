import { AppQueriesSchemes } from '@/screens/UrgentSwitchScreen/type';
import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { isUndefined } from 'lodash';
import { AssetRepresentationMode } from '@/screens/AdvancedSettingsScreen/components/AssetRepresentationMode';

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
    recycleBinKeep: types.optional(types.number, 15),
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
    /** 隐藏App启动 */
    blockedAppsEnabled: types.optional(types.boolean, false),
    /** 导入模式 */
    assetRepresentationMode: types.optional(
      types.enumeration<AssetRepresentationMode>(
        'AssetRepresentationMode',
        Object.values(AssetRepresentationMode),
      ),
      AssetRepresentationMode.Auto,
    ),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setHapticFeedback(value: boolean) {
      self.hapticFeedback = value;
    },

    setRecycleBin(value: { enabled?: boolean; keep?: number }) {
      if (!isUndefined(value.enabled)) {
        self.recycleBinEnabled = value.enabled;
      }

      if (!isUndefined(value.keep)) {
        self.recycleBinKeep = value.keep;
      }
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

    setAssetRepresentationMode(mode: AssetRepresentationMode) {
      self.assetRepresentationMode = mode;
    },
  }));

export interface SettingsStore extends Instance<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotOut extends SnapshotOut<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotIn extends SnapshotIn<typeof SettingsStoreModel> {}
export const createSettingsDefaultModel = () => types.optional(SettingsStoreModel, {});

import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const AppLockStoreModel = types
  .model('AppLockStore')
  .props({
    /** 解锁密码 */
    passcode: types.optional(types.string, ''),
    /** 自动锁定时间 */
    autolockTimeout: types.optional(types.number, 0),
    /** 开启生物识别 */
    biometricsEnabled: types.optional(types.boolean, true),
    /** 自动触发生物识别 */
    autoTriggerBiometrics: types.optional(types.boolean, true),
    /** 假密码 */
    fakePasscode: types.optional(types.string, ''),
    /** 隐藏解锁界面的生物识别按钮 */
    biometricsEnabledWhenFake: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAutolockTimeout(autolockTimeout: number) {
      self.autolockTimeout = autolockTimeout;
    },
  })); // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AppLockStore extends Instance<typeof AppLockStoreModel> {}
export interface AppLockStoreSnapshotOut extends SnapshotOut<typeof AppLockStoreModel> {}
export interface AppLockStoreSnapshotIn extends SnapshotIn<typeof AppLockStoreModel> {}
export const createAppLockStoreDefaultModel = () => types.optional(AppLockStoreModel, {});

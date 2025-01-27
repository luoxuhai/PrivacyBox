import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

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
    /** 当前是伪装环境 */
    inFakeEnvironment: types.optional(types.boolean, false),
    /** 开启假密码 */
    fakePasscodeEnabled: types.optional(types.boolean, false),
    /** 假密码 */
    fakePasscode: types.optional(types.string, ''),
    /** 隐藏解锁界面的生物识别按钮 */
    biometricsEnabledWhenFake: types.optional(types.boolean, false),
    /** 底部导航栏变暗 */
    bottomTabDarkleWhenFake: types.optional(types.boolean, true),
    /** 是否已锁住 */
    isLocked: types.optional(types.boolean, true),
    /** APP 进入后台时间戳 */
    appInBackgroundTimestamp: types.optional(types.number, 0),
    /** 手动锁住 */
    // isManuallyLocked: types.optional(types.boolean, true),
  })
  .actions((self) => ({
    setAutolockTimeout(autolockTimeout: number) {
      self.autolockTimeout = autolockTimeout;
    },

    setPasscode(passcode: string) {
      self.passcode = passcode;
    },

    setFakePasscode(fakePasscode: string) {
      self.fakePasscode = fakePasscode;
    },

    setBiometricsEnabled(biometricsEnabled: boolean) {
      self.biometricsEnabled = biometricsEnabled;
    },

    setAutoTriggerBiometrics(autoTriggerBiometrics: boolean) {
      self.autoTriggerBiometrics = autoTriggerBiometrics;
    },

    setBiometricsEnabledWhenFake(biometricsEnabledWhenFake: boolean) {
      self.biometricsEnabledWhenFake = biometricsEnabledWhenFake;
    },

    setFakePasscodeEnabled(fakePasscodeEnabled: boolean) {
      self.fakePasscodeEnabled = fakePasscodeEnabled;
    },

    setAppInBackgroundTimestamp(appInBackgroundTimestamp: number) {
      self.appInBackgroundTimestamp = appInBackgroundTimestamp;
    },

    setIsLocked(isLocked: boolean) {
      self.isLocked = isLocked;
    },

    setInFakeEnvironment(inFakeEnvironment: boolean) {
      self.inFakeEnvironment = inFakeEnvironment;
    },

    setBottomTabDarkleWhenFake(bottomTabDarkleWhenFake: boolean) {
      self.bottomTabDarkleWhenFake = bottomTabDarkleWhenFake;
    },

    lock() {
      self.isLocked = true;
    },

    unlock() {
      self.isLocked = false;
      self.appInBackgroundTimestamp = 0;
    },
  }));

export interface AppLockStore extends Instance<typeof AppLockStoreModel> {}
export interface AppLockStoreSnapshotOut extends SnapshotOut<typeof AppLockStoreModel> {}
export interface AppLockStoreSnapshotIn extends SnapshotIn<typeof AppLockStoreModel> {}
export const createAppLockStoreDefaultModel = () => types.optional(AppLockStoreModel, {});

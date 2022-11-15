import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { colors } from '../theme';

export enum AppIcon {
  Default = 'default',
  Dark = 'dark',
  Calculator = 'calculator',
  Clock = 'clock',
  Todo = 'todo',
  Housekeeper = 'housekeeper',
  PasswordBox = 'password_box',
}

export const ThemeStoreModel = types
  .model('ThemeStore', {
    /** App 外观 */
    appearance: types.optional(types.union(types.literal('light'), types.literal('dark')), 'light'),
    /** 是否跟随系统外观 */
    isSystemAppearance: types.optional(types.boolean, false),
    /** App 图标 */
    appIcon: types.optional(
      types.enumeration<AppIcon>('AppIcon', Object.values(AppIcon)),
      AppIcon.Default,
    ),
  })
  .views((self) => ({
    get isDark() {
      return self.appearance === 'dark';
    },

    get colors() {
      return colors[self.appearance];
    },
  }))
  .actions((self) => ({
    // 设置 App 外观
    setAppearance(appearance: Appearance) {
      if (!['dark', 'light'].includes(appearance)) {
        return;
      }

      self.appearance = appearance;
    },
    // 设置 App 图标
    setAppIcon(appIcon: AppIcon) {
      self.appIcon = appIcon;
    },
  }));

export interface ThemeStore extends Instance<typeof ThemeStoreModel> {}
export interface ThemeStoreSnapshot extends SnapshotOut<typeof ThemeStoreModel> {}

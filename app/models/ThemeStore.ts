import { Instance, SnapshotOut, onPatch, types } from 'mobx-state-tree';
import overrideColorScheme from 'react-native-override-color-scheme';

import { colors } from '@/theme';

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
    // TODO: Light (default|red)、Dark (default|dimmed|blue)
    // theme: ''
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

      overrideColorScheme.setScheme(appearance);

      self.appearance = appearance;
    },
    // 设置 App 图标
    setAppIcon(appIcon: AppIcon) {
      self.appIcon = appIcon;
    },

    // setTheme() {},
  }));

// onPatch(ThemeStoreModel, (patch) => {
//   console.info('Got change: ', patch);
// });

// overrideColorScheme.setScheme(
//   this.isSystemAppearance ? null : this.appearance,
// );
export interface ThemeStore extends Instance<typeof ThemeStoreModel> {}
export interface ThemeStoreSnapshot extends SnapshotOut<typeof ThemeStoreModel> {}

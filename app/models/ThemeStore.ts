import { Instance, SnapshotOut, flow, types } from 'mobx-state-tree';
import overrideColorScheme from 'react-native-override-color-scheme';

import { colors } from '@/theme';
import { Appearance } from 'react-native';
import { delay } from '@/utils';
import { AppIcons } from '@/screens/AppearanceScreen/types';

export const ThemeStoreModel = types
  .model('ThemeStore', {
    /** App 外观 */
    appearance: types.optional(types.union(types.literal('light'), types.literal('dark')), 'light'),
    /** 是否跟随系统外观 */
    isSystemAppearance: types.optional(types.boolean, true),
    /** App 图标 */
    appIcon: types.optional(
      types.enumeration<AppIcons>('AppIcons', Object.values(AppIcons)),
      AppIcons.Default,
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
  .actions((self) => {
    const setAppearanceMode = flow(function* (mode: AppearanceMode) {
      if (!mode) {
        return;
      }

      overrideColorScheme.setScheme(mode === 'auto' ? null : mode);

      yield delay(0);
      self.appearance = appearanceModeToInternal(mode);
      self.isSystemAppearance = mode === 'auto';
    });

    return {
      // 设置 App 外观
      setAppearanceMode,
      // 设置 App 图标
      setAppIcon(appIcon: AppIcon) {
        self.appIcon = appIcon;
      },

      // setTheme() {},
    };
  });

// onPatch(ThemeStoreModel, (patch) => {
//   console.info('Got change: ', patch);
// });

// overrideColorScheme.setScheme(
//   this.isSystemAppearance ? null : this.appearance,
// );
export interface ThemeStore extends Instance<typeof ThemeStoreModel> {}
export interface ThemeStoreSnapshot extends SnapshotOut<typeof ThemeStoreModel> {}

export function appearanceModeToInternal(mode: AppearanceMode): Appearance {
  if (mode === 'auto') {
    return Appearance.getColorScheme() || 'light';
  }
  return mode;
}

export function appearanceToMode(
  appearance: Appearance,
  isSystemAppearance: boolean,
): AppearanceMode {
  return isSystemAppearance ? 'auto' : appearance;
}

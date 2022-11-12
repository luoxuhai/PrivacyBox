import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { colors, typography, spacing } from '../theme';

export const ThemeStoreModel = types
  .model('ThemeStore')
  .props({
    colors: types.optional(types.string, ''),
    typography: types.optional(types.string, ''),
    spacing: types.optional(types.string, ''),
  })
  .actions((store) => ({
    
  }));

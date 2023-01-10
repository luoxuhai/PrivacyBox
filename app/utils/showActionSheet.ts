import { colors } from '@/theme';
import { ActionSheetIOS, ActionSheetIOSOptions } from 'react-native';

export function showActionSheet(
  options: ActionSheetIOSOptions,
  callback: (buttonIndex: number) => void,
) {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      tintColor: colors.light.palette.primary6,
      ...options,
    },
    callback,
  );
}

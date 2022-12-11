import { translate } from '@/i18n';
import React, { FC, useCallback } from 'react';
import { View, ActionSheetIOS } from 'react-native';

export function useAlbumEditor() {
  function onOpenActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          translate('common.cancel'),
          translate('albumsScreen.editAlbum.changeName'),
          translate('albumsScreen.editAlbum.delete'),
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
        title: translate('albumsScreen.editAlbum.title'),
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
        }
      },
    );
  }

  return {
    onOpenActionSheet,
  };
}

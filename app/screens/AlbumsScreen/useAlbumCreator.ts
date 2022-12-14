import { translate } from '@/i18n';
import React, { FC, useCallback } from 'react';
import { View, ActionSheetIOS, Alert } from 'react-native';

export function useAlbumCreator() {
  function openAlert() {
    Alert.prompt(
      '新建相册',
      '请输入相册名称',
      (tx) => {
        console.log(tx);
      },
      'plain-text',
      '',
      'default',
      '相册名称（10个字符内）',
    );
  }

  return { openAlert };
}

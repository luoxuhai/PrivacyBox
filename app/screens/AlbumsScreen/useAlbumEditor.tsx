import { translate } from '@/i18n';
import React, { FC, useCallback } from 'react';
import { View, ActionSheetIOS, Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { albumKeys } from './constants';
import { deleteAlbum, fetchAlbums, updateAlbum } from '@/services/local';
import Photo from '@/database/entities/photo';
import { useStores } from '@/models';

export function useAlbumEditor() {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutate: handleDeleteAlbum } = useMutation({
    mutationFn: async (id: string) => {
      await deleteAlbum({
        id,
      });
    },
    onError() {
      Overlay.toast({
        preset: 'error',
        title: '删除失败',
      });
    },
    onSuccess() {
      queryClient.refetchQueries(albumKeys.list(`${inFakeEnvironment}`));
      Overlay.toast({
        preset: 'done',
        title: '删除成功',
      });
    },
  });

  const { mutate: handleRename } = useMutation({
    mutationFn: async (params: { id: string; data: Partial<Photo> }) => {
      if (!params.id || !params.data.name) {
        throw Error('');
      }

      const exists = !!(
        await fetchAlbums({
          name: params.data.name,
        })
      ).length;

      if (exists) {
        throw Error('相册名称不能相同');
      }

      await updateAlbum(params);
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: '重命名失败',
        message: error.message,
      });
    },
    onSuccess() {
      queryClient.refetchQueries(albumKeys.list(`${inFakeEnvironment}`));
      Overlay.toast({
        preset: 'done',
        title: '删除成功',
      });
    },
  });

  function handlePresentPrompt(item: Photo) {
    Alert.prompt(
      '重命名',
      '请输入相册名称',
      (name: string) => {
        handleRename({
          id: item.id,
          data: {
            name: name.trim(),
          },
        });
      },
      'plain-text',
      item.name,
      'default',
      '相册名称（10个字符内）',
    );
  }

  function onOpenActionSheet(item: Photo) {
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
        switch (buttonIndex) {
          case 1:
            handlePresentPrompt(item);
            break;
          case 2:
            handleDeleteAlbum(item.id);
            break;
        }
      },
    );
  }

  return {
    onOpenActionSheet,
  };
}

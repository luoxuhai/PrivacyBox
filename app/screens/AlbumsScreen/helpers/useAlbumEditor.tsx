import { translate } from '@/i18n';
import { ActionSheetIOS, Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { albumKeys } from '../constants';
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
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('albumsScreen.deleteAlbum.fail'),
        message: error.message,
      });
    },
    onSuccess() {
      queryClient.refetchQueries(albumKeys.list(`${inFakeEnvironment}`));
      Overlay.toast({
        preset: 'done',
        title: translate('albumsScreen.deleteAlbum.success'),
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
        title: translate('albumsScreen.renameAlbum.fail'),
        message: error.message,
      });
    },
    onSuccess() {
      queryClient.refetchQueries(albumKeys.list(`${inFakeEnvironment}`));
      Overlay.toast({
        preset: 'done',
        title: translate('albumsScreen.renameAlbum.success'),
      });
    },
  });

  function handlePresentRenamePrompt(item: Photo) {
    Alert.prompt(
      translate('albumsScreen.renameAlbum.title'),
      translate('albumsScreen.renameAlbum.message'),
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
      translate('albumsScreen.createAlbum.placeholder'),
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
            handlePresentRenamePrompt(item);
            break;
          case 2:
            Alert.alert(translate('albumsScreen.deleteAlbum.title'), undefined, [
              {
                text: translate('common.cancel'),
                style: 'cancel',
              },
              {
                text: translate('common.confirm'),
                style: 'destructive',
                onPress() {
                  handleDeleteAlbum(item.id);
                },
              },
            ]);
            break;
        }
      },
    );
  }

  return {
    onOpenActionSheet,
  };
}

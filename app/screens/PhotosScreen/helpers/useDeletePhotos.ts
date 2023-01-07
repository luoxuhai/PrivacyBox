import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStores } from '@/models';
import { delay, Overlay } from '@/utils';
import { deletePhotos, DeletePhotosParams } from '@/services/local';
import { t } from '@/i18n';
import { photoKeys } from '../constants';
import { Alert } from 'react-native';
import { useRef } from 'react';

export function useDeletePhotos(albumId: string) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
    settingsStore: { recycleBinEnabled },
  } = useStores();
  const timer = useRef<NodeJS.Timeout>();

  const { mutateAsync: handleDeletePhotos } = useMutation({
    mutationFn: async (params: DeletePhotosParams) => {
      timer.current = setTimeout(() => {
        Overlay.alert({
          preset: 'spinner',
          duration: 0,
          title: '删除中...',
        });
      }, 1000);

      return await deletePhotos(params);
    },
    onSuccess() {
      queryClient.invalidateQueries(photoKeys.list(`${inFakeEnvironment}:${albumId}`));
      Overlay.toast({
        preset: 'done',
        title: t('albumsScreen.deleteAlbum.success'),
      });
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: t('albumsScreen.deleteAlbum.fail'),
        message: error.message,
      });
    },
    onSettled() {
      clearTimeout(timer.current);
    },
  });

  function handlePresentDeleteAlert(params: DeletePhotosParams) {
    const count = params.ids.length;
    Alert.alert(
      t('photosScreen.delete.title', {
        count: count <= 1 ? '' : count,
      }),
      recycleBinEnabled
        ? t('photosScreen.delete.softDeleteMsg')
        : t('photosScreen.delete.deleteMsg'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.confirm'),
          style: 'destructive',
          onPress() {
            handleDeletePhotos(params);
          },
        },
      ],
    );
  }

  return handlePresentDeleteAlert;
}

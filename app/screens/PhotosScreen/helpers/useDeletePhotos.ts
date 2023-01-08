import { useRef } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStores } from '@/models';
import { Overlay } from '@/utils';
import { deletePhotos, softDeletePhotos, DeletePhotosParams } from '@/services/local';
import { t } from '@/i18n';
import { photoKeys } from '../constants';

export function useDeletePhotos(albumId: string) {
  const queryClient = useQueryClient();
  const {
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

      const fn = recycleBinEnabled ? softDeletePhotos : deletePhotos;
      return await fn(params);
    },
    onSuccess() {
      queryClient.invalidateQueries(photoKeys.list(albumId));
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

import { useRef } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStores } from '@/models';
import { Overlay } from '@/utils';
import { deletePhotos, DestroyDeletedPhotosParams } from '@/services/local';
import { t } from '@/i18n';
import { recycleBinKeys } from '../constants';

export function useDeletePhotos() {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const timer = useRef<NodeJS.Timeout>();

  const { mutateAsync: handleDeletePhotos } = useMutation({
    mutationFn: async (params: DestroyDeletedPhotosParams) => {
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
      queryClient.invalidateQueries(recycleBinKeys.list({ inFakeEnvironment }));
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

  function handlePresentDeleteAlert(params: DestroyDeletedPhotosParams) {
    const count = params.ids.length;
    Alert.alert(
      t('photosScreen.delete.title', {
        count: count <= 1 ? '' : count,
      }),
      t('photosScreen.delete.deleteMsg'),
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

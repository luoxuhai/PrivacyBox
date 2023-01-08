import { useRef } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStores } from '@/models';
import { Overlay } from '@/utils';
import {
  deleteAlbum,
  softDeleteAlbum,
  DeleteAlbumParams,
  FetchAlbumsResult,
} from '@/services/local';
import { t } from '@/i18n';
import { albumKeys } from '../constants';

export function useDeleteAlbum() {
  const queryClient = useQueryClient();
  const {
    settingsStore: { recycleBinEnabled },
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const timer = useRef<NodeJS.Timeout>();

  const { mutateAsync: handleDeletePhotos } = useMutation({
    mutationFn: async (params: DeleteAlbumParams) => {
      timer.current = setTimeout(() => {
        Overlay.alert({
          preset: 'spinner',
          duration: 0,
          title: '删除中...',
        });
      }, 1000);

      const fn = recycleBinEnabled ? softDeleteAlbum : deleteAlbum;
      return await fn(params);
    },
    onSuccess(_data, { id }) {
      queryClient.setQueryData(
        albumKeys.list({ inFakeEnvironment }),
        (oldData: FetchAlbumsResult[]) => oldData.filter((item) => item.id !== id),
      );
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

  function handlePresentDeleteAlert(params: DeleteAlbumParams) {
    Alert.alert(
      t('albumsScreen.deleteAlbum.title'),
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

import { useRef } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStores } from '@/models';
import { Overlay } from '@/utils';
import { destroyDeletedPhotos, DestroyDeletedPhotosParams } from '@/services/local';
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

      return await destroyDeletedPhotos({ ...params, is_fake: inFakeEnvironment });
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
    Alert.alert(t('wastebasketScreen.deleteTitle'), undefined, [
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
    ]);
  }

  return handlePresentDeleteAlert;
}

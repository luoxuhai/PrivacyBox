import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';

import { useStores } from '@/models';
import { Overlay } from '@/utils';
import { deletePhotos, RecoverDeletedPhotosParams } from '@/services/local';
import { t } from '@/i18n';
import { recycleBinKeys } from '../constants';

export function useRecoverPhotos() {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const timer = useRef<NodeJS.Timeout>();

  const { mutateAsync: handleRecoverPhotos } = useMutation({
    mutationFn: async (params: RecoverDeletedPhotosParams) => {
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

  async function handlePresentRecoverAlert(params: Omit<RecoverDeletedPhotosParams, 'target_id'>) {
    const albumId = (await SheetManager.show('album-picker-sheet')) as string;

    if (albumId) {
      await handleRecoverPhotos({
        ...params,
        target_id: albumId,
      });
    }
  }

  return handlePresentRecoverAlert;
}

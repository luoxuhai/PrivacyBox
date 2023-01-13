import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';

import { useStores } from '@/models';
import { Overlay } from '@/utils';
import { recoverDeletedPhotos, RecoverDeletedPhotosParams } from '@/services/local';
import { t } from '@/i18n';
import { recycleBinKeys } from '../constants';

export function useRecoverPhotos() {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  const { mutateAsync: handleRecoverPhotos } = useMutation({
    mutationFn: async (params: Omit<RecoverDeletedPhotosParams, 'is_fake'>) => {
      return await recoverDeletedPhotos({ ...params, is_fake: inFakeEnvironment });
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
  });

  async function handlePresentRecoverAlert(
    params: Omit<RecoverDeletedPhotosParams, 'target_id' | 'is_fake'>,
  ) {
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

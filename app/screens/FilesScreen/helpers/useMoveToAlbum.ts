import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';

import { Overlay } from '@/utils';
import { FetchFilesResult, moveFileToAlbum, MoveFileToAlbumParams } from '@/services/local';
import { t } from '@/i18n';
import { fileKeys } from '../constants';
import { useStores } from '@/models';

export function useMoveToAlbum(folderId: string) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  const { mutateAsync: handleMovePhotos } = useMutation({
    mutationFn: async (params: MoveFileToAlbumParams) => {
      return await moveFileToAlbum(params);
    },
    onSuccess(_, params) {
      const id = params.ids[0];
      queryClient.setQueryData<FetchFilesResult[]>(
        fileKeys.list(`${inFakeEnvironment}:${folderId}`),
        (oldData) => oldData.filter((item) => item.id !== id),
      );
      Overlay.toast({
        preset: 'done',
        title: t('photosScreen.moveToAlbum.success'),
      });
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: t('photosScreen.moveToAlbum.fail'),
        message: error.message,
      });
    },
  });

  async function handlePresentAlbumPicker(ids: string[]) {
    const albumId = (await SheetManager.show('album-picker-sheet')) as string;

    if (albumId) {
      await handleMovePhotos({
        ids,
        album_id: albumId,
      });
    }
  }

  return handlePresentAlbumPicker;
}

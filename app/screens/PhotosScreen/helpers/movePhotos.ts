import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';

import { Overlay } from '@/utils';
import { movePhotos, MovePhotosParams } from '@/services/local';
import { t } from '@/i18n';
import { photoKeys } from '../constants';

export function useMovePhotos(albumId: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: handleMovePhotos } = useMutation({
    mutationFn: async (params: MovePhotosParams) => {
      return await movePhotos(params);
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
  });

  async function handlePresentAlbumPicker(ids: string[]) {
    const albumId = (await SheetManager.show('album-picker-sheet')) as string;

    if (albumId) {
      await handleMovePhotos({
        ids,
        target_id: albumId,
      });
    }
  }

  return handlePresentAlbumPicker;
}

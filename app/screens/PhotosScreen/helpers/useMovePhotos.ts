import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';

import { Overlay } from '@/utils';
import { FetchPhotosResult, movePhotos, MovePhotosParams } from '@/services/local';
import { t } from '@/i18n';
import { QueryKeyContext } from '../context';
import { useContext } from 'react';

export function useMovePhotos() {
  const queryClient = useQueryClient();
  const queryKey = useContext(QueryKeyContext);

  const { mutateAsync: handleMovePhotos } = useMutation({
    mutationFn: async (params: MovePhotosParams) => {
      return await movePhotos(params);
    },
    onSuccess(_, params) {
      queryClient.setQueryData<FetchPhotosResult[]>(queryKey, (oldData) =>
        oldData.filter((item) => !params.ids.includes(item.id)),
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
        target_id: albumId,
      });
    }
  }

  return handlePresentAlbumPicker;
}

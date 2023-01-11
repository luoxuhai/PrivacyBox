import { useRef } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStores } from '@/models';
import { Overlay } from '@/utils';
import { updatePhoto, UpdatePhotoParams } from '@/services/local';
import { t } from '@/i18n';
import { photoKeys } from '../constants';

export function useUpdatePhoto(albumId: string) {
  const queryClient = useQueryClient();
  const {
    settingsStore: { recycleBinEnabled },
  } = useStores();

  const { mutateAsync: handleUpdatePhoto } = useMutation({
    mutationFn: async (params: UpdatePhotoParams) => {
      return await updatePhoto(params);
    },
    onSuccess(_data, { id, data }) {
      queryClient.setQueryData(
        list(albumId),
        (oldData: FetchAlbumsResult[]) => oldData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...data
            }
          } else {
            return item;
          }
        }),
      );
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: t('albumsScreen.deleteAlbum.fail'),
        message: error.message,
      });
    }
  });

  return handleUpdatePhoto;
}

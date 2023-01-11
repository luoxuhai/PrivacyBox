import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { FetchPhotosResult, updatePhoto, UpdatePhotoParams } from '@/services/local';
import { t } from '@/i18n';
import { QueryKeyContext } from '@/screens/PhotosScreen/context';

export function useUpdatePhoto() {
  const queryClient = useQueryClient();
  const queryKey = useContext(QueryKeyContext);

  const { mutateAsync: handleUpdatePhoto } = useMutation({
    mutationFn: async (params: UpdatePhotoParams) => {
      return await updatePhoto(params);
    },
    onSuccess(_data, { id, data }) {
      queryClient.setQueryData(queryKey, (oldData: FetchPhotosResult[]) =>
        oldData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...data,
            };
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
    },
  });

  return handleUpdatePhoto;
}

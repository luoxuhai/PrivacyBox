import { useRef } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { renamePhoto, RenamePhotoParams } from '@/services/local';
import { t } from '@/i18n';
import { photoKeys } from '../constants';

export function useRenamePhoto(albumId: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: handleRenamePhoto } = useMutation({
    mutationFn: async (params: RenamePhotoParams) => {
      return await renamePhoto(params);
    },
    onSuccess(_data, { id, name }) {
      queryClient.setQueryData(
        list(albumId),
        (oldData: FetchAlbumsResult[]) => oldData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name,
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

  function handlePresentRenameAlert(params: RenamePhotoParams) {
    Alert.prompt(
        t('filesScreen.rename'),
        undefined,
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('common.confirm'),
            async onPress(value: string | undefined) {
              const name = value?.trim();
              if (!name || name === params.name) return;
              handleRenamePhoto({ ...params, name });
            },
          },
        ],
        'plain-text',
        params.name.replace(/\..+$/, ''),
      );
  }

  return handlePresentRenameAlert;
}

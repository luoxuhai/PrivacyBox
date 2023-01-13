import { useContext } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FetchPhotosResult, renamePhoto, RenamePhotoParams } from '@/services/local';
import { t } from '@/i18n';
import { QueryKeyContext } from '@/screens/PhotosScreen/context';
import { Overlay } from '@/utils';
import { extname } from '@/lib/path';

export function useRenamePhoto() {
  const queryClient = useQueryClient();
  const queryKey = useContext(QueryKeyContext);

  const { mutateAsync: handleRenamePhoto } = useMutation({
    mutationFn: async (params: RenamePhotoParams) => {
      if (params.name.length > 255) {
        throw Error('名称字数不能超过255个字符');
      }

      const items = queryClient.getQueryData<FetchPhotosResult[]>(queryKey);

      if (items.find((item) => item.name === params.name)) {
        throw Error('文件名称重复');
      }

      return await renamePhoto(params);
    },
    onSuccess(_data, { id, name }) {
      queryClient.setQueryData(queryKey, (oldData: FetchPhotosResult[]) =>
        oldData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name,
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

  function handlePresentRenameAlert(params: RenamePhotoParams) {
    Alert.prompt(
      t('common.rename'),
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

            if (!name) return;

            const newName = `${name}${extname(params.name)}`;
            if (newName === params.name) return;

            handleRenamePhoto({ ...params, name: newName });
          },
        },
      ],
      'plain-text',
      params.name.replace(/\..+$/, ''),
      'default',
      t('filesScreen.rename.placeholder'),
    );
  }

  return handlePresentRenameAlert;
}

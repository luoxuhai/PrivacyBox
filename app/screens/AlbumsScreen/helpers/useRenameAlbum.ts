import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStores } from '@/models';
import { Overlay } from '@/utils';
import { FetchAlbumsResult, updateAlbum } from '@/services/local';
import { t } from '@/i18n';
import { albumKeys } from '../constants';
import Photo from '@/database/entities/photo';

export function useRenameAlbum() {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  const { mutateAsync: handleRename } = useMutation({
    mutationFn: async (params: { id: string; data: Partial<Photo> }) => {
      if (params.data.name?.length > 255) {
        throw Error('名称字数不能超过255个字符');
      }

      const albums = queryClient.getQueryData<FetchAlbumsResult[]>(
        albumKeys.list({
          inFakeEnvironment,
        }),
      );

      const exists = !!albums.find(
        (album) => album.id !== params.id && album.name === params.data.name,
      );
      if (exists) {
        throw Error('相册名称不能相同');
      }

      await updateAlbum(params);
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: t('albumsScreen.renameAlbum.fail'),
        message: error.message,
      });
    },
    onSuccess(_data, { id, data }) {
      queryClient.setQueryData(
        albumKeys.list({ inFakeEnvironment }),
        (oldData: FetchAlbumsResult[]) =>
          oldData.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                name: data.name,
              };
            }
            return item;
          }),
      );
    },
  });

  function handlePresentRenamePrompt(item: Photo) {
    Alert.prompt(
      t('albumsScreen.renameAlbum.title'),
      t('albumsScreen.renameAlbum.message'),
      (value: string) => {
        const name = value?.trim();
        if (!name || name === item.name) return;

        handleRename({
          id: item.id,
          data: {
            name,
          },
        });
      },
      'plain-text',
      item.name,
      'default',
      t('albumsScreen.createAlbum.placeholder'),
    );
  }
  return handlePresentRenamePrompt;
}

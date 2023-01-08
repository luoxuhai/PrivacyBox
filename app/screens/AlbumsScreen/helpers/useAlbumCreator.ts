import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAlbum, fetchAlbums } from '@/services/local';
import { Overlay } from '@/utils';
import { albumKeys } from '../constants';
import { useStores } from '@/models';
import { t } from '@/i18n';

export function useAlbumCreator() {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutate: handleCreateAlbum } = useMutation({
    mutationFn: async (text: string) => {
      const name = text.trim();
      if (!name) {
        throw Error('缺少 name');
      }

      const exists = !!(
        await fetchAlbums({
          name,
        })
      ).length;

      if (exists) {
        throw Error('相册名称不能相同');
      }

      await createAlbum({
        name,
      });
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: t('albumsScreen.createAlbum.fail'),
        message: error.message,
      });
    },
    onSuccess() {
      queryClient.refetchQueries(albumKeys.list({ inFakeEnvironment }));
      Overlay.toast({
        preset: 'done',
        title: t('albumsScreen.createAlbum.success'),
      });
    },
  });

  function openAlert() {
    Alert.prompt(
      t('albumsScreen.createAlbum.title'),
      t('albumsScreen.createAlbum.message'),
      handleCreateAlbum,
      'plain-text',
      '',
      'default',
      t('albumsScreen.createAlbum.placeholder'),
    );
  }

  return { openAlert };
}

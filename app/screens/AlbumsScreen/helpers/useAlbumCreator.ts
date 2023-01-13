import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAlbum } from '@/services/local';
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
    mutationFn: async (name: string) => {
      return await createAlbum({
        name,
        is_fake: inFakeEnvironment,
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
      queryClient.invalidateQueries(albumKeys.list({ inFakeEnvironment }));
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
      (text) => {
        const name = text.trim();
        if (name) {
          handleCreateAlbum(name);
        }
      },
      'plain-text',
      '',
      'default',
      t('albumsScreen.createAlbum.placeholder'),
    );
  }

  return { openAlert };
}

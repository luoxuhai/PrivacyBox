import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { translate } from '@/i18n';
import { photoKeys } from '../constants';
import Photo from '@/database/entities/photo';
import { useStores } from '@/models';
import { FetchFilesResult, updateFiles, fetchFiles } from '@/services/local/file';
import { FetchPhotosResult } from '@/services/local';

export function useDeletePhotos(item: FetchFilesResult) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  const { mutate: handleDeletePhotos } = useMutation({
    mutationFn: async (params: { id: string; data: Partial<Photo> }) => {
      if (!params.id || !params.data.name) {
        throw Error('');
      }

      const exists = !!(
        await fetchFiles({
          name: params.data.name,
        })
      ).length;

      if (exists) {
        throw Error('相册名称不能相同');
      }

      await updateFiles(params);
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('filesScreen.rename.fail'),
        message: error.message,
      });
    },
    onSuccess() {
      console.log('item.parent_id', item.parent_id);
      queryClient.refetchQueries(photoKeys.list(`${inFakeEnvironment}:${item.parent_id}`));
      Overlay.toast({
        preset: 'done',
        title: translate('filesScreen.rename.success'),
      });
    },
  });

  function handlePresentDeleteAlert() {
    Alert.alert(translate('albumsScreen.deleteAlbum.title'), undefined, [
      {
        text: translate('common.cancel'),
        style: 'cancel',
      },
      {
        text: translate('common.confirm'),
        style: 'destructive',
        onPress() {
          handleDeletePhotos(item.id);
        },
      },
    ]);
  }

  return handlePresentDeleteAlert;
}

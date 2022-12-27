import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { fileKeys } from '../constants';
import { useStores } from '@/models';
import { FetchFilesResult, deleteFiles } from '@/services/local/file';
import { translate } from '@/i18n';

export function useDeleteFile(item: FetchFilesResult) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutate: handleDeleteAlbum } = useMutation({
    mutationFn: async (id: string) => {
      await deleteFiles({
        id,
      });
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('albumsScreen.deleteAlbum.fail'),
        message: error.message,
      });
    },
    onSuccess() {
      queryClient.refetchQueries(fileKeys.list(`${inFakeEnvironment}:${item.parent_id}`));
      console.log(item)
      Overlay.toast({
        preset: 'done',
        title: translate('albumsScreen.deleteAlbum.success'),
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
          handleDeleteAlbum(item.id);
        },
      },
    ]);
  }

  return handlePresentDeleteAlert;
}

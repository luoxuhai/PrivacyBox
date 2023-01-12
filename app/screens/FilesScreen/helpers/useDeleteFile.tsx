import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { fileKeys } from '../constants';
import { useStores } from '@/models';
import { deleteFiles, DeleteFilesParams, FetchFilesResult } from '@/services/local/file';
import { translate } from '@/i18n';

export function useDeleteFile(folderId: string) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutateAsync: handleDeleteAlbum } = useMutation({
    async mutationFn(params: DeleteFilesParams) {
      return await deleteFiles(params);
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('albumsScreen.deleteAlbum.fail'),
        message: error.message,
      });
    },
    onSuccess(_, { items }) {
      const ids = items.map((item) => item.id);
      queryClient.setQueryData<FetchFilesResult[]>(
        fileKeys.list(`${inFakeEnvironment}:${folderId}`),
        (oldData) => oldData.filter((item) => !ids.includes(item.id)),
      );
      Overlay.toast({
        preset: 'done',
        title: translate('albumsScreen.deleteAlbum.success'),
      });
    },
  });

  function handlePresentDeleteAlert(params: DeleteFilesParams) {
    Alert.alert(translate('albumsScreen.deleteAlbum.title'), undefined, [
      {
        text: translate('common.cancel'),
        style: 'cancel',
      },
      {
        text: translate('common.confirm'),
        style: 'destructive',
        onPress() {
          handleDeleteAlbum(params);
        },
      },
    ]);
  }

  return handlePresentDeleteAlert;
}
